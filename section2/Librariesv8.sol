// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol";

contract LibrariesExamplev8 {
    mapping(address => uint) public tokenBalance; 

    using SafeMath for uint;
    
    constructor() {
        // tokenBalance[msg.sender] = 1; 
        tokenBalance[msg.sender] = tokenBalance[msg.sender].add(1);
    }

    function sendToken(address _to, uint _amount) public returns(bool) {
        // tokenBalance[msg.sender] -= _amount; 
        // tokenBalance[_to] += _amount;

        tokenBalance[msg.sender] = tokenBalance[msg.sender].sub(_amount,"not enough token!!!");
        tokenBalance[_to] = tokenBalance[_to].add(_amount);
        
        return true;
    }
}