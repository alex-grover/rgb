'use client'

import { env } from '@/lib/env'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConnectKitProvider, getDefaultConfig } from 'connectkit'
import type { PropsWithChildren } from 'react'
import { http, WagmiProvider, createConfig } from 'wagmi'
import { base, baseSepolia } from 'wagmi/chains'

const chain = env.NEXT_PUBLIC_VERCEL_ENV === 'production' ? base : baseSepolia

const config = createConfig(
  getDefaultConfig({
    chains: [chain],
    transports: {
      [base.id]: http(
        `https://base-mainnet.g.alchemy.com/v2/${env.NEXT_PUBLIC_ALCHEMY_ID}`,
      ),
      [baseSepolia.id]: http(
        `https://base-sepolia.g.alchemy.com/v2/${env.NEXT_PUBLIC_ALCHEMY_ID}`,
      ),
    },
    walletConnectProjectId: env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
    appName: 'RGB Signatures',
    appDescription: 'RGB is an infinite canvas',
    appUrl: 'https://rgb.so',
    appIcon: '', // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
)

const queryClient = new QueryClient()

export const Web3Provider = ({ children }: PropsWithChildren) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
