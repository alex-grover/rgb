import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// RGBSignatures
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7856e0432291dd13B58a775320CD680D8424a6D6)
 */
export const rgbSignaturesAbi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: 'feeRecipient_',
        internalType: 'address payable',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MINT_COST',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'RANDOM_MINT_COST',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'r', internalType: 'uint8', type: 'uint8' },
      { name: 'g', internalType: 'uint8', type: 'uint8' },
      { name: 'b', internalType: 'uint8', type: 'uint8' },
      { name: 'to', internalType: 'address', type: 'address' },
    ],
    name: 'adminMint',
    outputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'contractURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'feeRecipient',
    outputs: [{ name: '', internalType: 'address payable', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'r', internalType: 'uint8', type: 'uint8' },
      { name: 'g', internalType: 'uint8', type: 'uint8' },
      { name: 'b', internalType: 'uint8', type: 'uint8' },
    ],
    name: 'mint',
    outputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint8', type: 'uint8' }],
    name: 'mintRandom',
    outputs: [{ name: 'ids', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'rgb',
    outputs: [
      { name: 'r', internalType: 'uint8', type: 'uint8' },
      { name: 'g', internalType: 'uint8', type: 'uint8' },
      { name: 'b', internalType: 'uint8', type: 'uint8' },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'index', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'r', internalType: 'uint8', type: 'uint8' },
      { name: 'g', internalType: 'uint8', type: 'uint8' },
      { name: 'b', internalType: 'uint8', type: 'uint8' },
    ],
    name: 'tokenId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
      {
        name: 'minter',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'genesis',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Mint',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  { type: 'error', inputs: [], name: 'ERC721EnumerableForbiddenBatchMint' },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC721IncorrectOwner',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC721InsufficientApproval',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOperator',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ERC721NonexistentToken',
  },
  {
    type: 'error',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC721OutOfBoundsIndex',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
] as const

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7856e0432291dd13B58a775320CD680D8424a6D6)
 */
export const rgbSignaturesAddress = {
  8453: '0x0000000000000000000000000000000000000000',
  84532: '0x7856e0432291dd13B58a775320CD680D8424a6D6',
} as const

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7856e0432291dd13B58a775320CD680D8424a6D6)
 */
export const rgbSignaturesConfig = {
  address: rgbSignaturesAddress,
  abi: rgbSignaturesAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rgbSignaturesAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7856e0432291dd13B58a775320CD680D8424a6D6)
 */
