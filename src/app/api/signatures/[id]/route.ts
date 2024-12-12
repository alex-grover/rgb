import { rgbSignaturesAbi, rgbSignaturesAddress } from '@/generated'
import { chain } from '@/lib/chain'
import type { RouteContext } from '@/lib/next'
import { viemClient } from '@/lib/viem'
import { NextResponse } from 'next/server'
import * as v from 'valibot'
import type { Address } from 'viem'

export const revalidate = 10

const schema = v.object({
  id: v.pipe(
    v.string(),
    v.digits(),
    v.transform((input) => BigInt(input)),
    v.minValue(0n),
  ),
})

export type SignatureResponse = {
  owner: Address
}

export async function GET(_: Request, { params }: RouteContext) {
  const parseResult = v.safeParse(schema, await params)
  if (!parseResult.success)
    return NextResponse.json(parseResult.issues, { status: 400 })

  try {
    const owner = await viemClient.readContract({
      address: rgbSignaturesAddress[chain.id],
      abi: rgbSignaturesAbi,
      functionName: 'ownerOf',
      args: [parseResult.output.id],
    })

    return NextResponse.json<SignatureResponse>({ owner })
  } catch {
    return new Response(null, { status: 404 })
  }
}
