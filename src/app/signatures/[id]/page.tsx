import { Name } from '@/components/Name'
import { OpenSeaIcon } from '@/components/OpenSeaIcon'
import { RGBIcon } from '@/components/RGBIcon'
import { Signature } from '@/components/Signature'
import { rgbSignaturesAbi, rgbSignaturesAddress } from '@/generated'
import { chain, fromBlock } from '@/lib/chain'
import { idToColor } from '@/lib/color'
import { mintEvent } from '@/lib/contracts'
import { type PageProps, type RouteContext, getUrl } from '@/lib/next'
import { viemClient } from '@/lib/viem'
import { Box, Button, Flex, Heading, Link, Text } from '@radix-ui/themes'
import { getFrameMetadata } from 'frog/web'
import type { Metadata } from 'next'
import NextLink from 'next/link'
import { notFound } from 'next/navigation'
import * as v from 'valibot'
import { baseSepolia } from 'wagmi/chains'
import styles from './page.module.css'

const schema = v.object({
  id: v.pipe(
    v.string(),
    v.minLength(1),
    v.digits(),
    v.transform((input) => BigInt(input)),
  ),
})

export async function generateMetadata({
  params,
}: RouteContext): Promise<Metadata> {
  const parseResult = v.safeParse(schema, await params)
  if (!parseResult.success) notFound()

  const url = getUrl()
  const frameMetadata = await getFrameMetadata(
    `${url}/signatures/${parseResult.output.id}/frame`,
  )

  return {
    other: frameMetadata,
  }
}

