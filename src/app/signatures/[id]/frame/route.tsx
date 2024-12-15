/** @jsxImportSource frog/jsx */

import { getUrl } from '@/lib/next'
import { Button, Frog } from 'frog'
import { handle } from 'frog/next'

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
    intents: [
      // biome-ignore lint/correctness/useJsxKeyInIterable: n/a
      <Button.Link href={`${url}/signatures/${c.req.param('id')}`}>
        View
      </Button.Link>,
      // biome-ignore lint/correctness/useJsxKeyInIterable: n/a
      <Button.Link href={url}>Mint</Button.Link>,
    ],
  })
})

export const GET = handle(app)
