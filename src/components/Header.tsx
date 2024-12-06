'use client'

import { Flex, Link } from '@radix-ui/themes'
import { ConnectKitButton } from 'connectkit'
import NextLink from 'next/link'
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
        <NextLink href="/">
          <RGBIcon />
        </NextLink>
        <Flex align="center" gap="6">
          <Link asChild>
            <NextLink href="/about">About</NextLink>
          </Link>
          <Link asChild>
            <NextLink href="/gallery">Gallery</NextLink>
          </Link>
          {address && (
            <Link asChild>
              <NextLink href={`/accounts/${address}`}>Profile</NextLink>
            </Link>
          )}
          <ConnectKitButton />
        </Flex>
      </header>
    </Flex>
  )
}
