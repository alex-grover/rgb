// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {RGBSignatures} from "src/RGBSignatures.sol";

contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("DEPLOYER_PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);

        vm.startBroadcast(deployerPrivateKey);

        RGBSignatures signatures = new RGBSignatures{
            salt: 0xf3e2399c5d1c698a6c1dfa195adbd12a6afd189927ce9148bb3ce1cf806acecf
        }(
            deployer,
            0.004 ether,
            0.001 ether,
            payable(0xcdf5228c53998d24176Bea664c11dFFE7b401d19),
            0xc1b5e21037602577a7c1df76cca738965a6c40c5d1022309c27b43b3caa6db52
        );

        signatures.adminMint(0, 0, 0, deployer);
        signatures.adminMint(255, 255, 255, deployer);
        signatures.adminMint(255, 0, 0, deployer);
        signatures.adminMint(0, 255, 0, deployer);
        signatures.adminMint(0, 0, 255, deployer);
        signatures.adminMint(0, 255, 255, deployer);
        signatures.adminMint(255, 0, 255, deployer);
        signatures.adminMint(255, 255, 0, deployer);
        signatures.adminMint(
            85,
            85,
            85,
            0xD6507fC98605eAb8775f851c25A5E09Dc12ab7A7
        );

        signatures.transferOwnership(
            0x000000005d5Bd1cC7fF80ddCd46F245beC548EdF
        );

        vm.stopBroadcast();
    }
}
