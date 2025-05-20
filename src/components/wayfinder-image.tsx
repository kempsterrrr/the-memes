import { useWayfinderUrl } from "../hooks/use-wayfinder"
import { useState } from "react"

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
  const url = useWayfinderUrl(src)
  const [error, setError] = useState(false)

  return (
    <img 
      src={error ? fallbackSrc : url?.toString()} 
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setError(true)}
      width={`${width}px`}
      height={`${height}px`}
      className={className}
      {...rest}
    />
  )
}