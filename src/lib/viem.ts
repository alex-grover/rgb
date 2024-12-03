import { http, createPublicClient } from 'viem'
import { chain, rpcUrl } from './chain'

export const viemClient = createPublicClient({
  chain,
  transport: http(rpcUrl),
})
