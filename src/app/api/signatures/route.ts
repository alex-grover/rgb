import { rgbSignaturesAbi, rgbSignaturesAddress } from '@/generated'
import { chain } from '@/lib/chain'
import { viemClient } from '@/lib/viem'
import { type NextRequest, NextResponse } from 'next/server'
import * as v from 'valibot'
import type { Address } from 'viem'

export const revalidate = 10

const PAGE_SIZE = 144

const schema = v.object({
  page: v.pipe(
    v.string(),
    v.digits(),
    v.transform((input) => Number(input)),
    v.minValue(0),
  ),
})

export type SignaturesResponse = {
  totalSupply: string
  signatures: {
    id: string
    owner: Address
  }[]
  hasMore: boolean
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const parseResult = v.safeParse(
    schema,
    Object.fromEntries(searchParams.entries()),
  )
  if (!parseResult.success) return new Response('Invalid page', { status: 400 })
  const { page } = parseResult.output

  const totalSupply = await viemClient.readContract({
    address: rgbSignaturesAddress[chain.id],
    abi: rgbSignaturesAbi,
    functionName: 'totalSupply',
  })

  const pageStart = Number(totalSupply) - PAGE_SIZE * page - 1
  const pageEnd = Math.max(pageStart - PAGE_SIZE, -1)
  const ids = await viemClient.multicall({
    contracts: Array(pageStart - pageEnd)
      .fill(0n)
      .map(
        (_, index) =>
          ({
            address: rgbSignaturesAddress[chain.id],
            abi: rgbSignaturesAbi,
            functionName: 'tokenByIndex',
            args: [totalSupply - BigInt(PAGE_SIZE * page) - BigInt(index) - 1n],
          }) as const,
      ),
    allowFailure: false,
  })

  const owners = await viemClient.multicall({
    contracts: ids.map(
      (id) =>
        ({
          address: rgbSignaturesAddress[chain.id],
          abi: rgbSignaturesAbi,
          functionName: 'ownerOf',
          args: [id],
        }) as const,
    ),
    allowFailure: false,
  })

  return NextResponse.json<SignaturesResponse>({
    totalSupply: totalSupply.toString(),
    signatures: ids.map((id, index) => ({
      id: id.toString(),
      owner: owners[index],
    })),
    hasMore: pageEnd > -1,
  })
}
