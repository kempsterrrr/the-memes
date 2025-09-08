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
      
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="mx-auto max-w-4xl">

            {/* Page Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-8">
              <span className="font-thin">Unruggable</span> NFTs
            </h1>

            {/* Introduction */}
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Our goal is to build on top of 6529's The Memes and make it truly unruggable, ensuring all artwork is easily accessible even if 6529.io goes offline.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4">6529's Decentralization Efforts</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                6529 is a pioneer in the NFT space, embracing <a 
                  href="https://6529.io/about/data-decentralization" 
                  className="text-primary underline underline-offset-4 hover:text-foreground transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  data decentralization
                </a> and permanence on Arweave, whilst giving thousands of artists a platform to showcase their work.
              </p>

              <h2 className="text-2xl font-semibold mb-4">How We've Taken This Further</h2>
              <p className="text-muted-foreground leading-relaxed">
                We've built on top of 6529's work on Arweave, providing decentralized hosting of the collection, its metadata and images. Anyone will now easily be able to access the collection via human readable URLs, forever.
              </p>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-8">
               This explain how we've achived unruggability for 6529's The Memes collection.
              </p>

            {/* ArNS Section */}
            <div className="prose prose-lg max-w-none mb-12">
              <h2 className="text-2xl font-semibold mb-4">Arweave (Decetralized storage)</h2>
              
              <ul className="space-y-2 text-muted-foreground mb-8">
                <li>• All NFT images and metadata are already stored on Arweave (s/o 6259).</li>
                <li>• We scrape the 'uri' function from the collecton contract each day at midnight UTC to source this data.</li>
              </ul>
            </div>

            {/* ArNS Section */}
            <div className="prose prose-lg max-w-none mb-12">
              <h2 className="text-2xl font-semibold mb-4">Arweave Name System (Decentralized Hosting)</h2>
              
              <ul className="space-y-2 text-muted-foreground mb-8">
                <li>• We created a simple static gallery site to host the collection.</li>
                <li>• The Arewave collection data is fed into a this site to generate the gallery which is hosted on <a 
                  href="https://ar.io/arns" 
                  className="text-primary underline underline-offset-4 hover:text-foreground transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ArNS
                </a></li>
                <li>• We also create a unique URL directly to the asset and it's metadata.</li>
              </ul>
            </div>

            {/* ArNS Section */}
            <div className="prose prose-lg max-w-none mb-12">
              <h2 className="text-2xl font-semibold mb-4">AR.IO Network (Decentralized Access)</h2>
              
              <ul className="space-y-2 text-muted-foreground mb-8">
                <li>• This site and all URLs built on ArNS are available as subdomains of over 600 gateways in the <a 
                  href="https://ar.io" 
                  className="text-primary underline underline-offset-4 hover:text-foreground transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  AR.IO Network
                </a>.</li>
                <li>• All Arweave data on the site is requested via the <a 
                  href="https://github.com/ar-io/wayfinder/" 
                  className="text-primary underline underline-offset-4 hover:text-foreground transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Wayfinder Protocol
                </a>, which takes in ar://txid or ar://arns and automatically routes to the fastest available gateway, avoiding hard-coded Arweave.net URLs and ensuring data will always be accessible.</li>
              </ul>
            </div> 

            {/* Back to Home */}
            <div className="text-center">
              <Link to="/">
                <button className="font-mono text-sm bg-black text-white border-2 border-white px-6 py-3 hover:bg-white hover:text-black transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black">
                  <pre className="whitespace-pre">
{`┌─────────────┐
│  BACK HOME   │
└─────────────┘`}
                  </pre>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}