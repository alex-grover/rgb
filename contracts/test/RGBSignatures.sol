// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {RGBSignatures} from "../src/RGBSignatures.sol";

contract RGBSignaturesTest is Test {
    function test_Constructor(
        address owner,
        uint256 mintCost,
        uint256 randomMintCost,
        address payable feeRecipient,
        bytes32 merkleRoot
    ) external {
        vm.assume(owner != address(0));

        RGBSignatures signatures = new RGBSignatures(owner, mintCost, randomMintCost, feeRecipient, merkleRoot);

        assertEq(signatures.owner(), owner);
        assertEq(signatures.mintCost(), mintCost);
        assertEq(signatures.randomMintCost(), randomMintCost);
        assertEq(signatures.feeRecipient(), feeRecipient);
        assertEq(signatures.merkleRoot(), merkleRoot);
    }

    function test_Mint() external {
        uint256 mintCost = 0.004 ether;
        address payable feeRecipient = payable(makeAddr("feeRecipient"));

        RGBSignatures signatures = new RGBSignatures(makeAddr("owner"), mintCost, 0.001 ether, feeRecipient, bytes32(0));

        uint256 expectedId = 16750848;

        vm.expectEmit(address(signatures));
        emit RGBSignatures.Mint(expectedId, address(this), 1, block.timestamp);

        vm.deal(address(this), mintCost);
        uint256 id = signatures.mint{value: mintCost}(255, 153, 0);

        assertEq(id, expectedId);
        assertEq(signatures.ownerOf(16750848), address(this));
        assertEq(feeRecipient.balance, mintCost);
    }

    function testFuzz_Mint() external {
        // TODO
    }

    function test_CannotMintIfAlreadyMinted() external {
        // TODO
    }

    function test_CannotMintWithInsufficientFunds() external {
        // TODO
    }

    function test_CannotMintIfFeeTransferFails() external {
        // TODO
    }

    function test_MintRandom() external {
        // TODO
    }

    function testFuzz_MintRandom() external {
        // TODO
    }

    function test_CannotMintRandomWithInsufficientFunds() external {
        // TODO
    }

    function test_CannotMintRandomIfFeeTransferFails() external {
        // TODO
    }

    function test_AllowlistMint() external {
        // TODO
    }

    function test_CannotAllowlistMintWithInvalidProof() external {
        // TODO
    }

    function test_CannotAllowlistMintTwice() external {
        // TODO
    }

    function test_AdminMint() external {
        // TODO
    }

    function test_CannotAdminMintAsNonOwner() external {
        // TODO
    }

    function test_SetMintCosts() external {
        // TODO
    }

    function test_CannotSetMintCostsAsNonOwner() external {
        // TODO
    }

    function test_SetFeeRecipient() external {
        // TODO
    }

    function test_CannotSetFeeRecipientAsNonOwner() external {
        // TODO
    }

    function test_SetMerkleRoot() external {
        // TODO
    }

    function test_CannotSetMerkleRootAsNonOwner() external {
        // TODO
    }

    function test_ContractURI() external {
        // TODO
    }

    function test_TokenURI() external {
        // TODO
    }

    function test_TokenId() external {
        RGBSignatures signatures = new RGBSignatures(
            makeAddr("owner"), 0.004 ether, 0.001 ether, payable(makeAddr("feeRecipient")), bytes32(0)
        );

        vm.assertEq(signatures.tokenId(255, 153, 0), 16750848);
    }

    function test_RGB() external {
        RGBSignatures signatures = new RGBSignatures(
            makeAddr("owner"), 0.004 ether, 0.001 ether, payable(makeAddr("feeRecipient")), bytes32(0)
        );

        (uint8 r, uint8 g, uint8 b) = signatures.rgb(16750848);
        vm.assertEq(r, 255);
        vm.assertEq(g, 153);
        vm.assertEq(b, 0);
    }
}
