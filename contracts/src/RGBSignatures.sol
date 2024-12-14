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
    string public constant description = "16,777,216 onchain rgb values";
    uint256 public mintCost;
    uint256 public randomMintCost;
    address payable public feeRecipient;
    bytes32 public merkleRoot;
    mapping(address minter => bool claimed) public allowlistClaimed;

    event Mint(uint256 indexed id, address minter, uint256 genesis, uint256 timestamp);

    error InsufficientFunds(uint256 cost, uint256 value);
    error AllowlistInvalidProof();
    error AllowlistAlreadyClaimed(address minter);
    error FeeTransferFailed();

    constructor(
        address owner,
        uint256 mintCost_,
        uint256 randomMintCost_,
        address payable feeRecipient_,
        bytes32 merkleRoot_
    ) ERC721("RGB", "RGB") Ownable(owner) {
        mintCost = mintCost_;
        randomMintCost = randomMintCost_;
        feeRecipient = feeRecipient_;
        merkleRoot = merkleRoot_;
    }

    function mint(uint8 r, uint8 g, uint8 b) external payable returns (uint256 id) {
        if (msg.value < mintCost) revert InsufficientFunds(mintCost, msg.value);

        id = _mintSignature(r, g, b, msg.sender, msg.sender);
        _transferFees();
    }

    function mintRandom(uint8 amount) external payable returns (uint256[] memory ids) {
        if (msg.value < randomMintCost * amount) {
            revert InsufficientFunds(randomMintCost * amount, msg.value);
        }

        ids = new uint256[](amount);
        for (uint8 i = 0; i < amount; i++) {
            (uint8 r, uint8 g, uint8 b) = _generateRandomRGB(i);
            ids[i] = _mintSignature(r, g, b, msg.sender, msg.sender);
        }

        _transferFees();
    }

    function allowlistMint(bytes32[] calldata merkleProof) external returns (uint256 id) {
        bytes32 leaf = keccak256(bytes.concat(keccak256(abi.encode(msg.sender))));
        if (!MerkleProof.verifyCalldata(merkleProof, merkleRoot, leaf)) {
            revert AllowlistInvalidProof();
        }
        if (allowlistClaimed[msg.sender]) {
            revert AllowlistAlreadyClaimed(msg.sender);
        }

        allowlistClaimed[msg.sender] = true;

        (uint8 r, uint8 g, uint8 b) = _generateRandomRGB(0);
        return _mintSignature(r, g, b, msg.sender, msg.sender);
    }

    function adminMint(uint8 r, uint8 g, uint8 b, address recipient) external onlyOwner returns (uint256 id) {
        return _mintSignature(r, g, b, msg.sender, recipient);
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

    function contractURI() public view returns (string memory) {
        return string.concat(
            'data:application/json;utf8,{"name":"',
            name(),
            '","description":"',
            description,
            '","image":"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwMCIgaGVpZ2h0PSIxMDAwIiB2aWV3Qm94PSIwIDAgMTAwMCAxMDAwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAwIiBoZWlnaHQ9IjEwMDAiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMjUwIiB5PSIzNTAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjMDBGRjAwIi8+PHJlY3QgeD0iMjUwIiB5PSI0NTAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjMDBGRjAwIi8+PHJlY3QgeD0iMjUwIiB5PSI1NTAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjMDBGRjAwIi8+PHJlY3QgeD0iMjUwIiB5PSI2NTAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjMDBGRjAwIi8+PHJlY3QgeD0iMzUwIiB5PSIyNTAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRkYwMDAwIi8+PHJlY3QgeD0iMzUwIiB5PSI0NTAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjMDAwMEZGIi8+PHJlY3QgeD0iMzUwIiB5PSI1NTAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjMDAwMEZGIi8+PHJlY3QgeD0iMzUwIiB5PSI2NTAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjMDBGRjAwIi8+PHJlY3QgeD0iNDUwIiB5PSIyNTAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRkYwMDAwIi8+PHJlY3QgeD0iNDUwIiB5PSIzNTAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjMDAwMEZGIi8+PHJlY3QgeD0iNDUwIiB5PSI1NTAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjMDAwMEZGIi8+PHJlY3QgeD0iNDUwIiB5PSI2NTAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjMDBGRjAwIi8+PHJlY3QgeD0iNTUwIiB5PSIyNTAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRkYwMDAwIi8+PHJlY3QgeD0iNTUwIiB5PSIzNTAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjMDAwMEZGIi8+PHJlY3QgeD0iNTUwIiB5PSI0NTAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjMDAwMEZGIi8+PHJlY3QgeD0iNTUwIiB5PSI1NTAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjMDAwMEZGIi8+PHJlY3QgeD0iNTUwIiB5PSI2NTAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjMDBGRjAwIi8+PHJlY3QgeD0iNjUwIiB5PSIyNTAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRkYwMDAwIi8+PHJlY3QgeD0iNjUwIiB5PSIzNTAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRkYwMDAwIi8+PHJlY3QgeD0iNjUwIiB5PSI0NTAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRkYwMDAwIi8+PHJlY3QgeD0iNjUwIiB5PSI1NTAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRkYwMDAwIi8+PC9zdmc+","banner_image":"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQwMCIgaGVpZ2h0PSIzNTAiIHZpZXdCb3g9IjAgMCAxNDAwIDM1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTQwMCIgaGVpZ2h0PSIzNTAiIGZpbGw9IndoaXRlIi8+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik01MTIgMTE1SDUzNlYxMzlINTEyVjExNVpNNTM2IDExNUg1NjBWMTM5SDUzNlYxMTVaTTU2MCAxMzlINTM2VjE2M0g1NjBWMTM5Wk00ODggMTM5SDUxMlYxNjNMNTEyIDE2M1YxODYuOTk4VjE4N1YyMTAuOTk4SDQ4OFYxODdWMTg2Ljk5OFYxNjNMNDg4IDE2M1YxMzlaTTUzNiAxNjNINTEyVjE4Ni45OThWMTg3VjIxMC45OThINTM2VjE4N1YxODYuOTk4VjE2M1pNNTM2IDE4Ni45OThINTYwVjIxMC45OThINTM2VjE4Ni45OThaTTUxMiAyMTFINTM2VjIzNUg1MTJWMjExWk01NjAgMjExSDUzNlYyMzVINTYwVjIxMVpNNDg4IDIxMUg1MTJWMjM1SDQ4OFYyMTFaTTYwOCAxMTVINTg0VjEzOUg2MDhWMTE1Wk01NjAgMTE1SDU4NFYxMzlINTYwVjExNVpNNjA4IDEzOUg1ODRWMTYzVjE2M1YxODYuOTk4VjE4N1YyMTAuOTk4SDYwOFYxODdWMTg2Ljk5OFYxNjNWMTYzVjEzOVpNNTYwIDEzOUg1ODRWMTYzVjE2M1YxODYuOTk4VjE4N1YyMTAuOTk4SDU2MFYxODdWMTg2Ljk5OFYxNjNWMTYzVjEzOVpNNTg0IDIxMUg1NjBWMjM1SDU4NFYyMTFaIiBmaWxsPSIjRkYwMDAwIi8+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik02NjQgMTE1SDY4OFYxMzlINjY0VjExNVpNNjg4IDExNUg3MTJWMTM5SDY4OFYxMTVaTTcxMiAxMzlINjg4VjE2M0g3MTJWMTM5Wk02NDAgMTM5SDY2NFYxNjNMNjY0IDE2M1YxODYuOTk4VjE4N1YyMTAuOTk4SDY0MFYxODdWMTg2Ljk5OFYxNjNMNjQwIDE2M1YxMzlaTTY4OCAxNjNINjY0VjE4Ni45OThWMTg3VjIxMC45OThINjg4VjE4N1YxODYuOTk4VjE2M1pNNjg4IDE4Ni45OThINzEyVjIxMC45OThINjg4VjE4Ni45OThaTTY2NCAyMTFINjg4VjIzNUg2NjRWMjExWk03MTIgMjExSDY4OFYyMzVINzEyVjIxMVpNNjQwIDIxMUg2NjRWMjM1SDY0MFYyMTFaTTc2MCAxMTVINzM2VjEzOUg3NjBWMTE1Wk03MTIgMTE1SDczNlYxMzlINzEyVjExNVpNNzYwIDEzOUg3MzZWMTYzVjE2M1YxODYuOTk4VjE4N1YyMTAuOTk4SDc2MFYxODdWMTg2Ljk5OFYxNjNWMTYzVjEzOVpNNzEyIDEzOUg3MzZWMTYzTDczNiAxODYuOTk4VjE4N1YyMTAuOTk4SDcxMlYxODdWMTg2Ljk5OFYxNjNMNzEyIDEzOVpNNzM2IDIxMUg3MTJWMjM1SDczNlYyMTFaIiBmaWxsPSIjMDBGRjAwIi8+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik04MTYgMTE1SDg0MFYxMzlIODE2VjExNVpNODQwIDExNUg4NjRWMTM5SDg0MFYxMTVaTTg2NCAxMzlIODQwVjE2M0g4NjRWMTM5Wk03OTIgMTM5SDgxNlYxNjNMODE2IDE2M1YxODYuOTk4VjE4N1YyMTAuOTk4SDc5MlYxODdWMTg2Ljk5OFYxNjNMNzkyIDE2M1YxMzlaTTg0MCAxNjNIODE2VjE4Ni45OThWMTg3VjIxMC45OThIODQwVjE4N1YxODYuOTk4VjE2M1pNODQwIDE4Ni45OThIODY0VjIxMC45OThIODQwVjE4Ni45OThaTTgxNiAyMTFIODQwVjIzNUg4MTZWMjExWk04NjQgMjExSDg0MFYyMzVIODY0VjIxMVpNNzkyIDIxMUg4MTZWMjM1SDc5MlYyMTFaTTkxMiAxMTVIODg4VjEzOUg5MTJWMTE1Wk04NjQgMTE1SDg4OFYxMzlIODY0VjExNVpNOTEyIDEzOUg4ODhWMTYzVjE2M1YxODYuOTk4VjE4N1YyMTAuOTk4SDkxMlYxODdWMTg2Ljk5OFYxNjNWMTYzVjEzOVpNODY0IDEzOUg4ODhWMTYzVjE2M1YxODYuOTk4VjE4N1YyMTAuOTk4SDg2NFYxODdWMTg2Ljk5OFYxNjNWMTYzVjEzOVpNODg4IDIxMUg4NjRWMjM1SDg4OFYyMTFaIiBmaWxsPSIjMDAwMEZGIi8+PC9zdmc+"}'
        );
    }

    function tokenURI(uint256 id) public view override returns (string memory) {
        _requireOwned(id);

        (uint8 r, uint8 g, uint8 b) = rgb(id);

        return string.concat(
            'data:application/json;utf8,{"name":"rgb(',
            Strings.toString(r),
            ",",
            Strings.toString(g),
            ",",
            Strings.toString(b),
            ')","description":"',
            description,
            '","image":"data:image/svg+xml;base64,',
            Base64.encode(bytes(_renderSignature(id))),
            '","attributes":[{"trait_type":"r","value":"',
            Strings.toString(r),
            '"},{"trait_type":"g","value":"',
            Strings.toString(g),
            '"},{"trait_type":"b","value":"',
            Strings.toString(b),
            '"}]}'
        );
    }

    function tokenId(uint8 r, uint8 g, uint8 b) public pure returns (uint256) {
        return ((uint256(r) << 16) | (uint256(g) << 8) | uint256(b)) + 1;
    }

    function rgb(uint256 id) public pure returns (uint8 r, uint8 g, uint8 b) {
        r = uint8(((id - 1) >> 16) & 0xFF);
        g = uint8(((id - 1) >> 8) & 0xFF);
        b = uint8((id - 1) & 0xFF);
    }

    function _mintSignature(uint8 r, uint8 g, uint8 b, address minter, address recipient)
        internal
        returns (uint256 id)
    {
        id = tokenId(r, g, b);
        _mint(recipient, id);
        emit Mint(id, minter, totalSupply(), block.timestamp);
    }

    function _transferFees() internal {
        (bool sent,) = feeRecipient.call{value: address(this).balance}("");
        if (!sent) revert FeeTransferFailed();
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
            binary[23 - i] = ((id - 1) & 1 == 1) ? true : false;
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
