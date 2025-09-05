import { useState, useEffect, useCallback } from 'react'

interface UseInfiniteScrollOptions {
  items: any[]
  itemsPerPage?: number
  threshold?: number
}

export function useInfiniteScroll({ 
  items, 
  itemsPerPage = 20, 
  threshold = 200 
}: UseInfiniteScrollOptions) {
  const [displayedItems, setDisplayedItems] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const loadMoreItems = useCallback(() => {
    if (isLoading || !hasMore) return

    setIsLoading(true)
    
    // Simulate loading delay for smooth UX
    setTimeout(() => {
      const startIndex = (currentPage - 1) * itemsPerPage
      const endIndex = startIndex + itemsPerPage
      const newItems = items.slice(startIndex, endIndex)
      
      setDisplayedItems(prev => [...prev, ...newItems])
      setCurrentPage(prev => prev + 1)
      setHasMore(endIndex < items.length)
      setIsLoading(false)
    }, 300)
  }, [items, currentPage, itemsPerPage, isLoading, hasMore])

  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop 
        >= document.documentElement.offsetHeight - threshold) {
      loadMoreItems()
    }
  }, [loadMoreItems, threshold])

  useEffect(() => {
    // Reset when items change
    setDisplayedItems([])
    setCurrentPage(1)
    setHasMore(true)
    setIsLoading(false)
  }, [items])

  useEffect(() => {
    // Load initial items
    if (items.length > 0 && displayedItems.length === 0 && !isLoading) {
      loadMoreItems()
    }
  }, [items, displayedItems.length, loadMoreItems, isLoading])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return {
    displayedItems,
    isLoading,
    hasMore,
    loadMoreItems
  }
}
