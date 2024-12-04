import { rgbSignaturesAddress } from '@/generated'
import { chain, fromBlock } from '@/lib/chain'
import { mintEvent } from '@/lib/contracts'
import { viemClient } from '@/lib/viem'
import { NextResponse } from 'next/server'

export async function GET() {
  const logs = await viemClient.getLogs({
    address: rgbSignaturesAddress[chain.id],
    event: mintEvent,
    fromBlock,
    strict: true,
  })

  return NextResponse.json(logs.map((log) => log.args.id.toString()).reverse())
}
