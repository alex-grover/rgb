// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {SignatureRenderer} from "../src/SignatureRenderer.sol";

contract SignatureRendererTest is Test {
    function tokenId(uint8 r, uint8 g, uint8 b) internal pure returns (uint256) {
        return (uint256(r) << 16) | (uint256(g) << 8) | uint256(b);
    }

    function test_render() external pure {
        console.log(SignatureRenderer.render(tokenId(255, 153, 0)));
    }

    function test_toBinary() external pure {
        bool[24] memory expected = [
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            true,
            true,
            false,
            true
        ];
        bool[24] memory actual = SignatureRenderer.toBinary(13);

        for (uint8 i = 0; i < 24; i++) {
            assertEq(expected[i], actual[i]);
        }
    }
}
