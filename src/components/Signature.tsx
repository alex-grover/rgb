const INDEXES = [[0, 1, 2, 3, 4], [15, 16, 17, 18, 5], [14, 23, null, 19, 6], [13, 22, 21, 20, 7], [12, 11, 10, 9, 8]]

type SignatureProps = {
  r: number
  g: number
  b: number
}

export function Signature({ r, g, b }: SignatureProps) {
  const binary = r.toString(2).padStart(8, '0') + g.toString(2).padStart(8, '0') + b.toString(2).padStart(8, '0')

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" height="240" width="240" shapeRendering="crispEdges">
      {Array(5).fill(null).flatMap((_, row) => Array(5).fill(null).map((_, col) => {
        const index = INDEXES[row][col]

        let color
        let centerColor
        if (index === null) {
          color = 'white'
          centerColor = 'black'
        } else {
          color = binary[index] === '1' ? 'black' : 'white'
          centerColor = row === col && row !== 3 ? (binary[index] === '1' ? 'white' : 'black') : color
        }

        return <Square key={`${row}-${col}`} row={row} col={col} color={color} centerColor={centerColor} />
      }))}
    </svg>
  )
}

type SquareProps = {
  row: number
  col: number
  color: string
  centerColor: string
}

function Square({ row: outerRow, col: outerCol, color, centerColor }: SquareProps) {
  return Array(3).fill(null).flatMap((_, row) => Array(3).fill(null).map((_, col) => <rect key={`${row}-${col}`} x={outerCol * 3 + col} y={outerRow * 3 + row} width="1" height="1" fill={row === 1 && col === 1 ? centerColor : color} />))
}
