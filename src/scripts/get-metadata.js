import fs from 'fs';
import axios from 'axios';
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const RPC_URL = process.env.RPC_URL || 'https://eth.llamarpc.com';
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const OUTPUT_FILE = path.join(DATA_DIR, "collection_metadata.json");

// Validate required environment variables
if (!RPC_URL || !CONTRACT_ADDRESS) {
  console.error('Error: Missing required environment variables. Please check your .env file.');
  process.exit(1);
}

const CONTRACT_ABI = [
  // totalSupply function (0xbd85b039) - might be ERC-1155 style
  { 
    name: 'totalSupply', 
    type: 'function', 
    stateMutability: 'view', 
    inputs: [], 
    outputs: [{ type: 'uint256' }] 
  },
  // uri function (0x0e89341c) - ERC-1155 style
  { 
    name: 'uri', 
    type: 'function', 
    stateMutability: 'view', 
    inputs: [{ name: 'tokenId', type: 'uint256' }], 
    outputs: [{ type: 'string' }] 
  },
  // balanceOf function for ERC-1155
  { 
    name: 'balanceOf', 
    type: 'function', 
    stateMutability: 'view', 
    inputs: [
      { name: 'account', type: 'address' },
      { name: 'id', type: 'uint256' }
    ], 
    outputs: [{ type: 'uint256' }] 
  },
];

async function detectContractType(client, contractAddress) {
  console.log('Detecting contract type...');
  
  // Try to call totalSupply
  try {
    const supply = await client.readContract({
      address: contractAddress,
      abi: CONTRACT_ABI,
      functionName: 'totalSupply'
    });
    console.log(`✓ Contract has totalSupply: ${supply.toString()}`);
    return { type: 'erc721', supply };
  } catch (error) {
    console.log('✗ totalSupply not available, trying ERC-1155 approach...');
    
    // For ERC-1155, we need to check if tokens exist by testing URI calls
    // Let's try a broader range of common token IDs starting from 1
    const testTokenIds = [1n, 2n, 3n, 4n, 5n, 10n, 100n, 1000n, 10000n];
    let foundTokens = [];
    
    for (const tokenId of testTokenIds) {
      try {
        const uri = await client.readContract({
          address: contractAddress,
          abi: CONTRACT_ABI,
          functionName: 'uri',
          args: [tokenId]
        });
        if (uri && uri !== '') {
          foundTokens.push(tokenId);
          console.log(`✓ Found token ${tokenId.toString()} with URI: ${uri}`);
        } else {
          console.log(`✗ Token ${tokenId.toString()} returned empty URI`);
        }
      } catch (error) {
        console.log(`✗ Token ${tokenId.toString()} not found: ${error.message}`);
      }
    }
    
    if (foundTokens.length > 0) {
      return { type: 'erc1155', foundTokens };
    } else {
      throw new Error(`No tokens found in contract ${contractAddress}. This could mean:
1. No tokens have been minted yet
2. Wrong contract address
3. Wrong network (currently using Ethereum mainnet)
4. Contract uses different function signatures

Please verify:
- Contract address: ${contractAddress}
- Network: Ethereum mainnet
- That tokens have been minted`);
    }
  }
}

async function findLastTokenId(client, contractAddress) {
  let left = 1n; // Start from token ID 1
  let right = 10000n; // Start with a reasonable upper bound
  let lastValidId = 0n;

  console.log('Starting binary search for last token ID...');
  
  while (left <= right) {
    const mid = (left + right) / 2n;
    try {
      console.log(`Testing token ID: ${mid.toString()}`);
      const uri = await client.readContract({
        address: contractAddress,
        abi: CONTRACT_ABI,
        functionName: 'uri',
        args: [mid]
      });
      
      // Check if the URI is valid (not empty or "0")
      if (uri && uri !== '' && uri !== '0') {
        lastValidId = mid;
        left = mid + 1n;
        console.log(`✓ Token ${mid.toString()} exists with URI: ${uri}`);
      } else {
        // Empty URI means token doesn't exist
        right = mid - 1n;
        console.log(`✗ Token ${mid.toString()} has empty URI, searching lower...`);
      }
    } catch (error) {
      // If we can't read this token, it doesn't exist
      right = mid - 1n;
      console.log(`✗ Token ${mid.toString()} doesn't exist, searching lower...`);
    }
  }

  console.log(`Found last valid token ID: ${lastValidId.toString()}`);
  return lastValidId;
}

