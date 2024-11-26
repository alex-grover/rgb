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
    uint256 public immutable mintCost = 0.00333 ether;
    string internal constant _name = "RGB Signatures";
    string internal constant _symbol = "RGB";

    constructor() {
        _initializeOwner(msg.sender);
    }

    function mint(uint8 r, uint8 g, uint8 b) external payable {
        require(msg.value >= mintCost, "Insufficient funds");
        _mint(msg.sender, tokenId(r, g, b));
    }

    function adminMint(uint8 r, uint8 g, uint8 b, address to) external onlyOwner {
        _mint(to, tokenId(r, g, b));
    }

    function withdraw() external onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }

    function name() public pure override returns (string memory) {
        return _name;
    }

    function symbol() public pure override returns (string memory) {
        return _symbol;
    }

    function tokenURI(uint256 id) public pure override returns (string memory) {
        (uint8 r, uint8 g, uint8 b) = rgb(id);

        string memory json = string.concat(
            '{"name":"RGB Signatures","description":"RGB is an infinite canvas","image":"data:image/svg+xml;base64,',
            Base64.encode(bytes(SignatureRenderer.render(id))),
            '","attributes":[{"trait_type":"r","display_type":"number","max_value":255,"value":',
            LibString.toString(r),
            '},{"trait_type":"g","display_type":"number","max_value":255,"value":',
            LibString.toString(g),
            '},{"trait_type":"b","display_type":"number","max_value":255,"value":',
            LibString.toString(b),
            "}]}"
        );

        return string.concat("data:application/json;base64,", Base64.encode(bytes(json)));
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
