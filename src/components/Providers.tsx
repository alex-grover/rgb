'use client'

import { Theme } from '@radix-ui/themes'
import dynamic from 'next/dynamic'
import type { PropsWithChildren } from 'react'
import { SWRProvider } from './SWRProvider'

const Web3Provider = dynamic(() => import('@/components/Web3Provider'), {
  ssr: false,
})

export function Providers({ children }: PropsWithChildren) {
  return (
    <Theme accentColor="gray" radius="none">
      <Web3Provider>
        <SWRProvider>{children}</SWRProvider>
      </Web3Provider>
    </Theme>
  )
}
