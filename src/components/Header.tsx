import { Container, Flex } from '@radix-ui/themes'
import { ConnectButton } from './ConnectButton'
import { RGBIcon } from './RGBIcon'

export function Header() {
  return (
    <Container asChild px="2" py="4">
      <header>
        <Flex align="center" justify="between">
          <RGBIcon />
          <ConnectButton />
        </Flex>
      </header>
    </Container>
  )
}
