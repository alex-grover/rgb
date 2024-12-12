// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Ownable} from "openzeppelin-contracts/contracts/access/Ownable.sol";
import {ERC721} from "openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import {ERC721Enumerable} from "openzeppelin-contracts/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import {Base64} from "openzeppelin-contracts/contracts/utils/Base64.sol";
import {MerkleProof} from "openzeppelin-contracts/contracts/utils/cryptography/MerkleProof.sol";
import {Strings} from "openzeppelin-contracts/contracts/utils/Strings.sol";

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
    bytes32 public merkleRoot;
    mapping(address minter => bool claimed) public allowlistClaimed;

    event Mint(uint256 indexed id, address minter, uint256 genesis, uint256 timestamp);

    constructor(
        address owner,
        uint256 mintCost_,
        uint256 randomMintCost_,
        address payable feeRecipient_,
        bytes32 merkleRoot_
    ) ERC721("RGB Signatures", "RGB") Ownable(owner) {
        mintCost = mintCost_;
        randomMintCost = randomMintCost_;
        feeRecipient = feeRecipient_;
        merkleRoot = merkleRoot_;
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
            (uint8 r, uint8 g, uint8 b) = _generateRandomRGB(i);
            ids[i] = _mintSignature(r, g, b, msg.sender);
        }

        _transferFees();
    }

    function allowlistMint(bytes32[] calldata merkleProof) external returns (uint256 id) {
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        require(MerkleProof.verify(merkleProof, merkleRoot, leaf), "Invalid proof");
        require(!allowlistClaimed[msg.sender], "Already claimed");

        allowlistClaimed[msg.sender] = true;

        (uint8 r, uint8 g, uint8 b) = _generateRandomRGB(0);
        return _mintSignature(r, g, b, msg.sender);
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

    function setMerkleRoot(bytes32 newMerkleRoot) external onlyOwner {
        merkleRoot = newMerkleRoot;
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
            Base64.encode(bytes(_renderSignature(id))),
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

    function _generateRandomRGB(uint8 salt) internal view returns (uint8 r, uint8 g, uint8 b) {
        uint256 random = uint256(keccak256(abi.encodePacked(block.prevrandao, msg.sender, salt)));
        r = uint8(random % 256);
        g = uint8((random / 256) % 256);
        b = uint8((random / (256 * 256)) % 256);
    }

    function _renderSignature(uint256 id) internal pure returns (string memory) {
        bool[24] memory binary;
        for (uint8 i = 0; i < 24; i++) {
            binary[23 - i] = (id & 1 == 1) ? true : false;
            id >>= 1;
        }

        uint8[5][5] memory indexes =
            [[0, 1, 2, 3, 4], [15, 16, 17, 18, 5], [14, 23, 24, 19, 6], [13, 22, 21, 20, 7], [12, 11, 10, 9, 8]];

        string memory result =
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" height="512" width="512" shape-rendering="crispEdges">';

        for (uint8 row = 0; row < 5; row++) {
            for (uint8 col = 0; col < 5; col++) {
                uint8 index = indexes[row][col];

                string memory color;
                string memory centerColor;
                if (index == 24) {
                    color = "black";
                    centerColor = "white";
                } else {
                    color = binary[index] ? "white" : "black";
                    centerColor = row == col && row != 3 ? (binary[index] ? "black" : "white") : color;
                }

                result = string.concat(result, _renderSquare(row, col, color, centerColor));
            }
        }

        return string.concat(result, "</svg>");
    }

    function _renderSquare(uint8 outerRow, uint8 outerCol, string memory color, string memory centerColor)
        internal
        pure
        returns (string memory)
    {
        string memory result = "";

        for (uint8 row = 0; row < 3; row++) {
            for (uint8 col = 0; col < 3; col++) {
                string memory fill = row == 1 && col == 1 ? centerColor : color;
                result = string.concat(
                    result,
                    '<rect x="',
                    Strings.toString(outerCol * 3 + col),
                    '" y="',
                    Strings.toString(outerRow * 3 + row),
                    '" width="1" height="1" fill="',
                    fill,
                    '" />'
                );
            }
        }

        return result;
    }
}
