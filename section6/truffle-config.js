const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");

require('dotenv').config({path: './.env'});


module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 8545
    },
    testnet: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC, `https://data-seed-prebsc-1-s1.binance.org:8545`),
      network_id: 97,
    }
  },
  // https://trufflesuite.com/docs/truffle/reference/configuration/
  compilers: {
    solc: {
      version: "^0.8.0"
    }
  }
};
