/** @jsxImportSource frog/jsx */

import { rgbSignaturesAbi, rgbSignaturesAddress } from '@/generated'
import { chain } from '@/lib/chain'
import { getUrl } from '@/lib/next'
import { viemClient } from '@/lib/viem'
import { Button, Frog, parseEther } from 'frog'
import { handle } from 'frog/next'
import { parseEventLogs } from 'viem'

const app = new Frog({
  title: 'RGB',
  imageAspectRatio: '1:1',
  imageOptions: {
    height: 1000,
    width: 1000,
  },
})

app.frame('/signatures/:id/frame', (c) => {
  const url = getUrl()

  return c.res({
    image: `/signatures/${c.req.param('id')}/frame/image`,
    action: `/signatures/${c.req.param('id')}/frame/finish`,
    intents: [
      // biome-ignore lint/correctness/useJsxKeyInIterable: n/a
      <Button.Link href={`${url}/signatures/${c.req.param('id')}`}>
        View
      </Button.Link>,
      // biome-ignore lint/correctness/useJsxKeyInIterable: n/a
      <Button.Link href={url}>Create</Button.Link>,
      // biome-ignore lint/correctness/useJsxKeyInIterable: n/a
      <Button.Transaction
        target={`/signatures/${c.req.param('id')}/frame/mint`}
      >
        Mint random for 0.001 ETH
      </Button.Transaction>,
    ],
  })
})

app.transaction('/signatures/:id/frame/mint', (c) => {
  return c.contract({
    to: rgbSignaturesAddress[chain.id],
    abi: rgbSignaturesAbi,
    chainId: `eip155:${chain.id}`,
    functionName: 'mintRandom',
    args: [1],
    value: parseEther('0.001'),
  })
})

app.frame('/signatures/:id/frame/finish', async (c) => {
  const { transactionId } = c

  if (!transactionId)
    return c.res({
      image: (
        <div style={{ color: 'white', display: 'flex', fontSize: 60 }}>
          No transaction ID provided
        </div>
      ),
    })

  const receipt = await viemClient.waitForTransactionReceipt({
    hash: transactionId,
  })

  const log = parseEventLogs({
    abi: rgbSignaturesAbi,
    eventName: 'Mint',
    logs: receipt.logs,
    strict: true,
  }).at(0)

  if (!log)
    return c.res({
      image: (
        <div style={{ color: 'white', display: 'flex', fontSize: 60 }}>
          Invalid transaction
        </div>
      ),
    })

  const url = `${getUrl()}/signatures/${log.args.id}`

  return c.res({
    image: `/signatures/${log.args.id}/frame/image`,
    intents: [
      // biome-ignore lint/correctness/useJsxKeyInIterable: n/a
      <Button.Link href={url}>View</Button.Link>,
      // biome-ignore lint/correctness/useJsxKeyInIterable: n/a
      <Button.Link href={`https://warpcast.com/~/compose?embeds[]=${url}`}>
        Share
      </Button.Link>,
    ],
  })
})

export const GET = handle(app)
export const POST = handle(app)
