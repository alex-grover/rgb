import type { Color } from '@/lib/color'
import styles from './Signature.module.css'

const INDEXES = [
  [0, 1, 2, 3, 4],
  [15, 16, 17, 18, 5],
  [14, 23, null, 19, 6],
  [13, 22, 21, 20, 7],
  [12, 11, 10, 9, 8],
]

type SignatureProps = {
  color: Color
  size?: number
  bordered?: boolean
}

export function Signature({ color, size = 240, bordered }: SignatureProps) {
  const binary =
    color.r.toString(2).padStart(8, '0') +
    color.g.toString(2).padStart(8, '0') +
    color.b.toString(2).padStart(8, '0')

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 15 15"
      height={size}
      width={size}
      shapeRendering="crispEdges"
      className={bordered ? styles.bordered : undefined}
    >
      <title>RGB Signature</title>
      {Array(5)
        .fill(null)
        .flatMap((_, row) =>
          Array(5)
            .fill(null)
            .map((_, col) => {
              const index = INDEXES[row][col]

              let color: string
              let centerColor: string
              if (index === null) {
                color = 'black'
                centerColor = 'white'
              } else {
                color = binary[index] === '1' ? 'white' : 'black'
                centerColor =
                  row === col && row !== 3
                    ? binary[index] === '1'
                      ? 'black'
                      : 'white'
                    : color
              }

              return (
                <Square
                  // biome-ignore lint/suspicious/noArrayIndexKey: fixed list of elements
                  key={`${row}-${col}`}
                  row={row}
                  col={col}
                  color={color}
                  centerColor={centerColor}
                />
              )
            }),
        )}
    </svg>
  )
}

type SquareProps = {
  row: number
  col: number
  color: string
  centerColor: string
}

function Square({
  row: outerRow,
  col: outerCol,
  color,
  centerColor,
}: SquareProps) {
  return Array(3)
    .fill(null)
    .flatMap((_, row) =>
      Array(3)
        .fill(null)
        .map((_, col) => (
          <rect
            // biome-ignore lint/suspicious/noArrayIndexKey: fixed list of elements
            key={`${row}-${col}`}
            x={outerCol * 3 + col}
            y={outerRow * 3 + row}
            width="1"
            height="1"
            fill={row === 1 && col === 1 ? centerColor : color}
          />
        )),
    )
}
