'use client'

import { shortenAddress } from '@/lib/address'
import type { EnsDataResponse } from '@/lib/ens'
import { Link, type LinkProps, Skeleton, Text } from '@radix-ui/themes'
import NextLink from 'next/link'
import useSWRImmutable from 'swr/immutable'
import type { Address } from 'viem'

type NameProps = LinkProps & {
  address?: Address
  link?: boolean
}

export function Name({ address, link = true, ...props }: NameProps) {
  const { data } = useSWRImmutable<EnsDataResponse>(
    address && `https://api.ensdata.net/${address}`,
    { shouldRetryOnError: false },
  )

  return (
    <Skeleton loading={!address}>
      {address ? (
        link ? (
          <Link {...props} asChild>
            <NextLink href={`/accounts/${address}`}>
              {data?.ens ?? shortenAddress(address)}
            </NextLink>
          </Link>
        ) : (
          <Text {...props}>{data?.ens ?? shortenAddress(address)}</Text>
        )
      ) : (
        '0x0000...0000'
      )}
    </Skeleton>
  )
}
