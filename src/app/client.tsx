'use client'

import { ColorPicker } from '@/components/ColorPicker'
import { DiceIcon } from '@/components/DiceIcon'
import { Signature } from '@/components/Signature'
import {
  useReadRgbSignaturesOwnerOf,
  useWriteRgbSignaturesAllowlistMint,
  useWriteRgbSignaturesMint,
  useWriteRgbSignaturesMintRandom,
} from '@/generated'
import { type Color, colorToId } from '@/lib/color'
import { randomColor } from '@/lib/random'
import { MinusIcon, PlusIcon } from '@radix-ui/react-icons'
import {
  AspectRatio,
  Box,
  Button,
  Container,
  Flex,
  IconButton,
  Text,
  TextField,
  Theme,
} from '@radix-ui/themes'
import { useIsMounted } from 'connectkit'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import useSWR from 'swr'
import { useEventListener } from 'usehooks-ts'
import { parseEther } from 'viem'
import { useAccount } from 'wagmi'
import type { AllowlistResponse } from './api/allowlist/[address]/route'
import styles from './client.module.css'

type HomeClientPageProps = {
  color: Color
}

export function HomeClientPage({ color: initialColor }: HomeClientPageProps) {
  const router = useRouter()
  const pathname = usePathname()
  const isMounted = useIsMounted()
  const { address } = useAccount()

  const [color, setColor] = useState(initialColor)
  const [randomMintAmount, setRandomMintAmount] = useState(1)
  const randomMintCost = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 3,
  })
    .formatToParts(0.001 * randomMintAmount)
    .slice(1)
    .map(({ value }) => value)
    .join('')

  const tokenId = colorToId(color)
  const { data: owner } = useReadRgbSignaturesOwnerOf({ args: [tokenId] })

  const { data: allowlist } = useSWR<AllowlistResponse>(
    address && `/api/allowlist/${address}`,
  )

  // biome-ignore lint/correctness/useExhaustiveDependencies: don't update search params on first load
  useEffect(() => {
    if (isMounted)
      window.history.replaceState(
        null,
        '',
        `${pathname}?${new URLSearchParams({ r: color.r.toString(), g: color.g.toString(), b: color.b.toString() })}`,
      )
  }, [pathname, color])

  const shuffle = useCallback(
    () =>
      setColor({
        r: randomColor(),
        g: randomColor(),
        b: randomColor(),
      }),
    [],
  )

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === ' ') shuffle()
    },
    [shuffle],
  )

  useEventListener('keyup', handleKeyUp)

  const {
    data: mintHash,
    writeContract: mint,
    isPending: mintPending,
  } = useWriteRgbSignaturesMint()
  const {
    data: mintRandomHash,
    writeContract: mintRandom,
    isPending: mintRandomPending,
  } = useWriteRgbSignaturesMintRandom()
  const {
    data: allowlistMintHash,
    writeContract: allowlistMint,
    isPending: allowlistMintPending,
  } = useWriteRgbSignaturesAllowlistMint()

  useEffect(() => {
    if (!mintHash && !mintRandomHash && !allowlistMintHash) return

    const params = new URLSearchParams()
    if (mintHash) params.set('id', tokenId.toString())
    else params.set('amount', randomMintAmount.toString())

    router.push(
      `/transactions/${mintHash || mintRandomHash || allowlistMintHash}?${params}`,
    )
  }, [
    mintHash,
    mintRandomHash,
    allowlistMintHash,
    tokenId,
    randomMintAmount,
    router,
  ])

  return (
    <Flex flexGrow="1" direction="column" justify="center" asChild>
      <Container size="1" px="2" pb={{ initial: '4', xs: '8' }}>
        <Flex direction="column" justify="center" gap="3">
          <Flex align="center" justify="center" asChild>
            <AspectRatio
              style={{
                backgroundColor: `rgb(${color.r},${color.g},${color.b})`,
              }}
            >
              <Signature color={color} />
              <Theme appearance="dark">
                <Box
                  position="absolute"
                  left={{ initial: '4', xs: '6' }}
                  bottom={{ initial: '4', xs: '6' }}
                  height="32px"
                  asChild
                >
                  <IconButton variant="ghost" onClick={shuffle}>
                    <DiceIcon size={32} />
                  </IconButton>
                </Box>
              </Theme>
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
              onChange={(e) => {
                const r =
                  Number.parseInt(e.target.value.replace(/\D/g, '')) || 0
                if (r > 255) return
                setColor({ ...color, r })
              }}
            >
              <TextField.Slot>R</TextField.Slot>
            </TextField.Root>
            <TextField.Root
              size="3"
              value={color.g}
              onChange={(e) => {
                const g =
                  Number.parseInt(e.target.value.replace(/\D/g, '')) || 0
                if (g > 255) return
                setColor({ ...color, g })
              }}
            >
              <TextField.Slot>G</TextField.Slot>
            </TextField.Root>
            <TextField.Root
              size="3"
              value={color.b}
              onChange={(e) => {
                const b =
                  Number.parseInt(e.target.value.replace(/\D/g, '')) || 0
                if (b > 255) return
                setColor({ ...color, b })
              }}
            >
              <TextField.Slot>B</TextField.Slot>
            </TextField.Root>
          </Flex>
          {owner ? (
            <Button size="4" asChild>
              <Link href={`/signatures/${tokenId}`}>Already minted</Link>
            </Button>
          ) : (
            <Button
              size="4"
              onClick={() =>
                mint({
                  args: [color.r, color.g, color.b],
                  value: parseEther('0.004'),
                })
              }
              loading={mintPending}
              disabled={mintRandomPending || allowlistMintPending}
              highContrast
            >
              Mint for .004 ETH
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
            {allowlist?.eligible && randomMintAmount === 1 ? (
              <Button
                size="4"
                onClick={() => allowlistMint({ args: [allowlist.proof] })}
                loading={allowlistMintPending}
                disabled={mintPending}
                variant="outline"
                className={styles.random}
              >
                <Text size={{ initial: '3', xs: '4' }}>
                  Mint x1 random for free
                </Text>
              </Button>
            ) : (
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
            )}
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
