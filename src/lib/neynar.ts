import { NeynarAPIClient } from '@neynar/nodejs-sdk'

if (!process.env.NEYNAR_API_KEY) {
  throw new Error('Make sure you set NEYNAR_API_KEY in your .env file')
}

export const neynarClient = new NeynarAPIClient({
  apiKey: process.env.NEYNAR_API_KEY,
})
