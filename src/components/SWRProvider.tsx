'use client'

import type { PropsWithChildren } from 'react'
import { SWRConfig } from 'swr'

async function fetcher(...args: Parameters<typeof fetch>) {
  const response = await fetch(...args)
  if (response.status === 404) return null
  if (!response.ok) throw new Error(await response.json())
  return response.json()
}

export function SWRProvider({ children }: PropsWithChildren) {
  return <SWRConfig value={{ fetcher }}>{children}</SWRConfig>
}
