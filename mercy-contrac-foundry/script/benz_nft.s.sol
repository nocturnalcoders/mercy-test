// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import "../src/benz_nft.sol";

contract BenzNftScript is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        string[] memory tokenURIs = new string[](2);

        tokenURIs[
            0
        ] = "https://ipfs.io/ipfs/QmQN7BUhheQhae4atFcmTMCmrfoheK6B8KYNydEdoSkvcY";
        tokenURIs[
            1
        ] = "https://ipfs.io/ipfs/QmdZtw4X5w5z28x9gCETqW9ifcjPAw995ksquRrrHW1ddw";

        new BenzToken(1698478379, 1698564778);

        vm.stopBroadcast();
    }
}
