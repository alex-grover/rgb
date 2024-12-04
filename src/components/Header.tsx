import { Flex, Link as TamaguiLink } from '@radix-ui/themes'
import Link from 'next/link'
import { ConnectButton } from './ConnectButton'
import { RGBIcon } from './RGBIcon'

export function Header() {
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
          <ConnectButton />
        </Flex>
      </header>
    </Flex>
  )
}
