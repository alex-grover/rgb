import { Header } from '@/components/Header'
import { MintFeed } from '@/components/MintFeed'
import { SWRProvider } from '@/components/SWRProvider'
import { Web3Provider } from '@/components/Web3Provider'
import { Flex, Theme } from '@radix-ui/themes'
import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'
import '@radix-ui/themes/styles.css'
import './global.css'

export const metadata: Metadata = {
  title: 'RGB',
  description:
    'Mint an RGB Signature - a collection of 16,777,216 NFTs on Base',
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Theme accentColor="gray" radius="none">
          <Web3Provider>
            <SWRProvider>
              <Flex direction="column" minHeight="100dvh">
                <Header />
                {children}
              </Flex>
              <MintFeed />
            </SWRProvider>
          </Web3Provider>
        </Theme>
        <Analytics />
      </body>
    </html>
  )
}
