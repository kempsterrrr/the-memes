import { useState, useEffect } from 'react'
import { useWayfinder } from '../providers/wayfinder-provider'

export function useWayfinderUrl(arLink: string) {
  const wayfinder = useWayfinder()
  const [url, setUrl] = useState("/placeholder.svg")

  useEffect(() => {
    let cancelled = false

    wayfinder
      .resolveUrl({ originalUrl: arLink })
      .then(u => {
        if (!cancelled) {
          setUrl(u.toString())
        }
      })
      .catch(err => {
        console.error('Wayfinder failed to resolve', err)
      })

    return () => {
      cancelled = true
    }
  }, [arLink, wayfinder])

  return url
}
