import { base, baseSepolia } from 'viem/chains'
import { env } from './env'

export const chain =
  env.NEXT_PUBLIC_VERCEL_ENV === 'production' ? base : baseSepolia

export const fromBlock = chain === base ? 23491824n : 18714943n
