import { useContext, createContext } from 'react'
import type { Account, JsonRpcProvider } from 'near-api-js'

interface NearContextValue {
  nearAccount: Account | null
  walletId: string
  provider: JsonRpcProvider
}

export const NearContext = createContext<NearContextValue | undefined>(undefined)

export function useNEAR(): NearContextValue {
  const context = useContext(NearContext)
  if (!context) throw new Error('useNEAR must be used within a <NEARxPrivy> provider')
  return context
}
