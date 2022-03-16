// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.1;

contract StringExample {
    string public myStr = "hello 200Lab Education";

    function setNewValue(string memory _mystring) public {
        myStr = _mystring;
    }
}