import { useWayfinderUrl } from "@ar.io/wayfinder-react"

type WayfinerImage = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string
  alt: string
  fallbackSrc?: string
  className?: string
}

export default function WayfinerImage({ 
  src, 
  alt, 
  width,
  height,
  fallbackSrc = "/placeholder.svg",
  className = "",
  ...rest 
}: WayfinerImage) {
  // const { wayfinder } = useWayfinder()
  // const [wayfinderUrl, setWayfinderUrl] = useState<URL | null>(null)

  console.log('🔍 WayfinderImage src:', src)

  // useEffect(() => { 
  //   const resolveUrl = async () => {
  //     try {
  //       const wayfinderUrl = await wayfinder.resolveUrl({ originalUrl: `ar://${src}`})
  //       console.log('🔍 WayfinderImage wayfinderUrl:', wayfinderUrl)
  //       setWayfinderUrl(wayfinderUrl);
  //     } catch (error) {
  //       console.log('🔍 WayfinderImage error:', error)
  //     }
  //   };
  //   resolveUrl();
  // }, [src, wayfinder]);

  const { resolvedUrl, error } = useWayfinderUrl({ txId: src })
  console.log('🔍 WayfinderImage resolvedUrl:', resolvedUrl)
  console.log('🔍 WayfinderImage error:', error)

  return (
    <img 
      src={resolvedUrl || fallbackSrc} 
      alt={alt}
      loading="lazy"
      decoding="async"
      // onError={() => setError(true)}
      width={`${width}px`}
      height={`${height}px`}
      className={className}
      {...rest}
    />
  )
}