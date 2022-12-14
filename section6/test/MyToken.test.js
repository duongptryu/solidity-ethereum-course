var MyToken = artifacts.require("MyToken.sol");
require('dotenv').config({path: '../.env'});
const chai = require("./setup_chai.js");

const BN = web3.utils.BN;
const expect = chai.expect;

contract("MyToken test", async (accounts) => {

    const [ deployerAccount, anotherAccount ] = accounts;

    // Hook function
    beforeEach(async() => {
        this.myToken = await MyToken.new(process.env.INITIAL_TOKENS);
    })
    
    it("All tokens should be in first account", async () => {
        let instance = this.myToken;

        let totalSupply = await instance.totalSupply();

        expect(await instance.balanceOf(accounts[0])).to.be.a.bignumber.equal(totalSupply);
    });

    it("is possible to send tokens between accounts ", async () => {
        const sendToken = 1;
        let instance = await this.myToken;
        let totalSupply = await instance.totalSupply();
    
        await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
        await expect(instance.transfer(anotherAccount,sendToken)).to.eventually.be.fulfilled;
        await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendToken)));
        await expect(instance.balanceOf(anotherAccount)).to.eventually.be.a.bignumber.equal(new BN(sendToken));
    });


    it("is not possible to send more tokens than available in total", async () => {
        let instance = await this.myToken;
        let balanceOfDeployer = await instance.balanceOf(deployerAccount);
    
        await expect(instance.transfer(anotherAccount,new BN(balanceOfDeployer + 1))).to.eventually.be.rejected;
        await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceOfDeployer);
        // await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceOfDeployer.sub(new BN(1)));
    });
})