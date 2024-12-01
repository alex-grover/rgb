import * as v from 'valibot'

const schema = v.object({
  NEXT_PUBLIC_ALCHEMY_ID: v.pipe(v.string(), v.nonEmpty()),
  NEXT_PUBLIC_VERCEL_ENV: v.picklist(['production', 'preview', 'development']),
  NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: v.pipe(v.string(), v.nonEmpty()),
})

const parseResult = v.safeParse(schema, {
  NEXT_PUBLIC_ALCHEMY_ID: process.env.NEXT_PUBLIC_ALCHEMY_ID,
  NEXT_PUBLIC_VERCEL_ENV: process.env.NEXT_PUBLIC_VERCEL_ENV,
  NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID:
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
})

if (!parseResult.success) {
  console.error(v.flatten(parseResult.issues))
  throw new Error('.env validation failed')
}

export const env = parseResult.output
