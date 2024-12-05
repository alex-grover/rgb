'use client'

import { Flex, Link as TamaguiLink } from '@radix-ui/themes'
import { ConnectKitButton } from 'connectkit'
import Link from 'next/link'
import { useAccount } from 'wagmi'
import { RGBIcon } from './RGBIcon'

export function Header() {
  const { address } = useAccount()

  return (
    <Flex
      asChild
      px={{ initial: '2', xs: '6' }}
      py="4"
      flexGrow="0"
      justify="between"
    >
      <header>
        <Link href="/">
          <RGBIcon />
        </Link>
        <Flex align="center" gap="6">
          <TamaguiLink asChild>
            <Link href="/gallery">Gallery</Link>
          </TamaguiLink>
          {address && (
            <TamaguiLink asChild>
              <Link href={`/accounts/${address}`}>Profile</Link>
            </TamaguiLink>
          )}
          <ConnectKitButton />
        </Flex>
      </header>
    </Flex>
  )
}
