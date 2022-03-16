// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.5.13;

contract RollOverExample {
    uint8 public myUint8;

    function descrement() public {
        myUint8--;
    }

    function increment() public {
        myUint8++;
    }
}