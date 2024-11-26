// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {LibString} from "solady/utils/LibString.sol";

library SignatureRenderer {
    function render(uint256 id) internal pure returns (string memory) {
        bool[24] memory binary = toBinary(id);
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
                    color = "white";
                    centerColor = "black";
                } else {
                    color = binary[index] ? "black" : "white";
                    centerColor = row == col && row != 3 ? (binary[index] ? "white" : "black") : color;
                }

                result = string.concat(result, renderSquare(row, col, color, centerColor));
            }
        }

        return string.concat(result, "</svg>");
    }

    function renderSquare(uint8 outerRow, uint8 outerCol, string memory color, string memory centerColor)
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
                    LibString.toString(outerCol * 3 + col),
                    '" y="',
                    LibString.toString(outerRow * 3 + row),
                    '" width="1" height="1" fill="',
                    fill,
                    '" />'
                );
            }
        }

        return result;
    }

    function toBinary(uint256 id) internal pure returns (bool[24] memory binary) {
        for (uint8 i = 0; i < 24; i++) {
            binary[23 - i] = (id & 1 == 1) ? true : false;
            id >>= 1;
        }
    }
}
