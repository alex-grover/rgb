'use client'

import { Signature } from '@/components/Signature'
import { idToColor } from '@/lib/color'
import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Skeleton,
  Text,
} from '@radix-ui/themes'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import useSWR from 'swr'
import type { SignaturesResponse } from '../api/signatures/route'
import { SignaturePage } from './SignaturePage'

const MAX_SUPPLY = 16777216

export default function GalleryPage() {
  const { data } = useSWR<SignaturesResponse>('/api/signatures?page=0')

  const [pageCount, setPageCount] = useState(1)
  const pages = useMemo(
    () =>
      Array(pageCount)
        .fill(null)
        .map((_, index) => (
          <SignaturePage
            // biome-ignore lint/suspicious/noArrayIndexKey: n/a
            key={index}
            index={index}
            isLastPage={index === pageCount - 1}
            loadMore={() => setPageCount((curr) => curr + 1)}
          />
        )),
    [pageCount],
  )

  return (
    <Box flexGrow="1" py="6">
      <Container size="1" px="2" pb="4">
        <Flex direction="column" gap="6">
          <Flex direction="column" gap="1">
            <Heading size="3" weight="medium">
              Registered Signatures
            </Heading>
            <Text weight="medium" color="gray">
              <Skeleton loading={!data}>
                {data ? Number(data.totalSupply).toLocaleString() : 123}
              </Skeleton>
              /{MAX_SUPPLY.toLocaleString()} minted
            </Text>
            <Text weight="medium" color="gray">
              <Skeleton loading={!data}>
                {data
                  ? new Intl.NumberFormat('en-US', {
                      style: 'percent',
                      maximumFractionDigits: 2,
                      roundingMode: 'floor',
                    }).format(
                      (MAX_SUPPLY - Number(data.totalSupply)) / MAX_SUPPLY,
                    )
                  : '99.99%'}
              </Skeleton>{' '}
              remaining
            </Text>
          </Flex>
          {data && (
            <Grid columns="12" gap={{ initial: '1', xs: '3' }}>
              {data.signatures.map(({ id }) => (
                <Link
                  key={id}
                  href={`/signatures/${id}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Signature color={idToColor(BigInt(id))} size={24} bordered />
                </Link>
              ))}
            </Grid>
          )}
          <Flex direction="column" gap="2">
            {pages}
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}
