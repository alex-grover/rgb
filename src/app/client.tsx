'use client'

import { ColorPicker } from '@/components/ColorPicker'
import { Signature } from '@/components/Signature'
import { useWriteRgbSignaturesMint } from '@/generated'
import type { Color } from '@/lib/color'
import { randomColor } from '@/lib/random'
import { useKeyPress } from '@/lib/useKeyPress'
import {
  AspectRatio,
  Box,
  Button,
  Container,
  Flex,
  TextField,
} from '@radix-ui/themes'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { parseEther } from 'viem'
import { useWaitForTransactionReceipt } from 'wagmi'

type HomeClientPageProps = {
  color: Color
}

export function HomeClientPage({ color: initialColor }: HomeClientPageProps) {
  const pathname = usePathname()

  const [color, setColor] = useState(initialColor)

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

  const { writeContract, isPending, data: hash } = useWriteRgbSignaturesMint()

  const { isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash,
  })

  return (
    <Container size="1" px="2" pb="8">
      <Flex direction="column" justify="center" gap="3">
        <Flex align="center" justify="center" asChild>
          <AspectRatio
            style={{ backgroundColor: `rgb(${color.r},${color.g},${color.b})` }}
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
        <Button
          size="4"
          onClick={() =>
            writeContract({
              args: [color.r, color.g, color.b],
              value: parseEther('0.002'),
            })
          }
          loading={isPending || isConfirming}
          highContrast
        >
          Mint for .002 ETH
        </Button>
      </Flex>
    </Container>
  )
}
