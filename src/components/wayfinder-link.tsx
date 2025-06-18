// import { useWayfinderUrl } from "../hooks/use-wayfinder"
import { useWayfinder } from "@ar.io/wayfinder-react"
import { useState, useEffect } from "react"

type WayfinderLink = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  children: React.ReactNode
  fallbackHref?: string
  className?: string
}

export default function WayfinderLink({ 
  href, 
  children,
  fallbackHref = "#",
  className = "",
  ...rest 
}: WayfinderLink) {
  const { wayfinder } = useWayfinder()
  const [wayfinderUrl, setWayfinderUrl] = useState<URL | null>(null)

  useEffect(() => { 
    const resolveUrl = async () => {
      try {
        const wayfinderUrl = await wayfinder.resolveUrl({ originalUrl: `ar://${href}`})
        console.log('🔍 WayfinderLink wayfinderUrl:', wayfinderUrl)
        setWayfinderUrl(wayfinderUrl);
      } catch (error) {
        console.log('🔍 WayfinderLink error:', error)
      }
    };
    resolveUrl();
  }, [href, wayfinder]);


  // // Check if this is the problematic first item
  // const isFirstItem = href.includes('after-the-streetlights-stopped-grieving')

  // // Debug logging when URL changes
  // useEffect(() => {
  //   console.log('🔗 WayfinderLink URL resolved:', href, '→', url)
    
  //   if (isFirstItem) {
  //     console.log('🚨 First item link URL:', url)
  //     console.log('   Original href:', href)
  //     console.log('   Is placeholder?', url === "/placeholder.svg")
  //     console.log('   Is error state?', error)
  //   }
    
  //   if (url === "/placeholder.svg") {
  //     console.warn('⚠️  WayfinderLink using placeholder - resolution may have failed for:', href)
  //     if (isFirstItem) {
  //       console.error('🚨 First item is stuck on placeholder!')
  //     }
  //   }
  // }, [href, url, error, isFirstItem])

  return (
    <a 
      href={wayfinderUrl?.toString() || fallbackHref} 
      className={className}
      // onError={() => setError(true)}
      {...rest}
    >
      {children}
    </a>
  )
} 