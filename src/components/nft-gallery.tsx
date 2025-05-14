import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import collectionMetadata from "@/data/collection_metadata.json"
import { Button } from "./ui/button"

type NFT = {
  id: string
  name: string
  created_by: string
  description: string
  image: string
  image_url: string
  image_details: {
    width: number
    height: number
    format: string
  }
}

const nfts: NFT[] = Object.entries(collectionMetadata).map(([id, data]) => ({
  id,
  name: data.name,
  created_by: data.created_by,
  description: data.description,
  image: data.image,
  image_url: data.image_url,
  image_details: data.image_details
}))

function NFTDialog({ nft, open, onOpenChange }: { nft: NFT, open: boolean, onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden">
        <div className="grid md:grid-cols-2 h-full">
          {/* Image section */}
          <div className="relative aspect-square md:aspect-auto md:h-full bg-black">
            <img
              src={nft.image_url || "/placeholder.svg"}
              alt={nft.name}
              width={nft.image_details.width}
              height={nft.image_details.height}
              className="h-full w-full object-cover"
            />
          </div>
          {/* Details section */}
          <div className="flex flex-col p-6" style={{ maxHeight: '90vh' }}>
            {/* Header */}
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold leading-tight">{nft.name}</DialogTitle>
              <div className="text-lg font-medium text-muted-foreground mb-4">by {nft.created_by}</div>
              <hr className="my-2" />
            </DialogHeader>
            {/* About section with show more */}
            <div className="py-6 flex-grow">
              <h4 className="text-sm font-medium mb-3">About this artwork</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {nft.description}
                </p>
            </div>
            {/* Artwork Details */}
            <div className="pt-4 border-t mt-auto">
              <h4 className="text-sm font-medium mb-3">Artwork Details</h4>
              <div className="space-y-3 bg-muted/40 rounded-md p-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Format</span>
                      <span className="font-medium">{nft.image_details.format}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Dimensions</span>
                      <span className="font-medium">{nft.image_details.width} × {nft.image_details.height}</span>
                    </div>
    
                  </div>
            </div>
            {/* Action row */}
            <div className="flex justify-between items-center mt-6">
              <Button variant="default" className="cursor-pointer" size="lg"><a href={`https://` + nft.name.replace(/\s+/g, '-') + `_manifoldtest.arweave.net`} target="_blank" rel="noopener noreferrer">View Full Image</a></Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function NFTGallery() {
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null)

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
        {nfts.map((nft) => (
          <div
            key={nft.id}
            className="group relative overflow-hidden rounded-lg border bg-background shadow-sm transition-all hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-primary/5 mb-6 break-inside-avoid"
            onClick={() => setSelectedNFT(nft)}
          >
            <div className="overflow-hidden rounded-t-lg">
              <img
                src={nft.image_url || "/placeholder.svg"}
                alt={nft.name}
                width={nft.image_details.width}
                height={nft.image_details.height}
                className="w-full transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="bg-background p-4 rounded-b-lg border-t">
              <h3 className="font-medium text-xl text-foreground">{nft.name}</h3>
              <p className="text-sm text-muted-foreground">{nft.created_by}</p>
            </div>
            <button className="absolute inset-0 cursor-pointer" aria-label={`View details for ${nft.name}`} />
          </div>
        ))}
      </div>
      {/* Dialog for selected NFT */}
      {selectedNFT && (
        <NFTDialog nft={selectedNFT} open={!!selectedNFT} onOpenChange={(open) => !open && setSelectedNFT(null)} />
      )}
    </>
  )
}
