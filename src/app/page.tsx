import type { PageProps } from '@/lib/next'
import { randomColor } from '@/lib/random'
import { HomeClientPage } from './client'

export default async function HomePage({ searchParams }: PageProps) {
  const { r, g, b } = await searchParams

  return (
    <HomeClientPage
      color={{
        r: parseSearchParam(r) ?? randomColor(),
        g: parseSearchParam(g) ?? randomColor(),
        b: parseSearchParam(b) ?? randomColor(),
      }}
    />
  )
}

function parseSearchParam(param: string | string[] | undefined) {
  if (!param || Array.isArray(param)) return null
  const number = Number.parseInt(param)
  if (Number.isNaN(number)) return null
  if (number < 0 || number > 255) return null
  return number
}
