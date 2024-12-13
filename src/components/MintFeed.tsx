'use client'

import { rgbSignaturesAbi, rgbSignaturesAddress } from '@/generated'
import { shortenAddress } from '@/lib/address'
import { chain } from '@/lib/chain'
import { idToColor } from '@/lib/color'
import type { EnsDataResponse } from '@/lib/ens'
import { Toaster, toast } from 'sonner'
import { useAccount, useWatchContractEvent } from 'wagmi'

export function MintFeed() {
  const { address } = useAccount()

  useWatchContractEvent({
    address: rgbSignaturesAddress[chain.id],
    abi: rgbSignaturesAbi,
    eventName: 'Mint',
    strict: true,
    onLogs: (logs) => {
      async function handle() {
        const log = logs[0]
        if (log.args.minter === address) return

        const response = await fetch(
          `https://api.ensdata.net/${log.args.minter}`,
        )

        let name = shortenAddress(log.args.minter)
        if (response.ok) {
          const { ens } = (await response.json()) as EnsDataResponse
          name = ens
        }

        if (logs.length === 1) {
          const color = idToColor(log.args.id)
          toast(`${name} minted rgb(${color.r},${color.g},${color.b})`)
          return
        }

        toast(`${name} minted x${logs.length} random`)
      }

      void handle()
    },
  })

  return (
    <Toaster
      position="top-center"
      toastOptions={{ style: { borderRadius: 0 } }}
    />
  )
}