export const useReadRgbSignatures = /*#__PURE__*/ createUseReadContract({
  abi: rgbSignaturesAbi,
  address: rgbSignaturesAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"MINT_COST"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7856e0432291dd13B58a775320CD680D8424a6D6)
 */
export const useReadRgbSignaturesMintCost = /*#__PURE__*/ createUseReadContract(
  {
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
    functionName: 'MINT_COST',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"RANDOM_MINT_COST"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7856e0432291dd13B58a775320CD680D8424a6D6)
 */
export const useReadRgbSignaturesRandomMintCost =
  /*#__PURE__*/ createUseReadContract({
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
    functionName: 'RANDOM_MINT_COST',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"balanceOf"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7856e0432291dd13B58a775320CD680D8424a6D6)
 */
export const useReadRgbSignaturesBalanceOf =
  /*#__PURE__*/ createUseReadContract({
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
    functionName: 'balanceOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"contractURI"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7856e0432291dd13B58a775320CD680D8424a6D6)
 */
export const useReadRgbSignaturesContractUri =
  /*#__PURE__*/ createUseReadContract({
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
    functionName: 'contractURI',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"feeRecipient"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7856e0432291dd13B58a775320CD680D8424a6D6)
 */
export const useReadRgbSignaturesFeeRecipient =
  /*#__PURE__*/ createUseReadContract({
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
    functionName: 'feeRecipient',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"getApproved"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7856e0432291dd13B58a775320CD680D8424a6D6)
 */
export const useReadRgbSignaturesGetApproved =
  /*#__PURE__*/ createUseReadContract({
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
    functionName: 'getApproved',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"isApprovedForAll"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7856e0432291dd13B58a775320CD680D8424a6D6)
 */
export const useReadRgbSignaturesIsApprovedForAll =
  /*#__PURE__*/ createUseReadContract({
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
    functionName: 'isApprovedForAll',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"name"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7856e0432291dd13B58a775320CD680D8424a6D6)
 */
export const useReadRgbSignaturesName = /*#__PURE__*/ createUseReadContract({
  abi: rgbSignaturesAbi,
  address: rgbSignaturesAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7856e0432291dd13B58a775320CD680D8424a6D6)
 */
export const useReadRgbSignaturesOwner = /*#__PURE__*/ createUseReadContract({
  abi: rgbSignaturesAbi,
  address: rgbSignaturesAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"ownerOf"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7856e0432291dd13B58a775320CD680D8424a6D6)
 */
export const useReadRgbSignaturesOwnerOf = /*#__PURE__*/ createUseReadContract({
  abi: rgbSignaturesAbi,
  address: rgbSignaturesAddress,
  functionName: 'ownerOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"rgb"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7856e0432291dd13B58a775320CD680D8424a6D6)
 */
export const useReadRgbSignaturesRgb = /*#__PURE__*/ createUseReadContract({
  abi: rgbSignaturesAbi,
  address: rgbSignaturesAddress,
  functionName: 'rgb',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"supportsInterface"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7856e0432291dd13B58a775320CD680D8424a6D6)
 */
export const useReadRgbSignaturesSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"symbol"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7856e0432291dd13B58a775320CD680D8424a6D6)
 */
export const useReadRgbSignaturesSymbol = /*#__PURE__*/ createUseReadContract({
  abi: rgbSignaturesAbi,
  address: rgbSignaturesAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"tokenByIndex"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7856e0432291dd13B58a775320CD680D8424a6D6)
 */
export const useReadRgbSignaturesTokenByIndex =
  /*#__PURE__*/ createUseReadContract({
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
    functionName: 'tokenByIndex',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"tokenId"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7856e0432291dd13B58a775320CD680D8424a6D6)
 */
export const useReadRgbSignaturesTokenId = /*#__PURE__*/ createUseReadContract({
  abi: rgbSignaturesAbi,
  address: rgbSignaturesAddress,
  functionName: 'tokenId',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"tokenOfOwnerByIndex"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7856e0432291dd13B58a775320CD680D8424a6D6)
 */
export const useReadRgbSignaturesTokenOfOwnerByIndex =
  /*#__PURE__*/ createUseReadContract({
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
    functionName: 'tokenOfOwnerByIndex',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"tokenURI"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7856e0432291dd13B58a775320CD680D8424a6D6)
 */
export const useReadRgbSignaturesTokenUri = /*#__PURE__*/ createUseReadContract(
  {
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
    functionName: 'tokenURI',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"totalSupply"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7856e0432291dd13B58a775320CD680D8424a6D6)
 */
export const useReadRgbSignaturesTotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
    functionName: 'totalSupply',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rgbSignaturesAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7856e0432291dd13B58a775320CD680D8424a6D6)
 */
export const useWriteRgbSignatures = /*#__PURE__*/ createUseWriteContract({
  abi: rgbSignaturesAbi,
  address: rgbSignaturesAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"adminMint"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7856e0432291dd13B58a775320CD680D8424a6D6)
 */
export const useWriteRgbSignaturesAdminMint =
  /*#__PURE__*/ createUseWriteContract({
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
    functionName: 'adminMint',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7856e0432291dd13B58a775320CD680D8424a6D6)
 */
export const useWriteRgbSignaturesApprove =
  /*#__PURE__*/ createUseWriteContract({
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"mint"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7856e0432291dd13B58a775320CD680D8424a6D6)
 */
export const useWriteRgbSignaturesMint = /*#__PURE__*/ createUseWriteContract({
  abi: rgbSignaturesAbi,
  address: rgbSignaturesAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"mintRandom"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7856e0432291dd13B58a775320CD680D8424a6D6)
 */
export const useWriteRgbSignaturesMintRandom =
  /*#__PURE__*/ createUseWriteContract({
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
    functionName: 'mintRandom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7856e0432291dd13B58a775320CD680D8424a6D6)
 */
export const useWriteRgbSignaturesRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7856e0432291dd13B58a775320CD680D8424a6D6)
 */
export const useWriteRgbSignaturesSafeTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7856e0432291dd13B58a775320CD680D8424a6D6)
 */
export const useWriteRgbSignaturesSetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7856e0432291dd13B58a775320CD680D8424a6D6)
 */
export const useWriteRgbSignaturesTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7856e0432291dd13B58a775320CD680D8424a6D6)
 */
export const useWriteRgbSignaturesTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rgbSignaturesAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7856e0432291dd13B58a775320CD680D8424a6D6)
 */
export const useSimulateRgbSignatures = /*#__PURE__*/ createUseSimulateContract(
  { abi: rgbSignaturesAbi, address: rgbSignaturesAddress },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"adminMint"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7856e0432291dd13B58a775320CD680D8424a6D6)
 */
export const useSimulateRgbSignaturesAdminMint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
    functionName: 'adminMint',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7856e0432291dd13B58a775320CD680D8424a6D6)
 */
export const useSimulateRgbSignaturesApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"mint"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7856e0432291dd13B58a775320CD680D8424a6D6)
 */
export const useSimulateRgbSignaturesMint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
    functionName: 'mint',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"mintRandom"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7856e0432291dd13B58a775320CD680D8424a6D6)
 */
export const useSimulateRgbSignaturesMintRandom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
    functionName: 'mintRandom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7856e0432291dd13B58a775320CD680D8424a6D6)
 */
export const useSimulateRgbSignaturesRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7856e0432291dd13B58a775320CD680D8424a6D6)
 */
export const useSimulateRgbSignaturesSafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7856e0432291dd13B58a775320CD680D8424a6D6)
 */
export const useSimulateRgbSignaturesSetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7856e0432291dd13B58a775320CD680D8424a6D6)
 */
export const useSimulateRgbSignaturesTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7856e0432291dd13B58a775320CD680D8424a6D6)
 */
export const useSimulateRgbSignaturesTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rgbSignaturesAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7856e0432291dd13B58a775320CD680D8424a6D6)
 */
export const useWatchRgbSignaturesEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `eventName` set to `"Approval"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7856e0432291dd13B58a775320CD680D8424a6D6)
 */
export const useWatchRgbSignaturesApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `eventName` set to `"ApprovalForAll"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7856e0432291dd13B58a775320CD680D8424a6D6)
 */
export const useWatchRgbSignaturesApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `eventName` set to `"Mint"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7856e0432291dd13B58a775320CD680D8424a6D6)
 */
export const useWatchRgbSignaturesMintEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
    eventName: 'Mint',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7856e0432291dd13B58a775320CD680D8424a6D6)
 */
export const useWatchRgbSignaturesOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `eventName` set to `"Transfer"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7856e0432291dd13B58a775320CD680D8424a6D6)
 */
export const useWatchRgbSignaturesTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
    eventName: 'Transfer',
  })
