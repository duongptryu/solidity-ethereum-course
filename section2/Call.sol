//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract B {
    uint public num;
    address public sender;
    uint public value;

    function setNewValue(uint _newNum) public payable {
        num = _newNum;
        sender = msg.sender;
        value = msg.value;
    }
}

contract A {
    uint public num;
    address public sender;
    uint public value;

    function setNewValue(address _contract,uint _newNum) public payable {
        B(_contract).setNewValue(_newNum);
        sender = msg.sender;
        value = msg.value;
    }
}