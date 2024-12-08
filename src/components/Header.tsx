'use client'

import { chain } from '@/lib/chain'
import { Box, Flex, Grid, Link, Separator } from '@radix-ui/themes'
import { ConnectKitButton } from 'connectkit'
import NextLink from 'next/link'
import { useAccount } from 'wagmi'
import styles from './Header.module.css'
import { RGBIcon } from './RGBIcon'

export function Header() {
  const { address } = useAccount()

  return (
    <Grid
      rows={{ initial: 'auto auto auto', xs: '1' }}
      columns={{ initial: '2', xs: 'auto 1fr auto' }}
      align="center"
      gapX="6"
      asChild
    >
      <header>
        <Flex
          align="center"
          pl={{ initial: '2', xs: '6' }}
          py={{ initial: '2', xs: '4' }}
          asChild
        >
          <NextLink href="/">
            <RGBIcon />
          </NextLink>
        </Flex>
        <Flex
          direction={{ initial: 'row', xs: 'row-reverse' }}
          align="center"
          justify="between"
          gap="6"
          gridRow={{ initial: '3', xs: 'auto' }}
          gridColumn={{ initial: '1 / span 2', xs: 'auto' }}
          overflowX="auto"
          py={{ initial: '3', xs: '0' }}
          className={styles.links}
        >
          <Flex align="center" gap="6" pl={{ initial: '2', xs: '0' }} asChild>
            <nav>
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
            </nav>
          </Flex>
          <Flex align="center" gap="6" pr={{ initial: '2', xs: '0' }} asChild>
            <nav>
              <Link href="https://x.com/rgb_eth" target="_blank">
                X/Twitter
              </Link>
              <Link href="https://warpcast.com/~/channel/rgb" target="_blank">
                Farcaster
              </Link>
              <Link
                href={`${chain.blockExplorers.default.url}/address/0xf3e2399c5D1C698A6C1dfa195ADbd12a6AfD1899`}
                target="_blank"
              >
                rgb.eth
              </Link>
            </nav>
          </Flex>
        </Flex>
        <Box
          gridRow="2"
          gridColumn="1 / span 2"
          display={{ initial: 'block', xs: 'none' }}
          width="100%"
          asChild
        >
          <Separator />
        </Box>
        <Flex
          justify="end"
          pr={{ initial: '2', xs: '6' }}
          py={{ initial: '2', xs: '4' }}
        >
          <ConnectKitButton />
        </Flex>
      </header>
    </Grid>
  )
}
