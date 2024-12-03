import { Name } from '@/components/Name'
import { RGBIcon } from '@/components/RGBIcon'
import { Signature } from '@/components/Signature'
import { rgbSignaturesAddress } from '@/generated'
import { chain, fromBlock } from '@/lib/chain'
import type { Color } from '@/lib/color'
import { viemClient } from '@/lib/viem'
import { Box, Flex, Heading, Link, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import * as v from 'valibot'
import { parseAbiItem } from 'viem'
import { Owner } from './owner'
import styles from './page.module.css'

type SignaturePageProps = {
  params: Promise<unknown>
}

const schema = v.object({
  id: v.pipe(
    v.string(),
    v.minLength(1),
    v.digits(),
    v.transform((input) => BigInt(input)),
  ),
})

export default async function SignaturePage({ params }: SignaturePageProps) {
  const parseResult = v.safeParse(schema, await params)
  if (!parseResult.success) notFound()

  const logs = await viemClient.getLogs({
    address: rgbSignaturesAddress[chain.id],
    event: parseAbiItem(
      'event Mint(uint256 indexed id, address minter, uint256 genesis, uint256 timestamp)',
    ),
    fromBlock,
    args: {
      id: parseResult.output.id,
    },
    strict: true,
  })

  const log = logs.at(0)
  if (!log) notFound()

  const color: Color = {
    r: Number((parseResult.output.id >> 16n) & 0xffn),
    g: Number((parseResult.output.id >> 8n) & 0xffn),
    b: Number(parseResult.output.id & 0xffn),
  }

  return (
    <Flex direction="row" flexGrow="1" className={styles.container}>
      <Flex
        align="center"
        justify="center"
        flexGrow="1"
        style={{ backgroundColor: `rgb(${color.r},${color.g},${color.b})` }}
      >
        <Signature color={color} />
      </Flex>
      <Flex direction="column" flexBasis="400px" className={styles.aside}>
        <Flex direction="column" p="6" gap="6">
          <RGBIcon size={20} />
          <Flex direction="column" gap="4">
            <Heading>
              rgb({color.r},{color.g},{color.b})
            </Heading>
            <Text size="2" weight="medium">
              owned by <Owner id={parseResult.output.id} />
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
            <Text>R</Text>
            <div
              style={{
                backgroundColor: 'red',
              }}
              className={styles.square}
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
            <Text>G</Text>
            <div
              style={{
                backgroundColor: 'green',
              }}
              className={styles.square}
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
            <Text>B</Text>
            <div
              style={{
                backgroundColor: 'blue',
              }}
              className={styles.square}
            />
            <Text>{color.b}</Text>
          </Flex>
        </Flex>
        <Box p="6" className={styles.metadata}>
          <Flex align="center" justify="between" py="2">
            <Text>Creator</Text>
            <Text>rgb.eth</Text>
          </Flex>
          <Flex align="center" justify="between" py="2">
            <Text>Network</Text>
            <Text>{chain.name}</Text>
          </Flex>
          <Flex align="center" justify="between" py="2">
            <Text>Token ID</Text>
            <Text>{parseResult.output.id}</Text>
          </Flex>
          <Flex align="center" justify="between" py="2">
            <Text>Genesis</Text>
            <Text>{log.args.genesis}</Text>
          </Flex>
          <Flex align="center" justify="between" py="2">
            <Text>Block</Text>
            <Text>{log.blockNumber}</Text>
          </Flex>
          <Flex align="center" justify="between" py="2">
            <Text>Minted on</Text>
            <Text>
              {new Date(Number(log.args.timestamp) * 1000).toISOString()}
            </Text>
          </Flex>
          <Flex align="center" justify="between" py="2">
            <Text>Minted by</Text>
            <Name address={log.args.minter} />
          </Flex>
          <Flex align="center" justify="between" py="2">
            <Text>Transaction</Text>
            <Link asChild>
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
      </Flex>
    </Flex>
  )
}
