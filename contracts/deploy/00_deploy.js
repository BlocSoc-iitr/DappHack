const { network } = require("hardhat");
// const { developmentChains } = require("../helper-hardhat-config");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const accounts = await ethers.getSigners();
  console.log(accounts[0]);

  console.log(deployer);
  log("----------------------------------------------------");
  const startTime = 0; // Replace with your desired start time
  const endTime = 163; // Replace with your desired end time
  const maxParticipants = 100; // Replace with your desired maximum number of participants
  const teamSizeLimit = 5; // Replace with your desired maximum team size
  const organizers = [accounts[0].address]; // Replace with your desired organizer addresses
  const name = "My Project NFT"; // Replace with your desired project NFT name
  const symbol = "MPN"; // Replace with your desired project NFT symbol

  arguments = [
    startTime,
    endTime,
    maxParticipants,
    teamSizeLimit,
    organizers,
    name,
    symbol,
  ];
  const basicNft = await deploy("DappHack", {
    from: deployer,
    args: arguments,
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  console.log("done");
};
