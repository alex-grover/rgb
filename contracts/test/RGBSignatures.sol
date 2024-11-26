// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {RGBSignatures} from "../src/RGBSignatures.sol";

contract RGBSignaturesTest is Test {
    function test_tokenURI() external {
        RGBSignatures signatures = new RGBSignatures();
        console.log(signatures.tokenURI(signatures.tokenId(255, 153, 0)));
    }
}
