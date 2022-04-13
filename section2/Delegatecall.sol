//SPDX-License-Identifier: MIT

pragma solidity ^0.5.13;

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

contract B2 {
    uint public num;
    address public sender;
    uint public value;

    function setNewValue(uint _newNum) public payable {
         num = _newNum * 2;
        sender = msg.sender;
        value = msg.value;
    }
}

contract A {
    uint public num;
    address public sender;
    uint public value;

    function setNewValue(address _contract,uint _newNum) public payable {
         (bool success,) = _contract.delegatecall(
            abi.encodeWithSignature("setNewValue(uint256)",_newNum)
        );
        require(success, "transaction failed");
    }

    function normalCall(address _contract,uint _newNum) public payable {
        B(_contract).setNewValue(_newNum);
        sender = msg.sender;
    }
}