'use client'

import { Signature } from '@/components/Signature'
import { useWriteRgbSignaturesMint } from '@/generated'
import {
  AspectRatio,
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
  r: number
  g: number
  b: number
}

export function HomeClientPage({
  r: initialR,
  g: initialG,
  b: initialB,
}: HomeClientPageProps) {
  const pathname = usePathname()

  const [r, setR] = useState(initialR)
  const [g, setG] = useState(initialG)
  const [b, setB] = useState(initialB)

  useEffect(() => {
    window.history.replaceState(
      null,
      '',
      `${pathname}?${new URLSearchParams({ r: r.toString(), g: g.toString(), b: b.toString() })}`,
    )
  }, [pathname, r, g, b])

  const { writeContract, isPending, data: hash } = useWriteRgbSignaturesMint()

  const { isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash,
  })

  return (
    <Container size="1" px="2" pb="8">
      <Flex direction="column" justify="center" gap="3">
        <Flex align="center" justify="center" asChild>
          <AspectRatio style={{ backgroundColor: `rgb(${r},${g},${b})` }}>
            <Signature r={r} g={g} b={b} />
          </AspectRatio>
        </Flex>
        <Flex gap="3">
          <TextField.Root
            size="3"
            value={r}
            onChange={(e) => setR(Number.parseInt(e.target.value) || 0)}
          >
            <TextField.Slot>R</TextField.Slot>
          </TextField.Root>
          <TextField.Root
            size="3"
            value={g}
            onChange={(e) => setG(Number.parseInt(e.target.value) || 0)}
          >
            <TextField.Slot>G</TextField.Slot>
          </TextField.Root>
          <TextField.Root
            size="3"
            value={b}
            onChange={(e) => setB(Number.parseInt(e.target.value) || 0)}
          >
            <TextField.Slot>B</TextField.Slot>
          </TextField.Root>
        </Flex>
        <Button
          size="4"
          onClick={() =>
            writeContract({ args: [r, g, b], value: parseEther('0.002') })
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
