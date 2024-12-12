// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {RGBSignatures} from "../src/RGBSignatures.sol";

contract RGBSignaturesTest is Test {
    function test_tokenURI(address owner, uint256 mintCost, uint256 randomMintCost, address payable feeRecipient)
        external
    {
        vm.assume(owner != address(0) && feeRecipient != address(0));
        RGBSignatures signatures = new RGBSignatures(owner, mintCost, randomMintCost, feeRecipient);
        console.log(signatures.tokenURI(signatures.tokenId(255, 153, 0)));
    }
}
