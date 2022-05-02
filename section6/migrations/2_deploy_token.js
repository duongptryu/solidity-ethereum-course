var MyToken = artifacts.require("MyToken.sol");
var MyTokenSale = artifacts.require("MyTokenSale.sol");

module.exports = async function(deployer) {
  console.log(deployer);
  let addr = await web3.eth.getAccounts();

  await deployer.deploy(MyToken,1000000000);
  await deployer.deploy(MyTokenSale,1, addr[0],MyToken.address);

  let tokenInstance = await MyToken.deployed();
  let balanceOfMTSBefore = await tokenInstance.balanceOf(MyTokenSale.address);
  let balanceOfDeployerBefore = await tokenInstance.balanceOf(addr[0]);

  console.log('------before transfer-----');
  
  console.log('balanceOfMTSBefore',balanceOfMTSBefore.toString());
  console.log('balanceOfDeployerBefore',balanceOfDeployerBefore.toString());

  console.log('----------------------');

  await tokenInstance.transfer(MyTokenSale.address,1000000000);
  
  let balanceOfMTSAfter = await tokenInstance.balanceOf(MyTokenSale.address);
  let balanceOfDeployerAfter = await tokenInstance.balanceOf(addr[0]);

  console.log('------after transfer-----');
  
  console.log('balanceOfMTSAfter',balanceOfMTSAfter.toString());
  console.log('balanceOfDeployerAfter',balanceOfDeployerAfter.toString());
};
