import type { PageProps } from '@/lib/next'
import { notFound } from 'next/navigation'
import * as v from 'valibot'
import { type Hash, isHash } from 'viem'
import { TransactionClientPage } from './client'

const paramsSchema = v.object({
  hash: v.custom<Hash>((input) => typeof input === 'string' && isHash(input)),
})

const searchParamsSchema = v.union([
  v.object({
    id: v.pipe(
      v.string(),
      v.minLength(1),
      v.digits(),
      v.transform((input) => BigInt(input)),
    ),
  }),
  v.object({
    amount: v.pipe(
      v.string(),
      v.minLength(1),
      v.digits(),
      v.transform((input) => Number(input)),
    ),
  }),
])

export default async function TransactionPage({
  params,
  searchParams,
}: PageProps) {
  const paramsParseResult = v.safeParse(paramsSchema, await params)
  const searchParamsParseResult = v.safeParse(
    searchParamsSchema,
    await searchParams,
  )
  if (!paramsParseResult.success || !searchParamsParseResult.success) notFound()

  return (
    <TransactionClientPage
      hash={paramsParseResult.output.hash}
      {...searchParamsParseResult.output}
    />
  )
}
