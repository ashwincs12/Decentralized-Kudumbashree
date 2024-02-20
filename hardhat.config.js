require("@nomicfoundation/hardhat-toolbox");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.24",
  networks: {
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/oYM5v24JhY_glgulVOJDghjGdqB-rY5u`, 
      accounts: ['29a658d6f8810d72015d17fe2de618847e5a2c085afe97fb5a060521daa83d8f'] 
    }
  },
};
