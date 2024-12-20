'use client'

import { ColorPicker } from '@/components/ColorPicker'
import { DiceIcon } from '@/components/DiceIcon'
import { Signature } from '@/components/Signature'
import {
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
import { useIsMounted, useModal } from 'connectkit'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import useSWR from 'swr'
import { useEventListener } from 'usehooks-ts'
import { parseEther } from 'viem'
import { useAccount } from 'wagmi'
import type { AllowlistResponse } from './api/allowlist/[address]/route'
import type { SignatureResponse } from './api/signatures/[id]/route'
import styles from './client.module.css'

type HomeClientPageProps = {
  color: Color
}

export function HomeClientPage({ color: initialColor }: HomeClientPageProps) {
  const router = useRouter()
  const pathname = usePathname()
  const isMounted = useIsMounted()
  const { address } = useAccount()
  const { setOpen } = useModal()

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
  const { data: signature } = useSWR<SignatureResponse>(
    `/api/signatures/${tokenId}`,
  )

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
    if (!(mintPending || mintRandomPending || allowlistMintPending)) return
    toast('Please confirm in your wallet')
  }, [mintPending, mintRandomPending, allowlistMintPending])

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
              onKeyUp={(e) => {
                if (e.code === 'ArrowUp' && color.r !== 255) {
                  setColor({ ...color, r: color.r + 1 })
                } else if (e.code === 'ArrowDown' && color.r !== 0) {
                  setColor({ ...color, r: color.r - 1 })
                }
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
              onKeyUp={(e) => {
                if (e.code === 'ArrowUp' && color.g !== 255) {
                  setColor({ ...color, g: color.g + 1 })
                } else if (e.code === 'ArrowDown' && color.g !== 0) {
                  setColor({ ...color, g: color.g - 1 })
                }
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
              onKeyUp={(e) => {
                if (e.code === 'ArrowUp' && color.b !== 255) {
                  setColor({ ...color, b: color.b + 1 })
                } else if (e.code === 'ArrowDown' && color.b !== 0) {
                  setColor({ ...color, b: color.b - 1 })
                }
              }}
            >
              <TextField.Slot>B</TextField.Slot>
            </TextField.Root>
          </Flex>
          {signature?.owner ? (
            <Button size="4" asChild>
              <Link href={`/signatures/${tokenId}`}>Already minted</Link>
            </Button>
          ) : (
            <Button
              size="4"
              onClick={() =>
                address
                  ? mint({
                      args: [color.r, color.g, color.b],
                      value: parseEther('0.004'),
                    })
                  : setOpen(true)
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
                  address
                    ? mintRandom({
                        args: [randomMintAmount],
                        value: parseEther(randomMintCost),
                      })
                    : setOpen(true)
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
