// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {Ownable} from "openzeppelin-contracts/contracts/access/Ownable.sol";
import {IERC721Errors} from "openzeppelin-contracts/contracts/interfaces/draft-IERC6093.sol";
import {EtherReceiverMock} from "openzeppelin-contracts/contracts/mocks/EtherReceiverMock.sol";
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
        assertEq(signatures.ownerOf(id), address(this));
        assertEq(feeRecipient.balance, mintCost);
    }

    function testFuzz_Mint(uint256 mintCost, uint8 r, uint8 g, uint8 b) external {
        address payable feeRecipient = payable(makeAddr("feeRecipient"));

        RGBSignatures signatures = new RGBSignatures(makeAddr("owner"), mintCost, 0.001 ether, feeRecipient, bytes32(0));

        uint256 expectedId = signatures.tokenId(r, g, b);

        vm.expectEmit(address(signatures));
        emit RGBSignatures.Mint(expectedId, address(this), 1, block.timestamp);

        vm.deal(address(this), mintCost);
        uint256 id = signatures.mint{value: mintCost}(r, g, b);

        assertEq(id, expectedId);
        assertEq(signatures.ownerOf(expectedId), address(this));
        assertEq(feeRecipient.balance, mintCost);
    }

    function test_CannotMintIfAlreadyMinted() external {
        uint256 mintCost = 0.004 ether;
        RGBSignatures signatures =
            new RGBSignatures(makeAddr("owner"), mintCost, 0.001 ether, payable(makeAddr("feeRecipient")), bytes32(0));

        vm.deal(address(this), mintCost);
        signatures.mint{value: mintCost}(255, 153, 0);

        vm.expectRevert(abi.encodeWithSelector(IERC721Errors.ERC721InvalidSender.selector, address(0)));
        vm.deal(address(this), mintCost);
        signatures.mint{value: mintCost}(255, 153, 0);
    }

    function testFuzz_CannotMintWithInsufficientFunds(uint256 mintCost, uint256 value) external {
        vm.assume(value < mintCost);

        RGBSignatures signatures =
            new RGBSignatures(makeAddr("owner"), mintCost, 0.001 ether, payable(makeAddr("feeRecipient")), bytes32(0));

        vm.deal(address(this), value);
        vm.expectRevert("Insufficient funds");
        signatures.mint{value: value}(255, 153, 0);
    }

    function test_CannotMintIfFeeTransferFails() external {
        EtherReceiverMock feeRecipient = new EtherReceiverMock();
        feeRecipient.setAcceptEther(false);

        uint256 mintCost = 0.004 ether;
        RGBSignatures signatures =
            new RGBSignatures(makeAddr("owner"), mintCost, 0.001 ether, payable(address(feeRecipient)), bytes32(0));

        vm.deal(address(this), mintCost);
        vm.expectRevert("Failed to transfer fees");
        signatures.mint{value: mintCost}(255, 153, 0);
    }

    function test_MintRandom() external {
        uint256 randomMintCost = 0.001 ether;
        address payable feeRecipient = payable(makeAddr("feeRecipient"));

        RGBSignatures signatures =
            new RGBSignatures(makeAddr("owner"), 0.004 ether, randomMintCost, feeRecipient, bytes32(0));

        vm.expectEmit(false, true, true, true, address(signatures));
        emit RGBSignatures.Mint(0, address(this), 1, block.timestamp);

        vm.deal(address(this), randomMintCost);
        uint256[] memory ids = signatures.mintRandom{value: randomMintCost}(1);

        assertEq(ids.length, 1);
        assertEq(signatures.ownerOf(ids[0]), address(this));
        assertEq(feeRecipient.balance, randomMintCost);
    }

    function testFuzz_MintRandom(uint256 randomMintCost, uint8 amount) external {
        vm.assume(amount > 0 && randomMintCost <= type(uint256).max / amount);

        address payable feeRecipient = payable(makeAddr("feeRecipient"));

        RGBSignatures signatures =
            new RGBSignatures(makeAddr("owner"), 0.004 ether, randomMintCost, feeRecipient, bytes32(0));

        for (uint8 i = 0; i < amount; i++) {
            vm.expectEmit(false, true, true, true, address(signatures));
            emit RGBSignatures.Mint(0, address(this), i + 1, block.timestamp);
        }

        vm.deal(address(this), randomMintCost * amount);
        uint256[] memory ids = signatures.mintRandom{value: randomMintCost * amount}(amount);

        assertEq(ids.length, amount);
        for (uint8 i = 0; i < amount; i++) {
            assertEq(signatures.ownerOf(ids[i]), address(this));
        }
        assertEq(feeRecipient.balance, randomMintCost * amount);
    }

    function test_FuzzCannotMintRandomWithInsufficientFunds(uint256 randomMintCost, uint8 amount, uint256 value)
        external
    {
        vm.assume(amount > 0 && randomMintCost <= type(uint256).max / amount && value < randomMintCost * amount);

        RGBSignatures signatures = new RGBSignatures(
            makeAddr("owner"), 0.004 ether, randomMintCost, payable(makeAddr("feeRecipient")), bytes32(0)
        );

        vm.deal(address(this), value);
        vm.expectRevert("Insufficient funds");
        signatures.mintRandom{value: value}(amount);
    }

    function test_CannotMintRandomIfFeeTransferFails() external {
        EtherReceiverMock feeRecipient = new EtherReceiverMock();
        feeRecipient.setAcceptEther(false);

        uint256 randomMintCost = 0.001 ether;
        RGBSignatures signatures = new RGBSignatures(
            makeAddr("owner"), 0.004 ether, randomMintCost, payable(address(feeRecipient)), bytes32(0)
        );

        vm.deal(address(this), randomMintCost);
        vm.expectRevert("Failed to transfer fees");
        signatures.mintRandom{value: randomMintCost}(1);
    }

    function test_AllowlistMint() external {
        address minter = 0x0000000000000000000000000000000000000001;
        RGBSignatures signatures = new RGBSignatures(
            makeAddr("owner"),
            0.004 ether,
            0.001 ether,
            payable(makeAddr("feeRecipient")),
            // Merkle tree from [address(1), ..., address(5)]
            0x21abd2f655ded75d91fbd5e0b1ad35171a675fd315a077efa7f2d555a26e7094
        );

        vm.expectEmit(false, true, true, true, address(signatures));
        emit RGBSignatures.Mint(0, minter, 1, block.timestamp);

        // Merkle proof for address(1)
        bytes32[] memory merkleProof = new bytes32[](2);
        merkleProof[0] = 0x2584db4a68aa8b172f70bc04e2e74541617c003374de6eb4b295e823e5beab01;
        merkleProof[1] = 0xc949c2dc5da2bd9a4f5ae27532dfbb3551487bed50825cd099ff5d0a8d613ab5;
        vm.prank(minter);
        uint256 id = signatures.allowlistMint(merkleProof);

        assertEq(signatures.ownerOf(id), minter);
        assertTrue(signatures.allowlistClaimed(minter));
    }

    function test_CannotAllowlistMintWithInvalidProof(bytes32[] calldata merkleProof) external {
        RGBSignatures signatures = new RGBSignatures(
            makeAddr("owner"), 0.004 ether, 0.001 ether, payable(makeAddr("feeRecipient")), bytes32(0)
        );

        vm.expectRevert("Invalid proof");
        signatures.allowlistMint(merkleProof);
    }

    function test_CannotAllowlistMintTwice() external {
        address minter = 0x0000000000000000000000000000000000000001;
        RGBSignatures signatures = new RGBSignatures(
            makeAddr("owner"),
            0.004 ether,
            0.001 ether,
            payable(makeAddr("feeRecipient")),
            // Merkle tree from [address(1), ..., address(5)]
            0x21abd2f655ded75d91fbd5e0b1ad35171a675fd315a077efa7f2d555a26e7094
        );

        // Merkle proof for address(1)
        bytes32[] memory merkleProof = new bytes32[](2);
        merkleProof[0] = 0x2584db4a68aa8b172f70bc04e2e74541617c003374de6eb4b295e823e5beab01;
        merkleProof[1] = 0xc949c2dc5da2bd9a4f5ae27532dfbb3551487bed50825cd099ff5d0a8d613ab5;
        vm.prank(minter);
        signatures.allowlistMint(merkleProof);

        vm.expectRevert("Already claimed");
        vm.prank(minter);
        signatures.allowlistMint(merkleProof);
    }

    function test_AdminMint() external {
        address owner = makeAddr("owner");
        address recipient = makeAddr("recipient");
        RGBSignatures signatures =
            new RGBSignatures(owner, 0.004 ether, 0.001 ether, payable(makeAddr("feeRecipient")), bytes32(0));

        uint256 expectedId = 16750848;

        vm.expectEmit(address(signatures));
        emit RGBSignatures.Mint(expectedId, owner, 1, block.timestamp);

        vm.prank(owner);
        uint256 id = signatures.adminMint(255, 153, 0, recipient);

        assertEq(id, expectedId);
        assertEq(signatures.ownerOf(id), address(recipient));
    }

    function testFuzz_CannotAdminMintAsNonOwner(address owner, address nonOwner) external {
        vm.assume(owner != address(0) && owner != nonOwner);

        RGBSignatures signatures =
            new RGBSignatures(owner, 0.004 ether, 0.001 ether, payable(makeAddr("feeRecipient")), bytes32(0));

        vm.expectRevert(abi.encodeWithSelector(Ownable.OwnableUnauthorizedAccount.selector, nonOwner));
        vm.prank(nonOwner);
        signatures.adminMint(255, 153, 0, makeAddr("recipient"));
    }

    function test_SetMintCosts(uint256 newMintCost, uint256 newRandomMintCost) external {
        RGBSignatures signatures =
            new RGBSignatures(address(this), 0.004 ether, 0.001 ether, payable(makeAddr("feeRecipient")), bytes32(0));

        signatures.setMintCosts(newMintCost, newRandomMintCost);

        vm.assertEq(signatures.mintCost(), newMintCost);
        vm.assertEq(signatures.randomMintCost(), newRandomMintCost);
    }

    function test_CannotSetMintCostsAsNonOwner(
        address owner,
        address nonOwner,
        uint256 newMintCost,
        uint256 newRandomMintCost
    ) external {
        vm.assume(owner != address(0) && owner != nonOwner);

        RGBSignatures signatures =
            new RGBSignatures(owner, 0.004 ether, 0.001 ether, payable(makeAddr("feeRecipient")), bytes32(0));

        vm.expectRevert(abi.encodeWithSelector(Ownable.OwnableUnauthorizedAccount.selector, nonOwner));
        vm.prank(nonOwner);
        signatures.setMintCosts(newMintCost, newRandomMintCost);
    }

    function test_SetFeeRecipient(address payable newFeeRecipient) external {
        RGBSignatures signatures =
            new RGBSignatures(address(this), 0.004 ether, 0.001 ether, payable(makeAddr("feeRecipient")), bytes32(0));

        signatures.setFeeRecipient(newFeeRecipient);

        vm.assertEq(signatures.feeRecipient(), newFeeRecipient);
    }

    function test_CannotSetFeeRecipientAsNonOwner(address owner, address nonOwner, address payable newFeeRecipient)
        external
    {
        vm.assume(owner != address(0) && owner != nonOwner);

        RGBSignatures signatures =
            new RGBSignatures(owner, 0.004 ether, 0.001 ether, payable(makeAddr("feeRecipient")), bytes32(0));

        vm.expectRevert(abi.encodeWithSelector(Ownable.OwnableUnauthorizedAccount.selector, nonOwner));
        vm.prank(nonOwner);
        signatures.setFeeRecipient(newFeeRecipient);
    }

    function test_SetMerkleRoot(bytes32 newMerkleRoot) external {
        RGBSignatures signatures =
            new RGBSignatures(address(this), 0.004 ether, 0.001 ether, payable(makeAddr("feeRecipient")), bytes32(0));

        signatures.setMerkleRoot(newMerkleRoot);

        vm.assertEq(signatures.merkleRoot(), newMerkleRoot);
    }

    function test_CannotSetMerkleRootAsNonOwner(address owner, address nonOwner, bytes32 newMerkleRoot) external {
        vm.assume(owner != address(0) && owner != nonOwner);

        RGBSignatures signatures =
            new RGBSignatures(owner, 0.004 ether, 0.001 ether, payable(makeAddr("feeRecipient")), bytes32(0));

        vm.expectRevert(abi.encodeWithSelector(Ownable.OwnableUnauthorizedAccount.selector, nonOwner));
        vm.prank(nonOwner);
        signatures.setMerkleRoot(newMerkleRoot);
    }

    function test_ContractURI() external {
        RGBSignatures signatures = new RGBSignatures(
            makeAddr("owner"), 0.004 ether, 0.001 ether, payable(makeAddr("feeRecipient")), bytes32(0)
        );

        signatures.contractURI();

        // TODO: assertions
    }

    function test_TokenURI() external {
        RGBSignatures signatures =
            new RGBSignatures(address(this), 0.004 ether, 0.001 ether, payable(makeAddr("feeRecipient")), bytes32(0));

        uint256 id = signatures.adminMint(255, 153, 0, address(this));

        signatures.tokenURI(id);

        // TODO: assertions
    }

    function test_CannotCallTokenURIWithUnmintedId() external {
        RGBSignatures signatures = new RGBSignatures(
            makeAddr("owner"), 0.004 ether, 0.001 ether, payable(makeAddr("feeRecipient")), bytes32(0)
        );

        vm.expectRevert(abi.encodeWithSelector(IERC721Errors.ERC721NonexistentToken.selector, 0));
        signatures.tokenURI(0);
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
