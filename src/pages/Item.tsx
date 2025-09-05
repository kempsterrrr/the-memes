import { useParams, useNavigate } from "react-router-dom"
import { Helmet } from 'react-helmet-async'
import { Button } from "@/components/ui/button"
import WayfinerImage from "@/components/wayfinder-image"
import WayfinderLink from "@/components/wayfinder-link"
import { ExternalLink, ArrowLeft } from "lucide-react"
import collectionMetadata from "@/data/collection_metadata.json"
import OpenseaLogo from "@/assets/opensea-logo.svg"
import MagicEdenLogo from "@/assets/magic-eden-logo.svg"
import RaribleLogo from "@/assets/rarible-logo.svg"

type NFT = {
  id: string
  index: number
  name: string
  created_by: string
  description: string
  image: string
  image_url: string
  attributes: {
    trait_type: string
    value: string | number
    display_type?: string
    max_value?: string | number
  }[]
  image_details: {
    width: number
    height: number
    format: string
  }
}

export default function Item() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  // Find the NFT by ID
  const nftData = id ? (collectionMetadata as any)[id] : null
  
  if (!nftData) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">NFT not found</h1>
          <Button onClick={() => navigate('/gallery')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Gallery
          </Button>
        </div>
      </div>
    )
  }

  const nft: NFT = {
    id: id!,
    index: parseInt(id!, 10) - 1,
    name: nftData.name,
    created_by: nftData.created_by,
    description: nftData.description,
    image: nftData.image,
    image_url: nftData.image_url,
    image_details: nftData.image_details,
    attributes: nftData.attributes
  }

  const nftNumber = nft.index + 1
  const arnsUrl = `${nftNumber.toString()}_anoncast-x-manifold`

  return (
    <>
      <Helmet>
        <title>{nft.name} - Anoncast X Manifold</title>
        <meta name="description" content={nft.description} />
        <meta name="og:image" content={nft.image_url} />
      </Helmet>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <div className="mb-6">
          <Button variant="outline" onClick={() => navigate('/gallery')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Gallery
          </Button>
        </div>

        {/* Main content */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Image section */}
          <div className="relative aspect-square lg:aspect-auto lg:h-[600px] bg-black rounded-lg overflow-hidden flex-shrink-0">
            <WayfinerImage
              src={nft.image_url.replace(/https:\/\/arweave\.net\//g, '')}
              alt={nft.name}
              className="h-full w-full object-cover"
            />
          </div>
          
          {/* Details section */}
          <div className="flex flex-col space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold leading-tight mb-2">{nft.name}</h1>
              <div className="text-lg font-medium text-muted-foreground mb-4">by {nft.created_by}</div>
            </div>

            {/* About section */}
            <div>
              <h2 className="text-lg font-semibold mb-3">About this artwork</h2>
              <p className="text-muted-foreground leading-relaxed">
                {nft.description}
              </p>
            </div>

            {/* Artwork Details */}
            <div className="border-t pt-6">
              <h2 className="text-lg font-semibold mb-3">Info</h2>
              <div className="space-y-3 bg-muted/40 rounded-md p-4">
                <div className="flex flex-col sm:flex-row sm:justify-between text-sm gap-1">
                  <span className="text-muted-foreground text-xs sm:text-sm break-all">0x714a1a6ea4cb1d3f5199f51e813adf442aa8344f</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Base</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{`#${nft.id}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">ERC-721</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{nft.image_details.width} × {nft.image_details.height}</span>
                </div>
              </div>
            </div>

            {/* Artwork Attributes */}
            <div className="border-t pt-6">
              <h2 className="text-lg font-semibold mb-3">Attributes</h2>
              <div className="space-y-3 bg-muted/40 rounded-md p-4">
                {nft.attributes.map((attribute, index) => (
                  <div key={index} className="flex flex-col sm:flex-row sm:justify-between text-sm gap-1">
                    <span className="text-muted-foreground break-words">{attribute.trait_type}</span>
                    <span className="font-medium break-words">{String(attribute.value)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button variant="default" className="cursor-pointer w-full sm:w-auto" size="lg">
                <WayfinderLink href={arnsUrl} target="_blank" rel="noopener noreferrer">
                  <span className="flex items-center">
                    Perma Link <ExternalLink className="ml-2 h-4 w-4" />
                  </span>
                </WayfinderLink>
              </Button>
              
              <div className="flex justify-center sm:justify-start space-x-6 items-center">
                <a href={`https://opensea.io/item/base/0x714a1a6ea4cb1d3f5199f51e813adf442aa8344f/${nft.id}`} target="_blank" rel="noopener noreferrer" aria-label="OpenSea">
                  <img src={OpenseaLogo} alt="OpenSea Logo" className="h-6 w-auto" />
                </a>
                <a href={`https://magiceden.io/item-details/base/0x714a1a6ea4cb1d3f5199f51e813adf442aa8344f/${nft.id}`} target="_blank" rel="noopener noreferrer" aria-label="Magic Eden">
                  <img src={MagicEdenLogo} alt="Magic Eden Logo" className="h-6 w-auto" />
                </a>
                <a href={`https://rarible.com/token/base/0xcfef83a405bb87c0aa88a83497669e81d01d1051:${nft.id}`} target="_blank" rel="noopener noreferrer" aria-label="Rarible">
                  <img src={RaribleLogo} alt="Rarible Logo" className="h-6 w-auto" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
