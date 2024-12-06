export type RouteContext = {
  params: Promise<unknown>
}

export type PageProps = RouteContext & {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
