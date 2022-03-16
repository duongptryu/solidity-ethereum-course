// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.5.13;

contract FunctionsExample {
    
    mapping(address => uint) public balanceReceived;

    address payable owner;

    constructor() public {
        owner = msg.sender;
    }

    function getOwner() public view returns(address){
        return owner;
    }

    function convertWeiToEther(uint _amountOfWei) public pure returns (uint){
        return _amountOfWei / 1 ether;
    }

    function receiveMoney() public payable{
        assert(balanceReceived[msg.sender] + msg.value >= balanceReceived[msg.sender]);
        balanceReceived[msg.sender] += msg.value;
    }

    function withdrawMoney(address payable _to, uint _amount) public {
        require(balanceReceived[msg.sender] >= _amount, "You don't have enough ether!");

        balanceReceived[msg.sender] -= _amount;
        _to.transfer(_amount);
    }

    function() external payable {
       receiveMoney(); 
    } 
}