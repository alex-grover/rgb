'use client'

import { Name } from '@/components/Name'
import { useReadRgbSignaturesOwnerOf } from '@/generated'

type OwnerProps = {
  id: bigint
}

export function Owner({ id }: OwnerProps) {
  const { data: owner } = useReadRgbSignaturesOwnerOf({
    args: [id],
  })

  return <Name address={owner} />
}
