var MyToken = artifacts.require("MyToken.sol");
var MyTokenSale = artifacts.require("MyTokenSale.sol");
var KycContract = artifacts.require("KycContract.sol");

require('dotenv').config({path: '../.env'});
const chai = require("./setup_chai.js");

const BN = web3.utils.BN;
const expect = chai.expect;

contract("MyTokenSale test", async (accounts) => {

    const [ deployerAccount, anotherAccount ] = accounts;
    
    it("All tokens should be empty in first account", async () => {
        let instance = await MyToken.deployed();

        expect(await instance.balanceOf(deployerAccount)).to.be.a.bignumber.equal(new BN(0));
    });

    it("all tokens should be in the TokenSale Smart Contract by default", async () => {
        let instance = await MyToken.deployed();
        let totalSupply = await instance.totalSupply();

        let balanceOfTokenSaleSC = await instance.balanceOf(MyTokenSale.address);

        await expect(balanceOfTokenSaleSC).to.be.a.bignumber.equal(totalSupply);
    });

    it("can't possible to buy one token if you're not in whitelist", async () => {
        let instance = await MyToken.deployed();
        let tokenSaleInstance = await MyTokenSale.deployed();

        let balanceBefore = await instance.balanceOf.call(anotherAccount);

        await expect(tokenSaleInstance.sendTransaction({from: anotherAccount,value: web3.utils.toWei("1","wei")})).to.be.rejected;

        await expect(balanceBefore).to.be.bignumber.equal(await instance.balanceOf.call(anotherAccount));
    });

    it("should be possible to buy one token by simply sending ether to the smart contract after adding to whitelist", async () => {
        let instance = await MyToken.deployed();
        let tokenSaleInstance = await MyTokenSale.deployed();

        let balanceBefore = await instance.balanceOf.call(anotherAccount);

        let KycContractInstance = await KycContract.deployed();
        await KycContractInstance.setKyc(anotherAccount);

        await expect(tokenSaleInstance.sendTransaction({from: anotherAccount,value: web3.utils.toWei("1","wei")})).to.be.fulfilled;

        await expect(balanceBefore.add(new BN(1))).to.be.a.bignumber.equal(await instance.balanceOf.call(anotherAccount));
    });
})
