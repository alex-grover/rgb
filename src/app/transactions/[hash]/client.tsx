'use client'

import { Signature } from '@/components/Signature'
import { rgbSignaturesAbi } from '@/generated'
import { idToColor } from '@/lib/color'
import { getUrl } from '@/lib/next'
import { Box, Button, Flex, Grid, Spinner, Text } from '@radix-ui/themes'
import Link from 'next/link'
import { type PropsWithChildren, useCallback } from 'react'
import { toast } from 'sonner'
import { useCopyToClipboard } from 'usehooks-ts'
import { type Hash, parseEventLogs } from 'viem'
import { useAccount, useWaitForTransactionReceipt } from 'wagmi'
import styles from './client.module.css'

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

  const [, copy] = useCopyToClipboard()
  const handleCopyClicked = useCallback(
    (text: string) => () => {
      async function handle() {
        const success = await copy(text)
        if (success) toast('Copied to clipboard!')
        else toast('Failed to copy to clipboard')
      }

      void handle()
    },
    [copy],
  )

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
    const ids = parseEventLogs({
      abi: rgbSignaturesAbi,
      eventName: 'Mint',
      logs: transactionReceipt.logs,
    }).map((log) => log.args.id)

    if (isRandom && ids.length > 1) {
      return (
        <Wrapper>
          <Flex gap="3">
            {ids.map((id) => (
              <Link key={id} href={`/signatures/${id}`}>
                <Signature color={idToColor(id)} size={30} bordered />
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
            <Button size="3" asChild>
              <Link href={`/accounts/${address}`} className={styles.primary}>
                View your Signatures
              </Link>
            </Button>
          </Box>
          <Box width="100%" maxWidth="300px" asChild>
            <Button variant="outline" size="3" asChild>
              <Link href="/">Mint more</Link>
            </Button>
          </Box>
        </Wrapper>
      )
    }

    const id = ids[0]
    const color = idToColor(id)
    const url = `${getUrl()}/signatures/${id}`

    return (
      <Wrapper>
        <Link href={`/signatures/${id}`}>
          <Signature color={idToColor(id)} size={60} bordered />
        </Link>
        <Flex direction="column" align="center" gap="1">
          <Text weight="medium">
            Successfully minted rgb({color.r},{color.g},{color.b})
          </Text>
          <Text weight="medium" color="gray">
            Welcome to RGB
          </Text>
        </Flex>
        <Grid width="100%" maxWidth="300px" columns="2" rows="2" gap="3">
          <Box gridColumn="1 / span 2" asChild>
            <Button size="3" asChild>
              <Link href={`/signatures/${id}`} className={styles.primary}>
                View Signature
              </Link>
            </Button>
          </Box>
          <Box gridColumn="1 / span 2" asChild>
            <Button variant="outline" size="3" asChild>
              <Link href="/">Mint another</Link>
            </Button>
          </Box>
          <Button variant="outline" size="3" asChild>
            <Link
              href={`https://x.com/intent/tweet?${new URLSearchParams({ url })}`}
              target="_blank"
            >
              Share on X
            </Link>
          </Button>
          <Button variant="outline" size="3" asChild>
            <Link
              href={`https://warpcast.com/~/compose?${new URLSearchParams({ 'embeds[]': url })}`}
              target="_blank"
            >
              Share on FC
            </Link>
          </Button>
          <Box gridColumn="1 / span 2" asChild>
            <Button variant="outline" size="3" onClick={handleCopyClicked(url)}>
              Copy link
            </Button>
          </Box>
        </Grid>
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
