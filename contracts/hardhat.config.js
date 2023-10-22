require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("hardhat-deploy-ethers");
/** @type import('hardhat/config').HardhatUserConfig */
// const PRIVATE_KEY = process.env.PRIVATE_KEY;
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.19",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
            details: { yul: false },
          },
        },
      },
      {
        version: "0.8.20",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
            details: { yul: false },
          },
        },
      },
    ],
  },
  // defaultNetwork: "calibrationnet",
  // networks: {
  //   localnet: {
  //     chainId: 31415926,
  //     url: "http://127.0.0.1:1234/rpc/v1",
  //     accounts: [PRIVATE_KEY],
  //   },
  //   calibrationnet: {
  //     chainId: 314159,
  //     url: "https://api.calibration.node.glif.io/rpc/v1",
  //     accounts: [PRIVATE_KEY],
  //   },
  //   filecoinmainnet: {
  //     chainId: 314,
  //     url: "https://api.node.glif.io",
  //     accounts: [PRIVATE_KEY],
  //   },
  // },
};
