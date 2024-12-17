import { http, createPublicClient } from 'viem'
import { base } from 'viem/chains'
import { chain } from './chain'

const rpcUrl =
  chain === base
    ? `https://base-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_ID}`
    : `https://base-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_ID}`

export const viemClient = createPublicClient({
  chain,
  transport: http(rpcUrl),
})
