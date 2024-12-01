import { Header } from '@/components/Header'
import { Web3Provider } from '@/components/Web3Provider'
import { Flex, Theme } from '@radix-ui/themes'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import type { PropsWithChildren } from 'react'
import '@radix-ui/themes/styles.css'
import './global.css'

export const metadata: Metadata = {
  title: 'RGB Signatures',
  description: 'RGB is an infinite canvas',
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class">
          <Theme accentColor="gray" grayColor="gray" radius="none">
            <Web3Provider>
              <Flex direction="column" minHeight="100dvh">
                <Header />
                {children}
              </Flex>
            </Web3Provider>
          </Theme>
        </ThemeProvider>
      </body>
    </html>
  )
}
