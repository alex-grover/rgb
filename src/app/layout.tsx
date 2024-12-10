import { Header } from '@/components/Header'
import { Web3Provider } from '@/components/Web3Provider'
import { Flex, Theme } from '@radix-ui/themes'
import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'
import '@radix-ui/themes/styles.css'
import './global.css'
import { SWRProvider } from '@/components/SWRProvider'

export const metadata: Metadata = {
  title: 'RGB Signatures',
  description: 'RGB is an infinite canvas',
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
            </SWRProvider>
          </Web3Provider>
        </Theme>
      </body>
    </html>
  )
}
