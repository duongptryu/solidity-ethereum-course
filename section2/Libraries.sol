// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.5.13;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.3.0/contracts/math/SafeMath.sol";

contract LibrariesExample {
    mapping(address => uint) public tokenBalance; 

    using SafeMath for uint;
    
    constructor() public {
        // tokenBalance[msg.sender] = 1; 
        tokenBalance[msg.sender] = tokenBalance[msg.sender].add(1);
    }

    function sendToken(address _to, uint _amount) public returns(bool) {
        // tokenBalance[msg.sender] -= _amount; 
        // tokenBalance[_to] += _amount;

        tokenBalance[msg.sender] = tokenBalance[msg.sender].sub(_amount);
        tokenBalance[_to] = tokenBalance[_to].add(_amount);

        return true;
    }
}