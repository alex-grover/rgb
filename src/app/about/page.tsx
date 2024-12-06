import { Box, Container, Flex, Heading, Section, Text } from '@radix-ui/themes'

export default function AboutPage() {
  return (
    <Box flexGrow="1">
      <Container size="1" px="2" pb="8">
        <Flex direction="column" gap="5" asChild>
          <Section pt="0">
            <Heading size="3">Introduction to RGB</Heading>
            <Text as="p">The Signature Formula</Text>
            {/* TODO: image */}
            <Heading size="3">What is RGB?</Heading>
            <Text as="p">
              RGB is an onchain framework based on the rgb color model.
            </Text>
            <Text as="p">
              It uses the constraint of three channels— R, G, and B. Each
              channel ranges from 0 to 255 (in 8-bit color), allowing for
              16,777,216 possible combinations.
            </Text>
            <Text as="p">
              For example, rgb(255,153,0) represents{' '}
              <Text color="orange">Orange.</Text>
            </Text>
            <Text as="p">However, color is just one expression of rgb.</Text>
            <Text as="p">
              What if rgb values could be represented by emojis instead?
            </Text>
            <Text as="p">
              Then for example, rgb(255,153,0) could represent 🤠🥳🙂.
            </Text>
            <Text as="p">
              This is the fundamental constraint that RGB is centered around:
              the combination of 3 inputs to create 16,777,216 outputs.
            </Text>
          </Section>
        </Flex>
        <Flex direction="column" gap="5" asChild>
          <Section pt="0">
            <Heading size="3">What are the Signatures for?</Heading>
            <Text as="p">
              Signatures are the visual representations of rgb values that are
              contained in the metadata.
            </Text>
            <Text as="p">
              The RGB Signature is the entry into the RGB ecosystem. They are
              non-arbitrary and equally unique and rare. There will only ever be
              16,777,216 of them.
            </Text>
          </Section>
        </Flex>
        <Flex direction="column" gap="5" asChild>
          <Section pt="0">
            <Heading size="3">How are Signatures created?</Heading>
            {/* TODO: image */}
            <Text as="p">
              RGB values follow an 8-bit color model - a range of 0 to 255, for
              each R, G, and B channels.
            </Text>
            {/* TODO: image */}
            <Text as="p">
              Encoded into binary, values can be expressed in 2 states: 0 & 1.
            </Text>
            {/* TODO: image */}
            <Text as="p">
              Visually, they are represented by black (0) and white (1) squares.
            </Text>
            {/* TODO: image */}
            <Text as="p">
              The black and white squares are used to represent the binary
              values for each R, G, and B channel. The result is 3 sets of 8
              binary strings (24 values in total).
            </Text>
            {/* TODO: image */}
            <Text as="p">
              These visual values are arranged sequentially around a perfect
              square, with an empty space in the center.
            </Text>
            {/* TODO: image */}
            {/* TODO: icon */}
            <Text as="p">
              Markers (▣) are placed at the R, G, and B starting points. One
              marker is placed in the center.
            </Text>
            {/* TODO: image */}
            <Text as="p">Combined altogether results in an RGB Signature.</Text>
            {/* TODO: image */}
            <Text as="p">
              There are 16,777,216 RGB Signatures in total. No two are alike and
              each one can only be minted once.
            </Text>
          </Section>
        </Flex>
        <Flex direction="column" gap="5" asChild>
          <Section pt="0">
            <Heading size="3">What’s next for RGB?</Heading>
            {/* TODO: link */}
            <Text as="p">
              More announcements soon. Follow @rgb for updates.
            </Text>
          </Section>
        </Flex>
      </Container>
    </Box>
  )
}
