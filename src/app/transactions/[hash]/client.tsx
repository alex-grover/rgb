'use client'

import { Signature } from '@/components/Signature'
import { rgbSignaturesAbi } from '@/generated'
import { idToColor } from '@/lib/color'
import { Box, Button, Flex, Spinner, Text } from '@radix-ui/themes'
import Link from 'next/link'
import type { PropsWithChildren } from 'react'
import { type Hash, parseEventLogs } from 'viem'
import { useAccount, useWaitForTransactionReceipt } from 'wagmi'

type TransactionClientPageProps = {
  hash: Hash
} & (
  | {
      id: bigint
    }
  | {
      amount: number
    }
)

export function TransactionClientPage({
  hash,
  ...props
}: TransactionClientPageProps) {
  const { address } = useAccount()
  const {
    data: transactionReceipt,
    isLoading: isConfirming,
    isSuccess: isConfirmed,
  } = useWaitForTransactionReceipt({ hash })

  const isRandom = 'amount' in props

  if (isConfirming)
    return (
      <Wrapper>
        <Spinner size="3" />
        <Flex direction="column" align="center" gap="1">
          <Text weight="medium" color="gray">
            Minting{' '}
            {isRandom
              ? `${props.amount} random Signature${props.amount > 1 ? 's' : ''}`
              : `rgb(${idToColor(props.id).r},${idToColor(props.id).g},${idToColor(props.id).b})`}
            ...
          </Text>
          <Text weight="medium" color="gray">
            Please don't close this window
          </Text>
        </Flex>
      </Wrapper>
    )

  if (isConfirmed) {
    if (isRandom) {
      const logs = parseEventLogs({
        abi: rgbSignaturesAbi,
        eventName: 'Mint',
        logs: transactionReceipt.logs,
      })

      return (
        <Wrapper>
          <Flex gap="3">
            {logs.map((log) => (
              <Link key={log.args.id} href={`/signatures/${log.args.id}`}>
                <Signature color={idToColor(log.args.id)} size={30} bordered />
              </Link>
            ))}
          </Flex>
          <Flex direction="column" align="center" gap="1">
            <Text weight="medium">
              Successfully minted {props.amount} Signatures
            </Text>
            <Text weight="medium" color="gray">
              Welcome to RGB
            </Text>
          </Flex>
          <Box width="100%" maxWidth="300px" asChild>
            <Button variant="outline" size="3" asChild>
              <Link href={`/accounts/${address}`}>View your Signatures</Link>
            </Button>
          </Box>
        </Wrapper>
      )
    }

    const color = idToColor(props.id)

    return (
      <Wrapper>
        <Link href={`/signatures/${props.id}`}>
          <Signature color={idToColor(props.id)} size={60} bordered />
        </Link>
        <Flex direction="column" align="center" gap="1">
          <Text weight="medium">
            Successfully minted rgb({color.r},{color.g},{color.b})
          </Text>
          <Text weight="medium" color="gray">
            Welcome to RGB
          </Text>
        </Flex>
        <Box width="100%" maxWidth="300px" asChild>
          <Button variant="outline" size="3" asChild>
            <Link href={`/signatures/${props.id}`}>View Signature</Link>
          </Button>
        </Box>
      </Wrapper>
    )
  }

  return null
}

function Wrapper({ children }: PropsWithChildren) {
  return (
    <Flex
      flexGrow="1"
      direction="column"
      align="center"
      justify="center"
      gap="5"
      pb="8"
    >
      {children}
    </Flex>
  )
}
