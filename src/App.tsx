import { WayfinderProvider, LocalStorageGatewaysProvider } from '@ar.io/wayfinder-react';
import { NetworkGatewaysProvider, SimpleCacheGatewaysProvider } from '@ar.io/wayfinder-core';
import { ARIO } from '@ar.io/sdk';
import { NFTGallery } from "@/components/nft-gallery"
import collectionMetadata from "@/data/collection_metadata.json"  
import OpenseaLogo from "@/assets/opensea-logo.svg"
import RaribleLogo from "@/assets/rarible-logo.svg"
import ManifoldLogo from "@/assets/manifoldxyz-logo.jpeg"
import PoweredByARIO from "@/assets/powered-by-ario.svg"

function App() {
  
  return (
    <WayfinderProvider gatewaysProvider={new SimpleCacheGatewaysProvider({ 
      gatewaysProvider: new NetworkGatewaysProvider({ 
         ario: ARIO.mainnet(), 
         limit: 3 // target the top 3 gateways
       }), 
      //  ttlSeconds: 3600
     })}>
      <div className="min-h-screen">
        <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between py-4">
            <a href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold tracking-tighter">{collectionMetadata[1].created_by}</span>
            </a>
          </div>
        </header>
        <main className="flex-1">
          <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 lg:py-32">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
                Anoncast X Manifold
              </h1> 
              <p className="max-w-[46rem] text-lg text-muted-foreground sm:text-xl">
              First NFT from @anoncast_ on manifold.xyz for commemorating first anonymous NFT released!
              </p>
              <div className="flex items-center justify-center gap-4 pt-4">
                <a href="https://manifold.xyz/@anoncast/id/4205381872" target="_blank" rel="noopener noreferrer" aria-label="OpenSea">
                  <img src={ManifoldLogo} alt="OpenSea Logo" className="h-12 w-auto rounded" />
                </a>
                <a href="https://opensea.io/collection/anonworld" target="_blank" rel="noopener noreferrer" aria-label="OpenSea">
                  <img src={OpenseaLogo} alt="OpenSea Logo" className="h-12 w-auto rounded" />
                </a>
                <a href="https://rarible.com/collection/base/0xcfef83a405bb87c0aa88a83497669e81d01d1051/items" target="_blank" rel="noopener noreferrer" aria-label="Rarible">
                  <img src={RaribleLogo} alt="Rarible Logo" className="h-12 w-auto" />
                </a>
              </div>
            </div>
          </section>
          <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
            <NFTGallery />
          </section>
        </main>
        <footer className="border-t py-6 md:py-0">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <a href="https://anoncast.org/" className="font-medium underline underline-offset-4 hover:text-foreground">
                Anoncast
              </a>
              <a href="manifold.xyz" className="font-medium underline underline-offset-4 hover:text-foreground">
                Manifold
              </a>
            </div>
            <a href="https://ar.io" target="_blank" rel="noopener noreferrer" className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              <img src={PoweredByARIO} alt="Powered by AR.IO Network" className="h-12 w-auto" />
            </a>
          </div>
        </footer>
      </div>
    </WayfinderProvider>
  )
}

export default App
