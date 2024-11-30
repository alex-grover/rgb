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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x83B890dED9E2dE731666eA9EeBAB2Ae2b581E715)
 */
export const rgbSignaturesAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [
      { name: 'r', internalType: 'uint8', type: 'uint8' },
      { name: 'g', internalType: 'uint8', type: 'uint8' },
      { name: 'b', internalType: 'uint8', type: 'uint8' },
      { name: 'to', internalType: 'address', type: 'address' },
    ],
    name: 'adminMint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'result', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'cancelOwnershipHandover',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'pendingOwner', internalType: 'address', type: 'address' },
    ],
    name: 'completeOwnershipHandover',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: 'result', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: 'result', internalType: 'bool', type: 'bool' }],
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
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'mintCost',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: 'result', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: 'result', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'pendingOwner', internalType: 'address', type: 'address' },
    ],
    name: 'ownershipHandoverExpiresAt',
    outputs: [{ name: 'result', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'requestOwnershipHandover',
    outputs: [],
    stateMutability: 'payable',
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
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'isApproved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: 'result', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'pure',
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
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'withdraw',
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
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
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
      {
        name: 'isApproved',
        internalType: 'bool',
        type: 'bool',
        indexed: false,
      },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'pendingOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipHandoverCanceled',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'pendingOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipHandoverRequested',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'oldOwner',
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
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'Transfer',
  },
  { type: 'error', inputs: [], name: 'AccountBalanceOverflow' },
  { type: 'error', inputs: [], name: 'AlreadyInitialized' },
  { type: 'error', inputs: [], name: 'BalanceQueryForZeroAddress' },
  { type: 'error', inputs: [], name: 'NewOwnerIsZeroAddress' },
  { type: 'error', inputs: [], name: 'NoHandoverRequest' },
  { type: 'error', inputs: [], name: 'NotOwnerNorApproved' },
  { type: 'error', inputs: [], name: 'TokenAlreadyExists' },
  { type: 'error', inputs: [], name: 'TokenDoesNotExist' },
  { type: 'error', inputs: [], name: 'TransferFromIncorrectOwner' },
  { type: 'error', inputs: [], name: 'TransferToNonERC721ReceiverImplementer' },
  { type: 'error', inputs: [], name: 'TransferToZeroAddress' },
  { type: 'error', inputs: [], name: 'Unauthorized' },
] as const

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x83B890dED9E2dE731666eA9EeBAB2Ae2b581E715)
 */
export const rgbSignaturesAddress = {
  8453: '0x0000000000000000000000000000000000000000',
  84532: '0x83B890dED9E2dE731666eA9EeBAB2Ae2b581E715',
} as const

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x83B890dED9E2dE731666eA9EeBAB2Ae2b581E715)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x83B890dED9E2dE731666eA9EeBAB2Ae2b581E715)
 */
