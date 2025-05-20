import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'
import { Wayfinder, StaticGatewayRouter, PriorityGatewayRouter, ARIO } from '@ar.io/sdk'

type WayfinderContextType = {
  // @ts-expect-error - fetch is not typed correctly in the SDK
  wayfinder: Wayfinder<typeof fetch>
}

type WayfinderProviderProps = {
  children: ReactNode
  options?: {
    // Network configuration
    network?: 'mainnet' | 'testnet'
    
    // Gateway configuration
    gateway?: string
    usePriorityRouter?: boolean
    
    // Priority router options
    priorityOptions?: {
      sortBy: 'operatorStake' | 'totalDelegatedStake' | 'startTimestamp'
      sortOrder: 'asc' | 'desc'
      limit: number
    }
    
    // Verification options
    verification?: {
      enabled: boolean
      timeout?: number
      maxRetries?: number
    }
    
    // Cache options
    cache?: {
      enabled: boolean
      ttl?: number
      maxSize?: number
    }
    
    // HTTP client options
    httpClient?: {
      timeout?: number
      maxRedirects?: number
      retryOnError?: boolean
    }
  }
}

const WayfinderContext = createContext<WayfinderContextType | null>(null)

export function WayfinderProvider({ 
  children, 
  options = {} 
}: WayfinderProviderProps) {
  const {
    network = 'mainnet',
    gateway = 'https://arweave.net',
    usePriorityRouter = false,
    priorityOptions = {
      sortBy: 'operatorStake' as const,
      sortOrder: 'desc' as const,
      limit: 2
    },
    verification = {
      enabled: false,
      timeout: 5000,
      maxRetries: 3
    },
    cache = {
      enabled: true,
      ttl: 3600,
      maxSize: 1000
    },
    httpClient = {
      timeout: 10000,
      maxRedirects: 5,
      retryOnError: true
    }
  } = options

  // Initialize ARIO client
  const ario = network === 'mainnet' ? ARIO.mainnet() : ARIO.testnet()

  // Initialize the appropriate router
  const router = usePriorityRouter
    ? new PriorityGatewayRouter({
        ario,
        sortBy: priorityOptions.sortBy,
        sortOrder: priorityOptions.sortOrder,
        limit: priorityOptions.limit
      })
    : new StaticGatewayRouter({ gateway })

  // Initialize Wayfinder with all options
  // @ts-expect-error - fetch is not typed correctly in the SDK
  const wayfinder = new Wayfinder<typeof fetch>({
    router,
    httpClient: fetch,
    verification: verification.enabled ? {
      timeout: verification.timeout,
      maxRetries: verification.maxRetries
    } : undefined,
    cache: cache.enabled ? {
      ttl: cache.ttl,
      maxSize: cache.maxSize
    } : undefined,
    httpClientOptions: {
      timeout: httpClient.timeout,
      maxRedirects: httpClient.maxRedirects,
      retryOnError: httpClient.retryOnError
    }
  })

  return (
    <WayfinderContext.Provider value={{ wayfinder }}>
      {children}
    </WayfinderContext.Provider>
  )
}

// Custom hook to use the Wayfinder context
export function useWayfinder() {
  const context = useContext(WayfinderContext)
  if (!context) {
    throw new Error('useWayfinder must be used within a WayfinderProvider')
  }
  return context.wayfinder
} 