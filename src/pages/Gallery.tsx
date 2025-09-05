import { useState, useMemo, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import collectionMetadata from "@/data/collection_metadata.json"
import WayfinerImage from "@/components/wayfinder-image"
import SeasonDropdown from "@/components/SeasonDropdown"

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


export default function Gallery() {
  const navigate = useNavigate()
  const [selectedSeason, setSelectedSeason] = useState("All")

  // Process all NFTs
  const allNfts: NFT[] = useMemo(() => 
    Object.entries(collectionMetadata)
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
      })), [])

  // Group NFTs by season
  const nftsBySeason = useMemo(() => {
    const grouped: { [key: string]: NFT[] } = { "All": allNfts }
    
    allNfts.forEach(nft => {
      const seasonAttr = nft.attributes.find(attr => attr.trait_type === "Type - Season")
      if (seasonAttr) {
        const seasonValue = seasonAttr.value
        if (!grouped[seasonValue]) {
          grouped[seasonValue] = []
        }
        grouped[seasonValue].push(nft)
      }
    })
    
    return grouped
  }, [allNfts])

  // Create season options for dropdown
  const seasonOptions = useMemo(() => {
    const options = [
      { value: "All", label: "All", count: allNfts.length }
    ]
    
    // Get all unique seasons and sort them numerically
    const seasons = Object.keys(nftsBySeason)
      .filter(key => key !== "All")
      .sort((a, b) => parseInt(a) - parseInt(b))
    
    seasons.forEach(season => {
      options.push({
        value: season,
        label: `SZN${season}`,
        count: nftsBySeason[season].length
      })
    })
    
    return options
  }, [nftsBySeason, allNfts.length])

  // Get current season's NFTs
  const currentNfts = nftsBySeason[selectedSeason] || []

  // Infinite scroll state
  const [displayedItems, setDisplayedItems] = useState<NFT[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const itemsPerPage = selectedSeason === "All" ? 20 : currentNfts.length

  // Load more items function
  const loadMoreItems = useCallback(() => {
    if (isLoading || !hasMore) return

    setIsLoading(true)
    
    // Simulate loading delay for smooth UX
    setTimeout(() => {
      const startIndex = (currentPage - 1) * itemsPerPage
      const endIndex = startIndex + itemsPerPage
      const newItems = currentNfts.slice(startIndex, endIndex)
      
      setDisplayedItems(prev => [...prev, ...newItems])
      setCurrentPage(prev => prev + 1)
      setHasMore(endIndex < currentNfts.length)
      setIsLoading(false)
    }, 300)
  }, [currentNfts, currentPage, itemsPerPage, isLoading, hasMore])

  // Handle scroll for infinite loading
  const handleScroll = useCallback(() => {
    if (selectedSeason !== "All") return // Only infinite scroll for "All" view
    
    if (window.innerHeight + document.documentElement.scrollTop 
        >= document.documentElement.offsetHeight - 200) {
      loadMoreItems()
    }
  }, [selectedSeason, loadMoreItems])

  // Reset and load initial items when season changes
  useEffect(() => {
    setDisplayedItems([])
    setCurrentPage(1)
    setHasMore(true)
    setIsLoading(false)
  }, [selectedSeason])

  // Load initial items
  useEffect(() => {
    if (currentNfts.length > 0 && displayedItems.length === 0 && !isLoading) {
      loadMoreItems()
    }
  }, [currentNfts, displayedItems.length, loadMoreItems, isLoading])

  // Add scroll listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])


  const handleNFTClick = (nft: NFT) => {
    navigate(`/item/${nft.id}`)
  }

  const handleSeasonChange = (season: string) => {
    setSelectedSeason(season)
  }

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
      {/* Season Filter */}
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">Gallery</h1>
        <SeasonDropdown
          seasons={seasonOptions}
          selectedSeason={selectedSeason}
          onSeasonChange={handleSeasonChange}
        />
      </div>

      {/* NFT Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedItems.map((nft) => (
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

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}

      {/* End of Results */}
      {!hasMore && selectedSeason === "All" && displayedItems.length > 0 && (
        <div className="text-center py-8 text-muted-foreground">
          You've reached the end of the collection
        </div>
      )}
    </section>
  )
}
