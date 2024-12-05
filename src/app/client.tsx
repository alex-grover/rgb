'use client'

import { ColorPicker } from '@/components/ColorPicker'
import { Signature } from '@/components/Signature'
import {
  useReadRgbSignaturesOwnerOf,
  useWriteRgbSignaturesMint,
  useWriteRgbSignaturesMintRandom,
} from '@/generated'
import type { Color } from '@/lib/color'
import { randomColor } from '@/lib/random'
import { useKeyPress } from '@/lib/useKeyPress'
import { ExternalLinkIcon, MinusIcon, PlusIcon } from '@radix-ui/react-icons'
import {
  AspectRatio,
  Box,
  Button,
  Container,
  Flex,
  IconButton,
  Text,
  TextField,
} from '@radix-ui/themes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { parseEther } from 'viem'
import styles from './client.module.css'

type HomeClientPageProps = {
  color: Color
}

export function HomeClientPage({ color: initialColor }: HomeClientPageProps) {
  const pathname = usePathname()

  const [color, setColor] = useState(initialColor)
  const [randomMintAmount, setRandomMintAmount] = useState(1)
  const randomMintCost = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 3,
  })
    .formatToParts(0.001 * randomMintAmount)
    .slice(1)
    .map(({ value }) => value)
    .join('')

  const tokenId = useMemo(
    () => BigInt((color.r << 16) | (color.g << 8) | color.b),
    [color],
  )
  const { data: owner } = useReadRgbSignaturesOwnerOf({ args: [tokenId] })

  useEffect(() => {
    window.history.replaceState(
      null,
      '',
      `${pathname}?${new URLSearchParams({ r: color.r.toString(), g: color.g.toString(), b: color.b.toString() })}`,
    )
  }, [pathname, color])

  useKeyPress(' ', () => {
    setColor({
      r: randomColor(),
      g: randomColor(),
      b: randomColor(),
    })
  })

  const { writeContract: mint, isPending: mintPending } =
    useWriteRgbSignaturesMint()
  const { writeContract: mintRandom, isPending: mintRandomPending } =
    useWriteRgbSignaturesMintRandom()

  return (
    <Flex flexGrow="1" direction="column" justify="center" asChild>
      <Container size="1" px="2" pb="8">
        <Flex direction="column" justify="center" gap="3">
          <Flex align="center" justify="center" asChild>
            <AspectRatio
              style={{
                backgroundColor: `rgb(${color.r},${color.g},${color.b})`,
              }}
            >
              <Signature color={color} />
              <Box
                position="absolute"
                right={{ initial: '4', xs: '6' }}
                bottom={{ initial: '4', xs: '6' }}
              >
                <ColorPicker color={color} setColor={setColor} />
              </Box>
            </AspectRatio>
          </Flex>
          <Flex gap="3">
            <TextField.Root
              size="3"
              value={color.r}
              onChange={(e) =>
                setColor({ ...color, r: Number.parseInt(e.target.value) || 0 })
              }
            >
              <TextField.Slot>R</TextField.Slot>
            </TextField.Root>
            <TextField.Root
              size="3"
              value={color.g}
              onChange={(e) =>
                setColor({ ...color, g: Number.parseInt(e.target.value) || 0 })
              }
            >
              <TextField.Slot>G</TextField.Slot>
            </TextField.Root>
            <TextField.Root
              size="3"
              value={color.b}
              onChange={(e) =>
                setColor({ ...color, b: Number.parseInt(e.target.value) || 0 })
              }
            >
              <TextField.Slot>B</TextField.Slot>
            </TextField.Root>
          </Flex>
          {owner ? (
            <Button size="4" asChild>
              <Link href={`/signatures/${tokenId}`}>
                Minted <ExternalLinkIcon />
              </Link>
            </Button>
          ) : (
            <Button
              size="4"
              onClick={() =>
                mint({
                  args: [color.r, color.g, color.b],
                  value: parseEther('0.002'),
                })
              }
              loading={mintPending}
              disabled={mintRandomPending}
              highContrast
            >
              Mint for .002 ETH
            </Button>
          )}
          <Flex gap="3">
            <IconButton
              size="4"
              variant="outline"
              onClick={() => setRandomMintAmount((amount) => amount - 1)}
              disabled={randomMintAmount === 1}
            >
              <MinusIcon />
            </IconButton>
            <Button
              size="4"
              onClick={() =>
                mintRandom({
                  args: [randomMintAmount],
                  value: parseEther(randomMintCost),
                })
              }
              loading={mintRandomPending}
              disabled={mintPending}
              variant="outline"
              className={styles.random}
            >
              <Text size={{ initial: '3', xs: '4' }}>
                Mint x{randomMintAmount} random for {randomMintCost} ETH
              </Text>
            </Button>
            <IconButton
              size="4"
              variant="outline"
              onClick={() => setRandomMintAmount((amount) => amount + 1)}
              disabled={randomMintAmount === 10}
            >
              <PlusIcon />
            </IconButton>
          </Flex>
        </Flex>
      </Container>
    </Flex>
  )
}
