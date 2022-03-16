// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.1;

contract AddressExample {
    address public myAddress;

    function setNewValue(address _myAddress) public {
        myAddress = _myAddress;
    }

    function getBalanceAccount() public view returns(uint) {
        return myAddress.balance;
    }
}