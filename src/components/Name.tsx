'use client'

import { shortenAddress } from '@/lib/address'
import { chain } from '@/lib/chain'
import { Link, Skeleton } from '@radix-ui/themes'
import useSWRImmutable from 'swr/immutable'
import type { Address } from 'viem'

type NameProps = {
  address?: Address
}

type EnsDataResponse = {
  ens: string
}

export function Name({ address }: NameProps) {
  const { data } = useSWRImmutable<EnsDataResponse>(
    address && `https://api.ensdata.net/${address}`,
    { shouldRetryOnError: false },
  )

  return (
    <Skeleton loading={!address}>
      {address ? (
        <Link asChild>
          <a
            href={`${chain.blockExplorers.default.url}/address/${address}`}
            target="_blank"
            rel="noreferrer"
          >
            {data?.ens ?? shortenAddress(address)}
          </a>
        </Link>
      ) : (
        '0x0000...0000'
      )}
    </Skeleton>
  )
}
