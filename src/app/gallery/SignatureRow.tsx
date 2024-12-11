import { Name } from '@/components/Name'
import { Signature } from '@/components/Signature'
import { idToColor } from '@/lib/color'
import { Box, Flex, Reset, Text } from '@radix-ui/themes'
import NextLink from 'next/link'
import type { Address } from 'viem'

type SignatureRowProps = {
  id: bigint
  owner: Address
}

export function SignatureRow({ id, owner }: SignatureRowProps) {
  const color = idToColor(id)

  return (
    <Flex justify="between">
      <Flex align="center" gap="2" asChild>
        <Reset>
          <NextLink href={`/signatures/${id}`}>
            <Signature color={color} size={16} bordered />
            <Text>
              rgb({color.r},{color.g},{color.b})
            </Text>
          </NextLink>
        </Reset>
      </Flex>
      <Flex align="center" gap="2">
        <Name address={owner} />
        <NextLink href={`/signatures/${id}`}>
          <Box
            height="16px"
            width="16px"
            style={{ backgroundColor: `rgb(${color.r},${color.g},${color.b})` }}
          />
        </NextLink>
      </Flex>
    </Flex>
  )
}
