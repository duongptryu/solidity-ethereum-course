// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.0;

contract RollOverExamplev8 {
    uint8 public myUint8;

    function descrement() public {
        unchecked {
            myUint8--;
        }
    }

    function increment() public {
        unchecked {
            myUint8++;
        }
    }
}