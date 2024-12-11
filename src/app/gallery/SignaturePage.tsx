import type { SignaturesResponse } from '@/app/api/signatures/route'
import { Flex, Spinner } from '@radix-ui/themes'
import { useEffect } from 'react'
import useSWR from 'swr'
import { useIntersectionObserver } from 'usehooks-ts'
import { SignatureRow } from './SignatureRow'

type SignaturePageProps = {
  index: number
  isLastPage: boolean
  loadMore: () => void
}

export function SignaturePage({
  index,
  isLastPage,
  loadMore,
}: SignaturePageProps) {
  const { data } = useSWR<SignaturesResponse>(`/api/signatures?page=${index}`)

  const { isIntersecting, ref } = useIntersectionObserver()

  useEffect(() => {
    if (isLastPage && isIntersecting && data?.hasMore) loadMore()
  }, [isLastPage, isIntersecting, data, loadMore])

  return (
    <>
      {data?.signatures.map(({ id, owner }) => (
        <SignatureRow key={id} id={BigInt(id)} owner={owner} />
      ))}
      {isLastPage && data?.hasMore && (
        <Flex justify="center" mt="3">
          <Spinner ref={ref} />
        </Flex>
      )}
    </>
  )
}
