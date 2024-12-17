import { rgbSignaturesAbi } from '@/generated'
import { shortenAddress } from '@/lib/address'
import { idToColor } from '@/lib/color'
import { neynarClient } from '@/lib/neynar'
import type { NextRequest } from 'next/server'
import { type Address, parseEventLogs } from 'viem'

if (!process.env.NEYNAR_SIGNER_UUID) {
  throw new Error('Make sure you set NEYNAR_SIGNER_UUID in your .env file')
}

export async function POST(request: NextRequest) {
  // https://docs.openzeppelin.com/defender/module/monitor#notifications
  const body = await request.json()

  const logs = parseEventLogs({
    abi: rgbSignaturesAbi,
    eventName: 'Mint',
    logs: body.events[0].transaction.logs,
    strict: true,
  })

  const [farcasterUsernames, ensNames] = await Promise.all([
    Promise.all(
      logs.map((log) =>
        fetch(`https://api.ensdata.net/farcaster/${log.args.minter}`)
          .then((res) => res.json())
          .then((json) => json.username),
      ),
    ),
    Promise.all(
      logs.map((log) =>
        fetch(`https://api.ensdata.net/${log.args.minter}`)
          .then((res) => res.json())
          .then((json) => json.ens),
      ),
    ),
  ])

  for (let i = 0; i < logs.length; i++) {
    const log = logs[i]

    const username = getUsername(
      farcasterUsernames[i],
      ensNames[i],
      log.args.minter,
    )
    const color = idToColor(log.args.id)

    await neynarClient.publishCast({
      // biome-ignore lint/style/noNonNullAssertion: it's in the env
      signerUuid: process.env.NEYNAR_SIGNER_UUID!,
      text: `${username} minted rgb(${color.r},${color.g},${color.b})`,
    })
  }

  return new Response('OK', { status: 201 })
}

function getUsername(
  farcasterUsername: string | undefined,
  ensName: string | undefined,
  address: Address,
) {
  if (farcasterUsername) return `@${farcasterUsername}`
  if (ensName) return ensName
  return shortenAddress(address)
}
