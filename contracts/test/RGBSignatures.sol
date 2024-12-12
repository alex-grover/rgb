// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {RGBSignatures} from "../src/RGBSignatures.sol";

contract RGBSignaturesTest is Test {
    function test_tokenURI(address payable feeRecipient) external {
        vm.assume(feeRecipient != address(0));
        RGBSignatures signatures = new RGBSignatures(0.004 ether, 0.001 ether, feeRecipient);
        console.log(signatures.tokenURI(signatures.tokenId(255, 153, 0)));
    }
}
