// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Ownable} from "solady/auth/Ownable.sol";
import {ERC721} from "solady/tokens/ERC721.sol";
import {Base64} from "solady/utils/Base64.sol";
import {LibString} from "solady/utils/LibString.sol";
import {SignatureRenderer} from "./SignatureRenderer.sol";

/*
          _____                    _____                    _____
         /\    \                  /\    \                  /\    \
        /::\    \                /::\    \                /::\    \
       /::::\    \              /::::\    \              /::::\    \
      /::::::\    \            /::::::\    \            /::::::\    \
     /:::/\:::\    \          /:::/\:::\    \          /:::/\:::\    \
    /:::/__\:::\    \        /:::/  \:::\    \        /:::/__\:::\    \
   /::::\   \:::\    \      /:::/    \:::\    \      /::::\   \:::\    \
  /::::::\   \:::\    \    /:::/    / \:::\    \    /::::::\   \:::\    \
 /:::/\:::\   \:::\____\  /:::/    /   \:::\ ___\  /:::/\:::\   \:::\ ___\
/:::/  \:::\   \:::|    |/:::/____/  ___\:::|    |/:::/__\:::\   \:::|    |
\::/   |::::\  /:::|____|\:::\    \ /\  /:::|____|\:::\   \:::\  /:::|____|
 \/____|:::::\/:::/    /  \:::\    /::\ \::/    /  \:::\   \:::\/:::/    /
       |:::::::::/    /    \:::\   \:::\ \/____/    \:::\   \::::::/    /
       |::|\::::/    /      \:::\   \:::\____\       \:::\   \::::/    /
       |::| \::/____/        \:::\  /:::/    /        \:::\  /:::/    /
       |::|  ~|               \:::\/:::/    /          \:::\/:::/    /
       |::|   |                \::::::/    /            \::::::/    /
       \::|   |                 \::::/    /              \::::/    /
        \:|   |                  \::/____/                \::/____/
         \|___|                                            ~~
*/

contract RGBSignatures is ERC721, Ownable {
    uint256 public immutable MINT_COST = 0.002 ether;
    address payable public immutable feeRecipient;
    uint256 public totalSupply;

    event Mint(uint256 indexed id, address minter, uint256 genesis, uint256 timestamp);

    constructor(address payable feeRecipient_) {
        _initializeOwner(msg.sender);
        feeRecipient = feeRecipient_;
    }

    function mint(uint8 r, uint8 g, uint8 b) external payable {
        require(msg.value >= MINT_COST, "Insufficient funds");

        uint256 id = tokenId(r, g, b);
        _mint(msg.sender, id);
        emit Mint(id, msg.sender, ++totalSupply, block.timestamp);

        (bool sent,) = feeRecipient.call{value: address(this).balance}("");
        require(sent, "Failed to transfer mint fee");
    }

    function adminMint(uint8 r, uint8 g, uint8 b, address to) external onlyOwner {
        uint256 id = tokenId(r, g, b);
        _mint(to, id);
        emit Mint(id, msg.sender, ++totalSupply, block.timestamp);
    }

    function name() public pure override returns (string memory) {
        return "RGB Signatures";
    }

    function symbol() public pure override returns (string memory) {
        return "RGB";
    }

    function contractURI() public pure returns (string memory) {
        return string.concat(
            'data:application/json;utf8,{"name":"RGB Signatures","description":"RGB is an infinite canvas"}'
        );
    }

    function tokenURI(uint256 id) public pure override returns (string memory) {
        (uint8 r, uint8 g, uint8 b) = rgb(id);

        return string.concat(
            'data:application/json;utf8,{"name":"rgb(',
            LibString.toString(r),
            ",",
            LibString.toString(g),
            ",",
            LibString.toString(b),
            ')","description":"RGB is an infinite canvas","image":"data:image/svg+xml;base64,',
            Base64.encode(bytes(SignatureRenderer.render(id))),
            '","attributes":[{"trait_type":"r","display_type":"number","max_value":255,"value":',
            LibString.toString(r),
            '},{"trait_type":"g","display_type":"number","max_value":255,"value":',
            LibString.toString(g),
            '},{"trait_type":"b","display_type":"number","max_value":255,"value":',
            LibString.toString(b),
            "}]}"
        );
    }

    function tokenId(uint8 r, uint8 g, uint8 b) public pure returns (uint256) {
        return (uint256(r) << 16) | (uint256(g) << 8) | uint256(b);
    }

    function rgb(uint256 id) public pure returns (uint8 r, uint8 g, uint8 b) {
        r = uint8((id >> 16) & 0xFF);
        g = uint8((id >> 8) & 0xFF);
        b = uint8(id & 0xFF);
    }
}
