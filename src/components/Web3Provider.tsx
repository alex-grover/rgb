'use client'

import { chain, rpcUrl } from '@/lib/chain'
import { env } from '@/lib/env'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConnectKitProvider, getDefaultConfig } from 'connectkit'
import type { PropsWithChildren } from 'react'
import { http, WagmiProvider, createConfig } from 'wagmi'

const config = createConfig(
  getDefaultConfig({
    chains: [chain],
    transports: {
      [chain.id]: http(rpcUrl),
    },
    walletConnectProjectId: env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
    appName: 'RGB Signatures',
    appDescription: 'RGB is an infinite canvas',
    appUrl: 'https://rgb.fun',
    appIcon: '', // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
)

const queryClient = new QueryClient()

export const Web3Provider = ({ children }: PropsWithChildren) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider mode="light">{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
