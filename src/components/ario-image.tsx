import { useArUrl } from "../hooks/use-arweave-link"

type ArioImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string
  alt: string
}

export default function ArioImage({ src, alt, ...rest }: ArioImageProps) {
  const url = useArUrl(src)
  return <img src={url?.toString()} alt={alt} {...rest} />
}