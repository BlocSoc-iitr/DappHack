// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const { ethers } = require("ethers");
async function main() {
  
  //setting the test wallets
  const tester1 = ethers.Wallet.createRandom();
  const tester2 = ethers.Wallet.createRandom();
  const tester3 = ethers.Wallet.createRandom();
  const tester4 = ethers.Wallet.createRandom();
  const spon = ethers.Wallet.createRandom();
  
  //setting the test wallets with provider
  const tester1WithProvider = tester1.connect(hre.ethers.provider);
  const tester2WithProvider = tester2.connect(hre.ethers.provider);
  const tester3WithProvider = tester3.connect(hre.ethers.provider);
  const tester4WithProvider = tester4.connect(hre.ethers.provider);

  const sponWithProvider = spon.connect(hre.ethers.provider);
  
  //deploying the dappHack contract
  const dappHackFactory = await hre.ethers.getContractFactory("DappHack");
  const startTime = 0; // Replace with your desired start time
  const endTime = 163; // Replace with your desired end time
  const maxParticipants = 100; // Replace with your desired maximum number of participants
  const teamSizeLimit = 5; // Replace with your desired maximum team size
  const organizers = [tester1.address]; // Replace with your desired organizer addresses
  const name = "My Project NFT"; // Replace with your desired project NFT name
  const symbol = "MPN"; // Replace with your desired project NFT symbol
  const dappHack = await dappHackFactory.connect(tester1WithProvider).deploy(startTime, endTime, maxParticipants, teamSizeLimit, organizers, name, symbol);
  await dappHack.deployed();
 
  //get address of the hackathon contract
  console.log("dappHack deployed to:", dappHack.address);
  
  //deploying the projectNFTs contract
  const projectFactory = await hre.ethers.getContractFactory("ProjectNFTs");
  const project = await projectFactory.deploy();
  await project.deployed();
  
  //get address of the projectNFTs contract
  console.log("project deployed to:", project.address);
  
 
  
  //call the sponsor signup funcntion
  await dappHackWithSigner.sponsorSignUp("Xero",[spon.address],[500],100,1);

  //check if s_sponsors array has an array element
  const s_sponsors = await dappHack.s_sponsors();
  console.log("should be greater than one",s_sponsors.length);

  //signup builders to the hackathon
  await dappHack.connect(tester2WithProvider).builderSignUp();
  await dappHack.connect(tester3WithProvider).builderSignUp();
  await dappHack.connect(tester4WithProvider).builderSignUp();

  //check if builders array has an array element
  const builders = await dappHack.builders();
  console.log("should be greater than one",builders.length);


  //create a team
  const teamName = "Team 1";
  const teamMembers = [tester2.address,tester3.address];
  await dappHack.connect(tester2WithProvider).createTeam(teamName,teamMembers);

  const teamName2 = "Team 2";
  const teamMembers2 = [tester4.address];
  await dappHack.connect(tester4WithProvider).createTeam(teamName2,teamMembers2);

  //check if teams array has an array element
  const teams = await dappHack.s_teams();
  console.log("should be greater than one",teams.length);

  //submit project
  await dappHack.connect(tester2WithProvider).submitProject(0,"DappHard");
  await dappHack.connect(tester4WithProvider).submitProject(1,"DappHard2");

  //the valid project of the team 0 should be true
  const team = await dappHack.s_teams(0);
  const isValid = await team.validProject;

  console.log("should be true",isValid);

  // judge winners

  await dappHack.connect(sponWithProvider).judgeWinners("Xero",[1],[0]);
  const s_winners = await dappHack.s_winners();

  console.log("should be greater than one",s_winners.length);

  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
