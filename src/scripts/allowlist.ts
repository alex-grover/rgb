import { StandardMerkleTree } from '@openzeppelin/merkle-tree'

const file = Bun.file('./src/scripts/allowlist.json') // path is relative to cwd, which is project root when run as package.json script
const values = (await file.json()) as string[][]

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
