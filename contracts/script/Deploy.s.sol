// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {RGBSignatures} from "src/RGBSignatures.sol";

contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("DEPLOYER_PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        new RGBSignatures{salt: 0xf3e2399c5d1c698a6c1dfa195adbd12a6afd1899caea6f74733f40e69ac87b7c}(
            0x000000005d5Bd1cC7fF80ddCd46F245beC548EdF,
            0.004 ether,
            0.001 ether,
            payable(0xcdf5228c53998d24176Bea664c11dFFE7b401d19),
            bytes32(0) // TODO
        );

        vm.stopBroadcast();
    }
}
