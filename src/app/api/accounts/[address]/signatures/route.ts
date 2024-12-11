import { rgbSignaturesAbi, rgbSignaturesAddress } from '@/generated'
import { chain } from '@/lib/chain'
import type { RouteContext } from '@/lib/next'
import { viemClient } from '@/lib/viem'
import { NextResponse } from 'next/server'
import * as v from 'valibot'
import { type Address, isAddress } from 'viem'

export const revalidate = 10

const schema = v.object({
  address: v.custom<Address>(
    (input) => typeof input === 'string' && isAddress(input),
  ),
})

export type AccountSignaturesResponse = {
  count: number
  signatures: string[]
}

export async function GET(_: Request, { params }: RouteContext) {
  const parseResult = v.safeParse(schema, await params)
  if (!parseResult.success)
    return NextResponse.json(parseResult.issues, { status: 400 })

  const balance = await viemClient.readContract({
    address: rgbSignaturesAddress[chain.id],
    abi: rgbSignaturesAbi,
    functionName: 'balanceOf',
    args: [parseResult.output.address],
  })

  const ids = await viemClient.multicall({
    contracts: Array(Number(balance))
      .fill(null)
      .map((_, index) => ({
        address: rgbSignaturesAddress[chain.id],
        abi: rgbSignaturesAbi,
        functionName: 'tokenOfOwnerByIndex' as const,
        args: [parseResult.output.address, index],
      })),
    allowFailure: false,
  })

  return NextResponse.json<AccountSignaturesResponse>({
    count: Number(balance),
    signatures: ids.reverse().map((id) => id.toString()),
  })
}
