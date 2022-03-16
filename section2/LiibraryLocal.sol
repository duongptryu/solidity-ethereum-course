// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.5.13;

library MathLib {
    function multiply(uint a, uint b) public view returns(uint, address){
        return (a * b, address(this));
    }
}

contract LibraryLocal {
    mapping(address => uint) public tokenBalance; 
    address public owner = address(this);

    using MathLib for uint;
    
    function multiplyExample(uint _a, uint _b) public view returns(uint, address){
        return _a.multiply(_b);
    }
}