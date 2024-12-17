import {
  Box,
  Container,
  Flex,
  Heading,
  Link,
  Section,
  Text,
} from '@radix-ui/themes'
import Image from 'next/image'
import image1 from './images/1.png'
import image2 from './images/2.png'
import image3 from './images/3.png'
import image4 from './images/4.png'
import image5 from './images/5.png'
import image6 from './images/6.png'
import image7 from './images/7.png'
import image8 from './images/8.png'
import image9 from './images/9.png'
import styles from './page.module.css'

export default function AboutPage() {
  return (
    <Box flexGrow="1" pt="6" pb="8">
      <Container size="1" px="2">
        <Flex direction="column" gap="4" asChild>
          <Section pt="0">
            <Flex direction="column" gap="1">
              <Heading size="3" weight="medium">
                Introduction to RGB
              </Heading>
              <Text as="p" weight="medium" color="gray">
                The Signature Formula
              </Text>
            </Flex>
            <Box width="100%" height="auto" asChild>
              <Image src={image1} alt="RGB logo" />
            </Box>
            <Heading size="3" weight="medium">
              What is RGB?
            </Heading>
            <Text as="p" weight="medium" color="gray">
              RGB is an onchain framework based on the rgb color model.
            </Text>
            <Text as="p" weight="medium" color="gray">
              It uses the constraint of three channels— R, G, and B. Each
              channel ranges from 0 to 255 (in 8-bit color), allowing for
              16,777,216 possible combinations.
            </Text>
            <Text as="p" weight="medium" color="gray">
              For example, rgb(255,153,0) represents{' '}
              <Text className={styles.orange}>Orange.</Text>
            </Text>
            <Text as="p" weight="medium" color="gray">
              However, color is just one expression of rgb.
            </Text>
            <Text as="p" weight="medium" color="gray">
              What if rgb values could be represented by emojis instead?
            </Text>
            <Text as="p" weight="medium" color="gray">
              Then for example, rgb(255,153,0) could represent 🤠🥳🙂.
            </Text>
            <Text as="p" weight="medium" color="gray">
              This is the fundamental constraint that RGB is centered around:
              the combination of 3 inputs to create 16,777,216 unique outputs.
            </Text>
          </Section>
        </Flex>
        <Flex direction="column" gap="4" asChild>
          <Section pt="0">
            <Heading size="3" weight="medium">
              What are the Signatures for?
            </Heading>
            <Text as="p" weight="medium" color="gray">
              Signatures are the visual representations of rgb values that are
              contained in the metadata.
            </Text>
            <Text as="p" weight="medium" color="gray">
              The RGB Signature is the entry into the RGB ecosystem. They are
              non-arbitrary and equally unique and rare. There will only ever be
              16,777,216 of them.
            </Text>
          </Section>
        </Flex>
        <Flex direction="column" gap="4" asChild>
          <Section pt="0">
            <Heading size="3" weight="medium">
              How are Signatures created?
            </Heading>
            <Box width="100%" height="auto" asChild>
              <Image src={image2} alt="RGB logo" />
            </Box>
            <Text as="p" weight="medium" color="gray">
              RGB values follow an 8-bit color model - a range of 0 to 255, for
              each R, G, and B channels.
            </Text>
            <Box width="100%" height="auto" asChild>
              <Image src={image3} alt="RGB logo" />
            </Box>
            <Text as="p" weight="medium" color="gray">
              Encoded into binary, values can be expressed in 2 states: 0 & 1.
            </Text>
            <Box width="100%" height="auto" asChild>
              <Image src={image4} alt="RGB logo" />
            </Box>
            <Text as="p" weight="medium" color="gray">
              Visually, they are represented by black (0) and white (1) squares.
            </Text>
            <Box width="100%" height="auto" asChild>
              <Image src={image5} alt="RGB logo" />
            </Box>
            <Text as="p" weight="medium" color="gray">
              The black and white squares are used to represent the binary
              values for each R, G, and B channel. The result is 3 sets of 8
              binary strings (24 values in total).
            </Text>
            <Box width="100%" height="auto" asChild>
              <Image src={image6} alt="RGB logo" />
            </Box>
            <Text as="p" weight="medium" color="gray">
              These visual values are arranged sequentially around a perfect
              square, with an empty space in the center.
            </Text>
            <Box width="100%" height="auto" asChild>
              <Image src={image7} alt="RGB logo" />
            </Box>
            <Text as="p" weight="medium" color="gray">
              Markers (▣) are placed at the R, G, and B starting points. One
              marker is placed in the center.
            </Text>
            <Box width="100%" height="auto" asChild>
              <Image src={image8} alt="RGB logo" />
            </Box>
            <Text as="p" weight="medium" color="gray">
              Combined altogether results in an RGB Signature.
            </Text>
            <Box width="100%" height="auto" asChild>
              <Image src={image9} alt="RGB logo" />
            </Box>
            <Text as="p" weight="medium" color="gray">
              There are 16,777,216 RGB Signatures in total. No two are alike and
              each one can only be minted once.
            </Text>
          </Section>
        </Flex>
        <Flex direction="column" gap="4" asChild>
          <Section py="0">
            <Heading size="3" weight="medium">
              What’s next for RGB?
            </Heading>
            <Text as="p" weight="medium" color="gray">
              More announcements soon. Follow{' '}
              <Link
                href="https://warpcast.com/~/channel/rgb"
                target="_blank"
                color="gray"
              >
                /rgb
              </Link>{' '}
              for updates.
            </Text>
          </Section>
        </Flex>
      </Container>
    </Box>
  )
}
