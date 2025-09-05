import { useState } from "react"
import { useNavigate } from "react-router-dom"
import collectionMetadata from "@/data/collection_metadata.json"
import WayfinerImage from "@/components/wayfinder-image"

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
    value: string
    display_type: string
  }[]
  image_details: {
    width: number
    height: number
    format: string
  }
}

const nfts: NFT[] = Object.entries(collectionMetadata)
.sort(([a], [b]) => parseInt(a, 10) - parseInt(b, 10))
.map(([id, data], index) => ({
  id,
  index,
  name: data.name,
  created_by: data.created_by,
  description: data.description,
  image: data.image,
  image_url: data.image_url,
  image_details: data.image_details,
  attributes: data.attributes
}))

export default function Gallery() {
  const navigate = useNavigate()

  const handleNFTClick = (nft: NFT) => {
    navigate(`/item/${nft.id}`)
  }

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {nfts.map((nft) => (
          <div
            key={nft.id}
            className="group relative overflow-hidden rounded-lg border bg-background shadow-sm transition-all hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-primary/5 cursor-pointer"
            onClick={() => handleNFTClick(nft)}
          >
            <div 
              className="overflow-hidden rounded-t-lg"
              style={{
                aspectRatio: `${nft.image_details.width} / ${nft.image_details.height}`
              }}
            >
              <WayfinerImage
                src={nft.image_url.replace(/https:\/\/arweave\.net\//g, '')}
                alt={nft.name}
                width={nft.image_details.width}
                height={nft.image_details.height}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
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
    </section>
  )
}
