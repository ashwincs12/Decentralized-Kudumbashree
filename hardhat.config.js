require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const HOLESKY_URL = process.env.HOLESKY_URL;
const AMOY_URL = process.env.AMOY_URL;
const PRIVATE_URL = process.env.PRIVATE_KEY;

module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200 // Adjust the number of optimization runs as needed
      }
    }
  },
  networks: {
    amoy: {
      url: AMOY_URL, 
      accounts: [PRIVATE_URL] 
    },
    holesky: {
      url: HOLESKY_URL, 
      accounts: [PRIVATE_URL] 
    }
  },
};
