'use client'

import { chain } from '@/lib/chain'
import { env } from '@/lib/env'
import sdk from '@farcaster/frame-sdk'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { track } from '@vercel/analytics/react'
import { ConnectKitProvider, getDefaultConfig } from 'connectkit'
import {
  type ComponentProps,
  type PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { http, WagmiProvider, createConfig } from 'wagmi'

const config = createConfig(
  getDefaultConfig({
    chains: [chain],
    transports: {
      [chain.id]: http(),
    },
    walletConnectProjectId: env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
    appName: 'RGB',
    appDescription: '16,777,216 onchain rgb values',
    appUrl: 'https://rgb.fun',
    appIcon: 'https://rgb.fun/apple-icon.png',
  }),
)

const queryClient = new QueryClient()

export default function Web3Provider({ children }: PropsWithChildren) {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false)

  useEffect(() => {
    if (!sdk || isSDKLoaded) return
    setIsSDKLoaded(true)
    sdk.actions.ready()
  }, [isSDKLoaded])

  const handleConnect = useCallback(
    ({
      address,
      connectorId,
    }: Parameters<
      NonNullable<ComponentProps<typeof ConnectKitProvider>['onConnect']>
    >[0]) =>
      track('Connect wallet', {
        address: address ?? null,
        connectorId: connectorId ?? null,
      }),
    [],
  )

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider mode="light" onConnect={handleConnect}>
          {children}
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
