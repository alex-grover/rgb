import type { RouteProps } from '@/lib/next'
import { notFound } from 'next/navigation'
import * as v from 'valibot'
import { type Address, isAddress } from 'viem'
import { ProfileClientPage } from './client'

const schema = v.object({
  address: v.custom<Address>(
    (input) => typeof input === 'string' && isAddress(input),
  ),
})

export default async function ProfilePage({ params }: RouteProps) {
  const parseResult = v.safeParse(schema, await params)
  if (!parseResult.success) notFound()

  return <ProfileClientPage address={parseResult.output.address} />
}
