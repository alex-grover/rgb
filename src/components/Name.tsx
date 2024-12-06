'use client'

import { shortenAddress } from '@/lib/address'
import { Link, Skeleton } from '@radix-ui/themes'
import NextLink from 'next/link'
import useSWRImmutable from 'swr/immutable'
import type { Address } from 'viem'

type NameProps = {
  address?: Address
  link?: boolean
}

type EnsDataResponse = {
  ens: string
}

export function Name({ address, link = true }: NameProps) {
  const { data } = useSWRImmutable<EnsDataResponse>(
    address && `https://api.ensdata.net/${address}`,
    { shouldRetryOnError: false },
  )

  return (
    <Skeleton loading={!address}>
      {address ? (
        link ? (
          <Link asChild>
            <NextLink href={`/accounts/${address}`}>
              {data?.ens ?? shortenAddress(address)}
            </NextLink>
          </Link>
        ) : (
          (data?.ens ?? shortenAddress(address))
        )
      ) : (
        '0x0000...0000'
      )}
    </Skeleton>
  )
}
