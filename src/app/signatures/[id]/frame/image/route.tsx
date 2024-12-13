import { Signature } from '@/components/Signature'
import { idToColor } from '@/lib/color'
import type { RouteContext } from '@/lib/next'
import { notFound } from 'next/navigation'
import { ImageResponse } from 'next/og'
import * as v from 'valibot'

const schema = v.object({
  id: v.pipe(
    v.string(),
    v.minLength(1),
    v.digits(),
    v.transform((input) => BigInt(input)),
  ),
})

export async function GET(_: Request, { params }: RouteContext) {
  const parseResult = v.safeParse(schema, await params)
  if (!parseResult.success) notFound()

  const color = idToColor(parseResult.output.id)

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        background: `rgb(${color.r},${color.g},${color.b})`,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Signature color={color} size={500} />
    </div>,
    {
      width: 1000,
      height: 1000,
    },
  )
}
