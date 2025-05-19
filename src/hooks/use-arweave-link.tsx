import { useState, useEffect } from 'react'
import { wf } from "../lib/wayfinder"

export function useArUrl(arLink: string) {
  const [url, setUrl] = useState("/placeholder.svg")

  useEffect(() => {
    let cancelled = false

    wf
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
  }, [arLink])

  return url
}
