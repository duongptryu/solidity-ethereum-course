var MyToken = artifacts.require("MyToken.sol");

var chai = require("chai");
const BN = web3.utils.BN;
const chaiBN = require('chai-bn')(BN);
chai.use(chaiBN);

var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const expect = chai.expect;

contract("MyToken test", async (accounts) => {

    const [ deployerAccount, anotherAccount ] = accounts;

    // Hook function
    beforeEach(async() => {
        this.myToken = await MyToken.new(1000000000);
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