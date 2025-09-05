import { WayfinderProvider, LocalStorageGatewaysProvider } from '@ar.io/wayfinder-react';
import { NetworkGatewaysProvider } from '@ar.io/wayfinder-core';
import { ARIO } from '@ar.io/sdk';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from "@/pages/Home"
import Gallery from "@/pages/Gallery"
import Item from "@/pages/Item"
import collectionMetadata from "@/data/collection_metadata.json"  
import PoweredByARIO from "/powered-by-ario.svg"
import ManifoldLogo from "@/assets/manifold-logo.svg"
import AnoncastLogo from "@/assets/anon-logo.png"

function App() {
  return (
    <WayfinderProvider gatewaysProvider={new LocalStorageGatewaysProvider({ 
      ttlSeconds: 3600, // cache the gateways locally for 1 hour to avoid unnecessary network requests
      gatewaysProvider: new NetworkGatewaysProvider({ 
         ario: ARIO.mainnet(), 
         limit: 10, // target the top 3 gateways
         sortBy: 'operatorStake',
         sortOrder: 'desc',
       }), 
     })}>
     <HelmetProvider>
        <Router>
          <div className="min-h-screen">
            <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-sm">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between py-4">
                <Link to="/" className="flex items-center space-x-2">
                  <span className="text-xl font-bold tracking-tighter">{collectionMetadata[1].created_by}</span>
                </Link>
                <div className="flex items-center gap-4">
                  <a href="https://manifold.xyz/" target="_blank" rel="noopener noreferrer" aria-label="Manifold">
                    <img src={ManifoldLogo} alt="Manifold Logo" className="h-8 w-auto rounded" />
                  </a>
                  <a href="https://anoncast.org/" target="_blank" rel="noopener noreferrer" aria-label="Anoncast">
                    <img src={AnoncastLogo} alt="Anoncast Logo" className="h-8 w-auto rounded" />
                  </a>
                </div>
              </div>
            </header>
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/item/:id" element={<Item />} />
              </Routes>
            </main>
            <footer className="border-t py-6 md:py-0">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <a href="https://anoncast.org/" className="font-medium underline underline-offset-4 hover:text-foreground">
                    Anoncast
                  </a>
                  <a href="https://manifold.xyz" className="font-medium underline underline-offset-4 hover:text-foreground">
                    Manifold
                  </a>
                </div>
                <a href="https://ar.io" target="_blank" rel="noopener noreferrer" className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                  <img src={PoweredByARIO} alt="Powered by AR.IO Network" className="h-12 w-auto" />
                </a>
              </div>
            </footer>
          </div>
        </Router>
      </HelmetProvider>
    </WayfinderProvider>
  )
}

export default App
