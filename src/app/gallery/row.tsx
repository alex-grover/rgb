import { Name } from '@/components/Name'
import { Signature } from '@/components/Signature'
import { useReadRgbSignaturesOwnerOf } from '@/generated'
import { idToColor } from '@/lib/color'
import { Box, Flex, Reset, Text } from '@radix-ui/themes'
import NextLink from 'next/link'

type SignatureRowProps = {
  id: bigint
}

export function SignatureRow({ id }: SignatureRowProps) {
  const color = idToColor(id)

  const { data: owner } = useReadRgbSignaturesOwnerOf({
    args: [id],
  })

  return (
    <Flex justify="between">
      <Flex align="center" gap="2" asChild>
        <Reset>
          <NextLink href={`/signatures/${id}`}>
            <Signature color={color} size={15} />
            <Text>
              rgb({color.r},{color.g},{color.b})
            </Text>
          </NextLink>
        </Reset>
      </Flex>
      <Flex align="center" gap="2">
        <Name address={owner} />
        <Box
          height="16px"
          width="16px"
          style={{ backgroundColor: `rgb(${color.r},${color.g},${color.b})` }}
        />
      </Flex>
    </Flex>
  )
}
