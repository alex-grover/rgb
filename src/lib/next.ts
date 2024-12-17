export type RouteContext = {
  params: Promise<unknown>
}

export type PageProps = RouteContext & {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export function getUrl() {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production')
    return `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview')
    return `https://${process.env.VERCEL_URL}`
  return 'http://localhost:3000'
}
