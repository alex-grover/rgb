'use client'

import type { AccountSignaturesResponse } from '@/app/api/accounts/[address]/signatures/route'
import { Name } from '@/components/Name'
import { RGBIcon } from '@/components/RGBIcon'
import { Signature } from '@/components/Signature'
import { idToColor } from '@/lib/color'
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Inset,
  Skeleton,
  Text,
} from '@radix-ui/themes'
import { AspectRatio } from '@radix-ui/themes'
import Link from 'next/link'
import useSWR from 'swr'
import type { Address } from 'viem'
import styles from './client.module.css'

type ProfileClientPageProps = {
  address: Address
}

export function ProfileClientPage({ address }: ProfileClientPageProps) {
  const { data } = useSWR<AccountSignaturesResponse, string>(
    address && `/api/accounts/${address}/signatures`,
  )

  return (
    <Container size="1" px="2" py="6" flexGrow="1">
      <Flex direction="column" gap="8">
        <Flex direction="column">
          <Name address={address} link={false} weight="medium" />
          <Text weight="medium" color="gray">
            <Skeleton loading={!data}>{data?.count ?? '00'}</Skeleton>{' '}
            Signatures owned
          </Text>
        </Flex>
        {data && (
          <Flex direction="column" gap="8">
            {data.signatures.map((id) => {
              const color = idToColor(BigInt(id))

              return (
                <Box key={id} width="100%" asChild>
                  <Card>
                    <Inset side="top" pb="current">
                      <Link href={`/signatures/${id}`}>
                        <AspectRatio asChild>
                          <Flex
                            align="center"
                            justify="center"
                            style={{
                              backgroundColor: `rgb(${color.r},${color.g},${color.b})`,
                            }}
                          >
                            <Signature color={color} size={200} />
                          </Flex>
                        </AspectRatio>
                      </Link>
                    </Inset>
                    <Flex direction="column" p="3" gap="5">
                      <RGBIcon size={16} />
                      <Flex direction="column" gap="2">
                        <Text size="4" weight="medium">
                          rgb({color.r},{color.g},{color.b})
                        </Text>
                        <Text size="2" color="gray">
                          owned by <Name address={address} link={false} />
                        </Text>
                      </Flex>
                      <Button variant="outline" size="3" asChild>
                        <Link
                          href={`/signatures/${id}`}
                          className={styles.button}
                        >
                          View Signature
                        </Link>
                      </Button>
                    </Flex>
                  </Card>
                </Box>
              )
            })}
          </Flex>
        )}
      </Flex>
    </Container>
  )
}
