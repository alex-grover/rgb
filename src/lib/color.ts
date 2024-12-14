export type Color = {
  r: number
  g: number
  b: number
}

export function idToColor(id: bigint): Color {
  return {
    r: Number(((id - 1n) >> 16n) & 0xffn),
    g: Number(((id - 1n) >> 8n) & 0xffn),
    b: Number((id - 1n) & 0xffn),
  }
}

export function colorToId(color: Color): bigint {
  return BigInt((color.r << 16) | (color.g << 8) | color.b) + 1n
}
