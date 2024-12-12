// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Ownable} from "openzeppelin-contracts/contracts/access/Ownable.sol";
import {ERC721} from "openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import {ERC721Enumerable} from "openzeppelin-contracts/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import {Base64} from "openzeppelin-contracts/contracts/utils/Base64.sol";
import {Strings} from "openzeppelin-contracts/contracts/utils/Strings.sol";
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

contract RGBSignatures is ERC721Enumerable, Ownable {
    uint256 public mintCost;
    uint256 public randomMintCost;
    address payable public feeRecipient;

    event Mint(uint256 indexed id, address minter, uint256 genesis, uint256 timestamp);

    constructor(address owner, uint256 mintCost_, uint256 randomMintCost_, address payable feeRecipient_)
        ERC721("RGB Signatures", "RGB")
        Ownable(owner)
    {
        mintCost = mintCost_;
        randomMintCost = randomMintCost_;
        feeRecipient = feeRecipient_;
    }

    function mint(uint8 r, uint8 g, uint8 b) external payable returns (uint256 id) {
        require(msg.value >= mintCost, "Insufficient funds");

        id = _mintSignature(r, g, b, msg.sender);
        _transferFees();
    }

    function mintRandom(uint8 amount) external payable returns (uint256[] memory ids) {
        require(msg.value >= randomMintCost * amount, "Insufficient funds");

        ids = new uint256[](amount);
        for (uint8 i = 0; i < amount; i++) {
            uint256 random = uint256(keccak256(abi.encodePacked(block.prevrandao, msg.sender, i)));
            uint8 r = uint8(random % 256);
            uint8 g = uint8((random / 256) % 256);
            uint8 b = uint8((random / (256 * 256)) % 256);

            ids[i] = _mintSignature(r, g, b, msg.sender);
        }

        _transferFees();
    }

    function adminMint(uint8 r, uint8 g, uint8 b, address to) external onlyOwner returns (uint256 id) {
        return _mintSignature(r, g, b, to);
    }

    function setMintCosts(uint256 newMintCost, uint256 newRandomMintCost) external onlyOwner {
        mintCost = newMintCost;
        randomMintCost = newRandomMintCost;
    }

    function setFeeRecipient(address payable newFeeRecipient) external onlyOwner {
        feeRecipient = newFeeRecipient;
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
            Strings.toString(r),
            ",",
            Strings.toString(g),
            ",",
            Strings.toString(b),
            ')","description":"RGB is an infinite canvas","image":"data:image/svg+xml;base64,',
            Base64.encode(bytes(SignatureRenderer.render(id))),
            '","attributes":[{"trait_type":"r","display_type":"number","max_value":255,"value":',
            Strings.toString(r),
            '},{"trait_type":"g","display_type":"number","max_value":255,"value":',
            Strings.toString(g),
            '},{"trait_type":"b","display_type":"number","max_value":255,"value":',
            Strings.toString(b),
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

    function _mintSignature(uint8 r, uint8 g, uint8 b, address to) internal returns (uint256 id) {
        id = tokenId(r, g, b);
        _mint(to, id);
        emit Mint(id, to, totalSupply(), block.timestamp);
    }

    function _transferFees() internal {
        (bool sent,) = feeRecipient.call{value: address(this).balance}("");
        require(sent, "Failed to transfer fees");
    }
}
