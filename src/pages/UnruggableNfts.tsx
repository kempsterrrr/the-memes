import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function UnruggableNfts() {
  return (
    <>
      <Helmet>
        <title>Unruggable NFTs - The Memes</title>
        <meta name="description" content="Learn about unruggable NFTs and how we've made 6529's The Memes truly unruggable" />
        <meta name="keywords" content="unruggable, NFTs, decentralization, ArNS, Arweave, blockchain, permanent" />
        <meta name="author" content="The Memes" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      </Helmet>
      
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 lg:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
              Unruggable NFTs
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our goal is to build on top of 6529's The Memes and make it truly unruggable, ensuring all artwork is easily accessible even if 6529.io goes offline.
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="grid gap-8 md:grid-cols-2 mb-12">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">6529's decetralization efforts</h2>
                <p className="text-muted-foreground">
                6529 is a pioneer in the NFT space, embracing decentralization and permanance, whilst giving 1000s of artists a platform to showcase their work and embracing <a href="https://6529.io/about/data-decentralization" className="text-primary underline underline-offset-4 hover:text-foreground transition-colors duration-200">data decentralization</a>.
                </p>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">How we've take this further</h2>
                <p className="text-muted-foreground">
                We've built on top of 6529's work on Arweave, providing decentralized hosting of the collection, it's metadata and images. Anyone will now easily be able to access the collection via human readable URLs, even if 6529.io goes offline.
                </p>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-8 mb-12">
              <h2 className="text-2xl font-semibold mb-4">Arweave Name System (ArNS)</h2>
              <p className="text-muted-foreground mb-4">
                The Memes collection is built on Arweave's permanent storage network with ArNS naming, 
                ensuring your NFTs will never disappear, break, or become inaccessible due to server issues.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• <strong>Permanent Storage:</strong> No expiration dates, no monthly fees</li>
                <li>• <strong>Truly Decentralized:</strong> No single point of failure</li>
                <li>• <strong>Censorship Resistant:</strong> Cannot be taken down or modified</li>
                <li>• <strong>Multiple Gateways:</strong> Always accessible through various entry points</li>
                <li>• <strong>Immutable Metadata:</strong> Once stored, never changes</li>
              </ul>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">How We Achieve Unruggability</h2>
              
              <div className="space-y-4">
                <h3 className="text-xl font-medium">1. Permanent Storage on Arweave</h3>
                <p className="text-muted-foreground">
                  All metadata and images are stored directly on Arweave's blockchain, not on 
                  centralized servers. This means your NFT data is permanent and cannot be 
                  deleted or modified once uploaded.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-medium">2. Multiple Gateway Access</h3>
                <p className="text-muted-foreground">
                  Our Wayfinder system automatically routes to the fastest available Arweave 
                  gateway, ensuring your NFTs are always accessible even if one gateway goes down.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-medium">3. Immutable Metadata</h3>
                <p className="text-muted-foreground">
                  Once your NFT metadata is stored on Arweave, it cannot be changed, updated, 
                  or corrupted. The hash of your content is permanently recorded on the blockchain.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-medium">4. No Single Point of Failure</h3>
                <p className="text-muted-foreground">
                  Unlike traditional NFTs that depend on a single server or IPFS gateway, 
                  our NFTs are distributed across Arweave's global network of miners and gateways.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link 
                to="/" 
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
