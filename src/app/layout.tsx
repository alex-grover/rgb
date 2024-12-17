import { Header } from '@/components/Header'
import { MintFeed } from '@/components/MintFeed'
import { Providers } from '@/components/Providers'
import { Flex } from '@radix-ui/themes'
import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'
import '@radix-ui/themes/styles.css'
import './global.css'

export const metadata: Metadata = {
  title: 'RGB',
  description: '16,777,216 onchain rgb values',
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Flex direction="column" minHeight="100dvh">
            <Header />
            {children}
          </Flex>
          <MintFeed />
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