export default async function SignaturePage({ params }: PageProps) {
  const parseResult = v.safeParse(schema, await params)
  if (!parseResult.success) notFound()

  const [logs, owner] = await Promise.all([
    viemClient.getLogs({
      address: rgbSignaturesAddress[chain.id],
      event: mintEvent,
      fromBlock,
      args: {
        id: parseResult.output.id,
      },
      strict: true,
    }),
    viemClient.readContract({
      address: rgbSignaturesAddress[chain.id],
      abi: rgbSignaturesAbi,
      functionName: 'ownerOf',
      args: [parseResult.output.id],
    }),
  ])

  const log = logs.at(0)
  if (!log) notFound()

  const color = idToColor(parseResult.output.id)

  const date = new Date(Number(log.args.timestamp) * 1000)
  const dateOptions = [
    { month: 'numeric' },
    { day: 'numeric' },
    { year: 'numeric' },
  ] as const
  const timeOptions = [
    { hour: '2-digit', hour12: false },
    { minute: 'numeric' },
    { second: 'numeric' },
  ] as const
  const datetime = `${dateOptions.map((option) => new Intl.DateTimeFormat('en-US', option).format(date)).join('-')} ${timeOptions.map((option) => new Intl.DateTimeFormat('en', option).format(date)).join(':')} UTC`

  return (
    <Flex
      direction={{ initial: 'column', xs: 'row' }}
      flexGrow="1"
      className={styles.container}
    >
      <Flex
        align="center"
        justify="center"
        flexGrow="1"
        minHeight={{ initial: '100vw', xs: 'auto' }}
        style={{ backgroundColor: `rgb(${color.r},${color.g},${color.b})` }}
      >
        <Signature color={color} />
      </Flex>
      <Flex
        direction="column"
        justify="between"
        flexBasis={{ initial: 'auto', xs: '400px' }}
        flexShrink="0"
        className={styles.aside}
      >
        <Box>
          <Flex direction="column" p="6" gap="6">
            <RGBIcon size={20} />
            <Flex direction="column" gap="2">
              <Heading weight="medium">
                rgb({color.r},{color.g},{color.b})
              </Heading>
              <Text size="2" weight="medium" color="gray">
                owned by <Name address={owner} color="gray" />
              </Text>
            </Flex>
          </Flex>
          <Flex className={styles.colors}>
            <Flex
              direction="column"
              align="center"
              justify="center"
              gap="2"
              flexGrow="1"
              py="4"
            >
              <Text size="2" weight="medium" color="gray">
                R
              </Text>
              <Box
                height="16px"
                width="16px"
                style={{ backgroundColor: 'rgb(255,0,0)' }}
              />
              <Text>{color.r}</Text>
            </Flex>
            <Flex
              direction="column"
              align="center"
              justify="center"
              gap="2"
              flexGrow="1"
              py="4"
            >
              <Text size="2" weight="medium" color="gray">
                G
              </Text>
              <Box
                height="16px"
                width="16px"
                style={{ backgroundColor: 'rgb(0,255,0)' }}
              />
              <Text>{color.g}</Text>
            </Flex>
            <Flex
              direction="column"
              align="center"
              justify="center"
              gap="2"
              flexGrow="1"
              py="4"
            >
              <Text size="2" weight="medium" color="gray">
                B
              </Text>
              <Box
                height="16px"
                width="16px"
                style={{ backgroundColor: 'rgb(0,0,255)' }}
              />
              <Text>{color.b}</Text>
            </Flex>
          </Flex>
          <Box p="6" className={styles.metadata}>
            <Flex align="center" justify="between" py="2">
              <Text size="2" weight="medium" color="gray">
                Creator
              </Text>
              <Link size="2" weight="medium" color="gray" asChild>
                <NextLink href="/accounts/0xf3e2399c5D1C698A6C1dfa195ADbd12a6AfD1899">
                  rgb.eth
                </NextLink>
              </Link>
            </Flex>
            <Flex align="center" justify="between" py="2">
              <Text size="2" weight="medium" color="gray">
                Network
              </Text>
              <Text size="2" weight="medium" color="gray">
                {chain.name}
              </Text>
            </Flex>
            <Flex align="center" justify="between" py="2">
              <Text size="2" weight="medium" color="gray">
                Token ID
              </Text>
              <Text size="2" weight="medium" color="gray">
                {parseResult.output.id}
              </Text>
            </Flex>
            <Flex align="center" justify="between" py="2">
              <Text size="2" weight="medium" color="gray">
                Genesis
              </Text>
              <Text size="2" weight="medium" color="gray">
                {log.args.genesis}
              </Text>
            </Flex>
            <Flex align="center" justify="between" py="2">
              <Text size="2" weight="medium" color="gray">
                Block
              </Text>
              <Text size="2" weight="medium" color="gray">
                {log.blockNumber}
              </Text>
            </Flex>
            <Flex align="center" justify="between" py="2">
              <Text size="2" weight="medium" color="gray">
                Minted on
              </Text>
              <Text size="2" weight="medium" color="gray">
                {datetime}
              </Text>
            </Flex>
            <Flex align="center" justify="between" py="2">
              <Text size="2" weight="medium" color="gray">
                Minted by
              </Text>
              <Name
                address={log.args.minter}
                size="2"
                weight="medium"
                color="gray"
              />
            </Flex>
            <Flex align="center" justify="between" py="2">
              <Text size="2" weight="medium" color="gray">
                Transaction
              </Text>
              <Link size="2" weight="medium" color="gray" asChild>
                <a
                  href={`${chain.blockExplorers.default.url}/tx/${log.transactionHash}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {log.transactionHash.slice(0, 4)}...
                  {log.transactionHash.slice(-4)}
                </a>
              </Link>
            </Flex>
          </Box>
        </Box>
        <Box m="6" mt="0" asChild>
          <Button variant="outline" size="4" asChild>
            <a
              href={`https://${chain.id === baseSepolia.id ? 'testnets.' : ''}opensea.io/assets/${'network' in chain ? chain.network : chain.name.toLowerCase()}/${rgbSignaturesAddress[chain.id]}/${log.args.id}`}
              target="_blank"
              rel="noreferrer"
              className={styles.button}
            >
              Place a bid on secondary
              <OpenSeaIcon />
            </a>
          </Button>
        </Box>
      </Flex>
    </Flex>
  )
}
