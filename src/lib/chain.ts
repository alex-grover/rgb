import { baseSepolia } from 'viem/chains'
// import { base, baseSepolia } from 'viem/chains'
import { env } from './env'

export const chain = baseSepolia
// env.NEXT_PUBLIC_VERCEL_ENV === 'production' ? base : baseSepolia

export const rpcUrl = `https://base-sepolia.g.alchemy.com/v2/${env.NEXT_PUBLIC_ALCHEMY_ID}`
// chain === base
//   ? `https://base-mainnet.g.alchemy.com/v2/${env.NEXT_PUBLIC_ALCHEMY_ID}`
//   : `https://base-sepolia.g.alchemy.com/v2/${env.NEXT_PUBLIC_ALCHEMY_ID}`

export const fromBlock = 18714943n
