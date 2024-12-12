import { StandardMerkleTree } from '@openzeppelin/merkle-tree'

const file = Bun.file('./src/scripts/allowlist.csv') // path is relative to cwd, which is project root when run as package.json script
const text = await file.text()
const values = text
  .split('\n')
  .filter((value) => !!value)
  .map((value) => [value])

const tree = StandardMerkleTree.of(values, ['address'])

console.log('Merkle root:', tree.root)

const proofsByAddress = values.reduce<Record<string, string[]>>(
  (prev, curr) => {
    prev[curr[0]] = tree.getProof(curr)
    return prev
  },
  {},
)

Bun.write('./src/proofs.json', JSON.stringify(proofsByAddress))
