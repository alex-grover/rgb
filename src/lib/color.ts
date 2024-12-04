export type Color = {
  r: number
  g: number
  b: number
}

export function idToColor(id: bigint): Color {
  return {
    r: Number((id >> 16n) & 0xffn),
    g: Number((id >> 8n) & 0xffn),
    b: Number(id & 0xffn),
  }
}
