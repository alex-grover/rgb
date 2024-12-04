'use client'

import { Signature } from '@/components/Signature'
import { idToColor } from '@/lib/color'
import {
  Container,
  Flex,
  Grid,
  Heading,
  Skeleton,
  Text,
} from '@radix-ui/themes'
import Link from 'next/link'
import useSWR from 'swr'
import { SignatureRow } from './row'

async function fetcher(...args: Parameters<typeof fetch>) {
  const response = await fetch(...args)
  if (!response.ok) throw new Error(await response.text())
  return response.json()
}

const MAX_SUPPLY = 16777216

export function GalleryClientPage() {
  const { data } = useSWR<string[], string>('/api/signatures', fetcher)

  return (
    <Flex flexGrow="1">
      <Container size="1" px="2" pb="8">
        <Flex direction="column" gap="6">
          <Flex direction="column" gap="2">
            <Heading size="3">Registered Signatures</Heading>
            <Text>
              <Skeleton loading={!data}>{data?.length ?? 123}</Skeleton>/
              {MAX_SUPPLY.toLocaleString()} minted
            </Text>
            <Text>
              <Skeleton loading={!data}>
                {data
                  ? new Intl.NumberFormat('en-US', {
                      style: 'percent',
                      maximumFractionDigits: 2,
                      roundingMode: 'floor',
                    }).format((MAX_SUPPLY - data.length) / MAX_SUPPLY)
                  : '99.99%'}
              </Skeleton>{' '}
              remaining
            </Text>
          </Flex>
          {data && (
            <>
              <Grid columns="12" gap="3">
                {data.slice(0, 144).map((id) => (
                  <Link key={id} href={`/signatures/${id}`}>
                    <Signature color={idToColor(BigInt(id))} size={30} />
                  </Link>
                ))}
              </Grid>
              <Flex direction="column" gap="2">
                {data.map((id) => (
                  <SignatureRow key={id} id={BigInt(id)} />
                ))}
              </Flex>
            </>
          )}
        </Flex>
      </Container>
    </Flex>
  )
}
