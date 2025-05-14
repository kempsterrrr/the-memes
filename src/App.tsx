import { NFTGallery } from "@/components/nft-gallery"
import collectionMetadata from "@/data/collection_metadata.json"
import DarkModeToggle from "@/components/DarkModeToggle"

function App() {
  
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between py-4">
          <a href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tighter">{collectionMetadata[1].created_by}</span>
          </a>
          <DarkModeToggle />
        </div>
      </header>
      <main className="flex-1">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 lg:py-32">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
              Digital Artworks Collection
            </h1>
            <p className="max-w-[46rem] text-lg text-muted-foreground sm:text-xl">
              A collection of poetic digital artworks exploring themes of memory, loss, and the quiet moments between. Each piece is a window into the artist's unique perspective on the human experience.
            </p>
          </div>
        </section>
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
          <NFTGallery />
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 Digital Realm. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href="#" className="font-medium underline underline-offset-4 hover:text-foreground">
              Instagram
            </a>
            <a href="#" className="font-medium underline underline-offset-4 hover:text-foreground">
              Twitter
            </a>
            <a href="#" className="font-medium underline underline-offset-4 hover:text-foreground">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
