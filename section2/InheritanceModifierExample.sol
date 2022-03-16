// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.5.13;

import "./Owned.sol";

/*
- Create new token.
- Give owner token.
- If you're not the owner, you would buy a token.
- Create & burn token.
- Send token.
*/

contract InheritanceModifierExample is Owned{

    mapping(address => uint256) public tokenBalance;
    // address owner;
    uint tokenPrice = 1 ether;

    constructor() public {
        // owner = msg.sender;
        tokenBalance[owner] = 100;
    }

    function createNewToken() public onlyOwner{
        tokenBalance[owner]++;
    }

    function burnToken() public onlyOwner{
        tokenBalance[owner]--;
    }

    function purchaseToken() public payable {
        require((tokenBalance[owner] * tokenPrice) / msg.value > 0, "not enough tokens");
        tokenBalance[owner] -= msg.value / tokenPrice;
        tokenBalance[msg.sender] += msg.value / tokenPrice;
    }

    function sendToken(address _to, uint256 _amount) public {
        require(tokenBalance[msg.sender] >= _amount, "not enough tokens");
        assert(tokenBalance[_to] + _amount >= tokenBalance[_to]);
        assert(tokenBalance[msg.sender] - _amount <= tokenBalance[msg.sender]);
        tokenBalance[msg.sender] -= _amount;
        tokenBalance[_to] += _amount;
    } 
}