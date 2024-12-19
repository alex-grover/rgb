import { rgbSignaturesAbi, rgbSignaturesAddress } from '@/generated'
import { chain } from '@/lib/chain'
import type { RouteContext } from '@/lib/next'
import { viemClient } from '@/lib/viem'
import proofs from '@/proofs.json'
import { NextResponse } from 'next/server'
import * as v from 'valibot'
import { type Address, type Hex, isAddress } from 'viem'

export const revalidate = 10

const schema = v.object({
  address: v.custom<Address>(
    (input) => typeof input === 'string' && isAddress(input),
  ),
})

export type AllowlistResponse =
  | {
      eligible: true
      proof: Hex[]
    }
  | { eligible: false }

export async function GET(_: Request, { params }: RouteContext) {
  const parseResult = v.safeParse(schema, await params)
  if (!parseResult.success)
    return NextResponse.json(parseResult.issues, { status: 400 })

  const proof =
    (proofs as Partial<Record<Address, Hex[]>>)[parseResult.output.address] ||
    (proofs as Partial<Record<Address, Hex[]>>)[
      parseResult.output.address.toLowerCase() as Hex
    ]
  const onAllowlist = !!proof

  const claimed =
    onAllowlist &&
    (await viemClient.readContract({
      address: rgbSignaturesAddress[chain.id],
      abi: rgbSignaturesAbi,
      functionName: 'allowlistClaimed',
      args: [parseResult.output.address],
    }))

  const eligible = onAllowlist && !claimed
  if (!eligible) return NextResponse.json<AllowlistResponse>({ eligible })

  return NextResponse.json<AllowlistResponse>({
    eligible,
    proof,
  })
}
