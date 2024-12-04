import { Container, Flex, Link as TamaguiLink } from '@radix-ui/themes'
import Link from 'next/link'
import { ConnectButton } from './ConnectButton'
import { RGBIcon } from './RGBIcon'

export function Header() {
  return (
    <Container asChild px="2" py="4" flexGrow="0">
      <header>
        <Flex align="center" justify="between">
          <Link href="/">
            <RGBIcon />
          </Link>
          <Flex align="center" gap="6">
            <TamaguiLink asChild>
              <Link href="/gallery">Gallery</Link>
            </TamaguiLink>
            <ConnectButton />
          </Flex>
        </Flex>
      </header>
    </Container>
  )
}
