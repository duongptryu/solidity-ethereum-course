// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.1;

contract BoolExample {
    bool public myBool;

    function setNewValue(bool _myBool) public {
        myBool = _myBool;
    }

    function negateBool() public {
        myBool = !myBool;
    }

    function retrieve() public view returns (bool) {
        return myBool;
    }
}