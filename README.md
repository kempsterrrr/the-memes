# Arweave Name System (ArNS) Manifold.xyz Gallery Template

> This repo is in active development howver the main branch should work. Feel free to [DM on X](https://x.com/kempsterrrr) or the [ARIO discord](https://discord.com/invite/HGG52EtTc2) with feedback or questions.

This template provides a modern, decentralised solution for creating and hosting Manifold Art Galleries on Arweave Name System (ArNS).

## Features

- ⚛️ React (Typescript) + Vite
- 🎨 Modern response UI with Tailwind and Shadcn
- 💾 Permanent storage on Arweave
- 🌐 Hosted on Decentralised smart domains via [Arweave Name System (ArNS)](https://ar.io/arns)
- 🦄 Unique ArNS subdomains for each artwork in your collection.
- ⊹ Decentralised unruggable access via > 400 Gateways in [AR.IO Network](https://ar.io)

## How does this work?

AR.IO Network is a decentralised network of Arweave Gateways with over 400 active gateways. The gateways perform two roles:

1. Serve data stored on Arweave by requesting an Arweave transaction ID like so - gatewayurl/TxID (e.g. arweave.net/TxID).
2. Serve Arweave Name System (ArNS) domains as subdomains.

ArNS domains are simply Arweave transactions ID's associated with a human readable domain name which you can permissionlessly lease or purchase permannetly and retain fully control over via the ARIO protocol.

This means as a Manifold creator, you can purchase decentralisd domain which only you control and access this as a subdomain of any of the 100s of gateways in the network, creating the first fully decentralised front end hosting solution.

BONUS - AR.IO Network has recently launched the ar://wayfinder protocol. This allows developers to simply pass ar://TxID anywhere when reqesting data from Arweave and the protocol will intelligently route the data to gateways in the network and verifiy it's authenticity.

This means no hard-coding URLs. So as well as having a decentralisd domainm, we achieve fully decentralised data access as well.

## Prerequisites

- Node.js (Latest LTS version recommended)
- pnpm (v10.10.0 or later)
- Basic understanding of React and TypeScript
- An Arweave wallet
- An Arweave Name System Domain (ArNS) + (check out [this video from Patrick Skinner](https://x.com/ar_io_network/status/1920456149754917127) on how to get yours)
- A Manifold collection contract address

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/arns-manifold-gallery.git
cd arns-manifold-gallery
```

2. Install dependencies:

```bash
pnpm install
```

3. Run `cp .env.example .env` to create your local `.env` file and update the values following the comments in the `.env.example` file.

4. Run `pnpm run get-metadata` to download the Arweave metadata for your Manifold Collection.

5. Run `pnpm run create-and-assign-undernames` to assign each NFT in your collection a unique subdomian.

6. Run `pnpm run dev` to run your gallery locally http://localhost:5173/

The template has a pre-existing design but feel free to edit this to suit your taste 💅

## Deploy your Manifold Gallery on Arweave Name System (ArNS)

The easiest way to deploy your collection is for the command line:

1. Create a local build of your project

```
pnpm run build
```

2. Uplodate the project to Arweave and assign it your ArNS name using permaweb deploy

_Replace [your-arns-name] with your arns name before running this command._

```
DEPLOY_KEY=$(base64 -i wallet.json) npx permaweb-deploy --arns-name [your-arns-name]
```

It is also possible to deploy this using Github actions. The GH Action is written in `./github/workflows`, it has not been tested yet but should work if you follow the guide here in our docs: https://docs.ar.io/guides/permaweb-deploy.

## BOUNS WAYFINDER

As mentioned above, the ar://awayfinder protocol removes the need to hard-code Gateway URLS for requeting data from Arweave. You simple and ar://TxID to instead of gatewayulr/txid wherever you're requesting data and the protocol will intelligently route your request to a gateway in the network. It also has functionality to verify the data being serve is what you're expecting.

The protocol is in Alpha but is functioning. You can see how this is implemented on the following branches:

- `wayfinder-routing` - this example routes all reqests for images to Arweave too different gateways in the network (fully functioning)
- `verification` this example adds verification to those requests (WIP)
