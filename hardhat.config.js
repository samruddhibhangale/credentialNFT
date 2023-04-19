require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("@openzeppelin/hardhat-upgrades");
require("dotenv").config();
const IPFS = require("ipfs-http-client");
const { projectId, mnemonic, infuraApiKey, etherscanApiKey } = require("./secrets.json");

const ipfs = new IPFS({ host: "ipfs.infura.io", port: 5001, protocol: "https" });

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    compilers: [{ version: "0.8.7", settings: {} }],
  },
  networks: {
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${infuraApiKey}`,
      accounts: { mnemonic: mnemonic },
    },
  },
  etherscan: {
    apiKey: etherscanApiKey,
  },
  ipfs: {
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
  },
  mocha: {
    timeout: 0,
  },
  paths: {
    artifacts: "./artifacts",
  },
  solidity: {
    version: "0.8.7",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${infuraApiKey}`,
      accounts: { mnemonic: mnemonic },
    },
  },
  namedAccounts: {
    deployer: 0,
  },
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
  },
  ipfs: {
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    getUrl: async () => {
      return `https://ipfs.infura.io:5001/api/v0/`;
    },
    ipfsClient: ipfs,
  },
};