async function fetchAllMetadata(contractAddress) {
  const transport = http(RPC_URL);
  const client = createPublicClient({
    chain: mainnet,
    transport
  });

  // First, detect what type of contract this is
  const contractInfo = await detectContractType(client, contractAddress);
  console.log(`Detected contract type: ${contractInfo.type}`);

  let tokenIds = [];
  
  if (contractInfo.type === 'erc721') {
    // For ERC-721, we have a totalSupply
    const supply = contractInfo.supply;
    if (supply === 0n) {
      throw new Error('No tokens found in the collection');
    }
    console.log(`Found totalSupply = ${supply.toString()} tokens`);
    
    // Generate token IDs from 1 to supply (starting from 1)
    for (let i = 1n; i <= supply; i++) {
      tokenIds.push(i);
    }
  } else if (contractInfo.type === 'erc1155') {
    // For ERC-1155, start fresh and do sequential scan from 1
    console.log('Starting sequential scan from token ID 1...');
    tokenIds = [];
    
    // We'll populate tokenIds during the metadata fetching loop
    // by scanning sequentially from 1 until we hit an invalid URL
  }

  const allMetadata = {};
  
  if (contractInfo.type === 'erc721') {
    if (tokenIds.length === 0) {
      throw new Error('No tokens found in the collection');
    }
    console.log(`Processing ${tokenIds.length} tokens...`);
    
    for (const tokenId of tokenIds) {
      try {
        let uri = await client.readContract({
          address: contractAddress,
          abi: CONTRACT_ABI,
          functionName: 'uri',
          args: [tokenId]
        });
        
        // Stop fetching if we encounter an empty or invalid URI
        if (!uri || uri === '' || uri === '0') {
          console.log(`⚠️ Stopping at token ${tokenId.toString()}: Empty URI detected`);
          break;
        }
        
        if (uri.startsWith('ipfs://')) uri = uri.replace('ipfs://', 'https://ipfs.io/ipfs/');
        const response = await axios.get(uri, { timeout: 10000 });
        allMetadata[tokenId.toString()] = response.data;
        console.log(`Fetched metadata for token ${tokenId.toString()}`);
      } catch (error) {
        console.log(`⚠️ Stopping at token ${tokenId.toString()}: Invalid URL detected - ${error.message}`);
        break;
      }
    }
  } else if (contractInfo.type === 'erc1155') {
    // For ERC-1155, scan sequentially from 1 until we hit an invalid URL
    console.log('Scanning tokens sequentially from 1...');
    let tokenId = 1n;
    
    while (true) {
      try {
        let uri = await client.readContract({
          address: contractAddress,
          abi: CONTRACT_ABI,
          functionName: 'uri',
          args: [tokenId]
        });
        
        // Stop fetching if we encounter an empty or invalid URI
        if (!uri || uri === '' || uri === '0') {
          console.log(`⚠️ Stopping at token ${tokenId.toString()}: Empty URI detected`);
          break;
        }
        
        if (uri.startsWith('ipfs://')) uri = uri.replace('ipfs://', 'https://ipfs.io/ipfs/');
        const response = await axios.get(uri, { timeout: 10000 });
        allMetadata[tokenId.toString()] = response.data;
        console.log(`Fetched metadata for token ${tokenId.toString()}`);
        tokenId++;
      } catch (error) {
        console.log(`⚠️ Stopping at token ${tokenId.toString()}: Invalid URL detected - ${error.message}`);
        break;
      }
    }
  }

  return allMetadata;
}

(async () => {
  try {
    // Ensure data directory exists
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    
    const metadata = await fetchAllMetadata(CONTRACT_ADDRESS);
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(metadata, null, 2));
    console.log(`\n✅ All metadata written to ${OUTPUT_FILE}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
})();
