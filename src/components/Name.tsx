'use client'

import { shortenAddress } from '@/lib/address'
import { chain } from '@/lib/chain'
import { Link, Skeleton } from '@radix-ui/themes'
import type { Address } from 'viem'
import { mainnet } from 'viem/chains'
import { useEnsName } from 'wagmi'

type NameProps = {
  address?: Address
}

export function Name({ address }: NameProps) {
  const { data: ensName } = useEnsName({
    chainId: mainnet.id,
    address,
    query: {
      enabled: !!address,
    },
  })

  return (
    <Skeleton loading={!address}>
      {address ? (
        <Link asChild>
          <a
            href={`${chain.blockExplorers.default.url}/address/${address}`}
            target="_blank"
            rel="noreferrer"
          >
            {ensName ?? shortenAddress(address)}
          </a>
        </Link>
      ) : (
        '0x0000...0000'
      )}
    </Skeleton>
  )
}
