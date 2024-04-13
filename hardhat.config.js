require("@nomicfoundation/hardhat-toolbox");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
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
      url: `https://polygon-amoy.g.alchemy.com/v2/70haACb3OPDpO29h1rDu-XyFs0wkvcZ2`, 
      accounts: ['29a658d6f8810d72015d17fe2de618847e5a2c085afe97fb5a060521daa83d8f'] 
    }
  },
};