export const useReadRgbSignatures = /*#__PURE__*/ createUseReadContract({
  abi: rgbSignaturesAbi,
  address: rgbSignaturesAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"balanceOf"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x83B890dED9E2dE731666eA9EeBAB2Ae2b581E715)
 */
export const useReadRgbSignaturesBalanceOf =
  /*#__PURE__*/ createUseReadContract({
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
    functionName: 'balanceOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"getApproved"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x83B890dED9E2dE731666eA9EeBAB2Ae2b581E715)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x83B890dED9E2dE731666eA9EeBAB2Ae2b581E715)
 */
export const useReadRgbSignaturesIsApprovedForAll =
  /*#__PURE__*/ createUseReadContract({
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
    functionName: 'isApprovedForAll',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"mintCost"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x83B890dED9E2dE731666eA9EeBAB2Ae2b581E715)
 */
export const useReadRgbSignaturesMintCost = /*#__PURE__*/ createUseReadContract(
  {
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
    functionName: 'mintCost',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"name"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x83B890dED9E2dE731666eA9EeBAB2Ae2b581E715)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x83B890dED9E2dE731666eA9EeBAB2Ae2b581E715)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x83B890dED9E2dE731666eA9EeBAB2Ae2b581E715)
 */
export const useReadRgbSignaturesOwnerOf = /*#__PURE__*/ createUseReadContract({
  abi: rgbSignaturesAbi,
  address: rgbSignaturesAddress,
  functionName: 'ownerOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"ownershipHandoverExpiresAt"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x83B890dED9E2dE731666eA9EeBAB2Ae2b581E715)
 */
export const useReadRgbSignaturesOwnershipHandoverExpiresAt =
  /*#__PURE__*/ createUseReadContract({
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
    functionName: 'ownershipHandoverExpiresAt',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"rgb"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x83B890dED9E2dE731666eA9EeBAB2Ae2b581E715)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x83B890dED9E2dE731666eA9EeBAB2Ae2b581E715)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x83B890dED9E2dE731666eA9EeBAB2Ae2b581E715)
 */
export const useReadRgbSignaturesSymbol = /*#__PURE__*/ createUseReadContract({
  abi: rgbSignaturesAbi,
  address: rgbSignaturesAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"tokenId"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x83B890dED9E2dE731666eA9EeBAB2Ae2b581E715)
 */
export const useReadRgbSignaturesTokenId = /*#__PURE__*/ createUseReadContract({
  abi: rgbSignaturesAbi,
  address: rgbSignaturesAddress,
  functionName: 'tokenId',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"tokenURI"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x83B890dED9E2dE731666eA9EeBAB2Ae2b581E715)
 */
export const useReadRgbSignaturesTokenUri = /*#__PURE__*/ createUseReadContract(
  {
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
    functionName: 'tokenURI',
  },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rgbSignaturesAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x83B890dED9E2dE731666eA9EeBAB2Ae2b581E715)
 */
export const useWriteRgbSignatures = /*#__PURE__*/ createUseWriteContract({
  abi: rgbSignaturesAbi,
  address: rgbSignaturesAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"adminMint"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x83B890dED9E2dE731666eA9EeBAB2Ae2b581E715)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x83B890dED9E2dE731666eA9EeBAB2Ae2b581E715)
 */
export const useWriteRgbSignaturesApprove =
  /*#__PURE__*/ createUseWriteContract({
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"cancelOwnershipHandover"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x83B890dED9E2dE731666eA9EeBAB2Ae2b581E715)
 */
export const useWriteRgbSignaturesCancelOwnershipHandover =
  /*#__PURE__*/ createUseWriteContract({
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
    functionName: 'cancelOwnershipHandover',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"completeOwnershipHandover"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x83B890dED9E2dE731666eA9EeBAB2Ae2b581E715)
 */
export const useWriteRgbSignaturesCompleteOwnershipHandover =
  /*#__PURE__*/ createUseWriteContract({
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
    functionName: 'completeOwnershipHandover',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"mint"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x83B890dED9E2dE731666eA9EeBAB2Ae2b581E715)
 */
export const useWriteRgbSignaturesMint = /*#__PURE__*/ createUseWriteContract({
  abi: rgbSignaturesAbi,
  address: rgbSignaturesAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x83B890dED9E2dE731666eA9EeBAB2Ae2b581E715)
 */
export const useWriteRgbSignaturesRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"requestOwnershipHandover"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x83B890dED9E2dE731666eA9EeBAB2Ae2b581E715)
 */
export const useWriteRgbSignaturesRequestOwnershipHandover =
  /*#__PURE__*/ createUseWriteContract({
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
    functionName: 'requestOwnershipHandover',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x83B890dED9E2dE731666eA9EeBAB2Ae2b581E715)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x83B890dED9E2dE731666eA9EeBAB2Ae2b581E715)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x83B890dED9E2dE731666eA9EeBAB2Ae2b581E715)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x83B890dED9E2dE731666eA9EeBAB2Ae2b581E715)
 */
export const useWriteRgbSignaturesTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"withdraw"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x83B890dED9E2dE731666eA9EeBAB2Ae2b581E715)
 */
export const useWriteRgbSignaturesWithdraw =
  /*#__PURE__*/ createUseWriteContract({
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rgbSignaturesAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x83B890dED9E2dE731666eA9EeBAB2Ae2b581E715)
 */
export const useSimulateRgbSignatures = /*#__PURE__*/ createUseSimulateContract(
  { abi: rgbSignaturesAbi, address: rgbSignaturesAddress },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"adminMint"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x83B890dED9E2dE731666eA9EeBAB2Ae2b581E715)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x83B890dED9E2dE731666eA9EeBAB2Ae2b581E715)
 */
export const useSimulateRgbSignaturesApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"cancelOwnershipHandover"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x83B890dED9E2dE731666eA9EeBAB2Ae2b581E715)
 */
export const useSimulateRgbSignaturesCancelOwnershipHandover =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
    functionName: 'cancelOwnershipHandover',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"completeOwnershipHandover"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x83B890dED9E2dE731666eA9EeBAB2Ae2b581E715)
 */
export const useSimulateRgbSignaturesCompleteOwnershipHandover =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
    functionName: 'completeOwnershipHandover',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"mint"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x83B890dED9E2dE731666eA9EeBAB2Ae2b581E715)
 */
export const useSimulateRgbSignaturesMint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
    functionName: 'mint',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x83B890dED9E2dE731666eA9EeBAB2Ae2b581E715)
 */
export const useSimulateRgbSignaturesRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"requestOwnershipHandover"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x83B890dED9E2dE731666eA9EeBAB2Ae2b581E715)
 */
export const useSimulateRgbSignaturesRequestOwnershipHandover =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
    functionName: 'requestOwnershipHandover',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x83B890dED9E2dE731666eA9EeBAB2Ae2b581E715)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x83B890dED9E2dE731666eA9EeBAB2Ae2b581E715)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x83B890dED9E2dE731666eA9EeBAB2Ae2b581E715)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x83B890dED9E2dE731666eA9EeBAB2Ae2b581E715)
 */
export const useSimulateRgbSignaturesTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `functionName` set to `"withdraw"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x83B890dED9E2dE731666eA9EeBAB2Ae2b581E715)
 */
export const useSimulateRgbSignaturesWithdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rgbSignaturesAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x83B890dED9E2dE731666eA9EeBAB2Ae2b581E715)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x83B890dED9E2dE731666eA9EeBAB2Ae2b581E715)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x83B890dED9E2dE731666eA9EeBAB2Ae2b581E715)
 */
export const useWatchRgbSignaturesApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `eventName` set to `"OwnershipHandoverCanceled"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x83B890dED9E2dE731666eA9EeBAB2Ae2b581E715)
 */
export const useWatchRgbSignaturesOwnershipHandoverCanceledEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
    eventName: 'OwnershipHandoverCanceled',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `eventName` set to `"OwnershipHandoverRequested"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x83B890dED9E2dE731666eA9EeBAB2Ae2b581E715)
 */
export const useWatchRgbSignaturesOwnershipHandoverRequestedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
    eventName: 'OwnershipHandoverRequested',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rgbSignaturesAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x83B890dED9E2dE731666eA9EeBAB2Ae2b581E715)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x83B890dED9E2dE731666eA9EeBAB2Ae2b581E715)
 */
export const useWatchRgbSignaturesTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rgbSignaturesAbi,
    address: rgbSignaturesAddress,
    eventName: 'Transfer',
  })
