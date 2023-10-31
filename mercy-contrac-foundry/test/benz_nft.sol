// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import {BenzToken} from "../src/benz_nft.sol";

contract BenzNFTest is Test {
    BenzToken benzNFT;

    address alice = 0x70997970C51812dc3A010C7d01b50e0d17dc79C8;
    address bob = 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC;
    string[] tokenURIs = new string[](2);

    function setUp() public {
        vm.prank(alice);
        string[] memory tokenURIs = new string[](2);

        tokenURIs[
            0
        ] = "https://ipfs.io/ipfs/QmQN7BUhheQhae4atFcmTMCmrfoheK6B8KYNydEdoSkvcY";
        tokenURIs[
            1
        ] = "https://ipfs.io/ipfs/QmdZtw4X5w5z28x9gCETqW9ifcjPAw995ksquRrrHW1ddw";

        benzNFT = new BenzToken(1698219178, 1698651178);
    }

    // function testMint() public {
    //     vm.startPrank(alice);
    //     tokenURIs[
    //         0
    //     ] = "https://ipfs.io/ipfs/QmQN7BUhheQhae4atFcmTMCmrfoheK6B8KYNydEdoSkvcY";
    //     payable(alice).transfer(1 ether);
    //     benzNFT.payToMint(alice, tokenURIs[0]);
    //     // payable(alice).transfer(1 ether);s

    //     assertEq(benzNFT.ownerOf(1), alice);
    //     vm.stopPrank();
    // }
}
