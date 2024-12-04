import { parseAbiItem } from 'viem'

export const mintEvent = parseAbiItem(
  'event Mint(uint256 indexed id, address minter, uint256 genesis, uint256 timestamp)',
)
