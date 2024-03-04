const { ethers } = require("hardhat");
const { expect } = require("chai");
const { anyValue, withArgs } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { describe } = require("mocha");

//const { Result } = require("ethers");

async function deployContract() {
    const tester1 = new ethers.Wallet(
        "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
        ethers.provider
    );
    const tester2 = new ethers.Wallet(
        "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d",
        ethers.provider
    );
    const tester3 = new ethers.Wallet(
        "0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a",
        ethers.provider
    );
    const tester4 = new ethers.Wallet(
        "0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6",
        ethers.provider
    );
    const spon = new ethers.Wallet(
        "0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926a",
        ethers.provider
    );
    const tester1WithProvider = await ethers.provider.getSigner(tester1.address);
    const tester2WithProvider = await ethers.provider.getSigner(tester2.address);
    const tester3WithProvider = await ethers.provider.getSigner(tester3.address);
    const tester4WithProvider = await ethers.provider.getSigner(tester4.address);
    const sponWithProvider = await ethers.provider.getSigner(spon.address);


    const startTime = 0; // Replace with your desired start time
    const endTime = 163; // Replace with your desired end time
    const maxParticipants = 100; // Replace with your desired maximum number of participants
    const teamSizeLimit = 5; // Replace with your desired maximum team size
    const organizers = [tester1.address]; // Replace with your desired organizer addresses
    const name = "My Project NFT"; // Replace with your desired project NFT name
    const symbol = "MPN"; // Replace with your desired project NFT symbol

    const dappHackFactory = await hre.ethers.getContractFactory("DappHack");
    const dappHack = await dappHackFactory
        .connect(tester1WithProvider)
        .deploy(
            startTime,
            endTime,
            maxParticipants,
            teamSizeLimit,
            organizers,
            name,
            symbol
        );
    return [dappHack, tester1WithProvider, sponWithProvider, tester2WithProvider, tester3WithProvider, tester4WithProvider, spon, tester1, tester2, tester3, tester4];
}

describe("Testing Team Functions", function () {
    let dappHack, tester1WithProvider, sponWithProvider, tester2WithProvider, tester3WithProvider, tester4WithProvider, spon, tester1, tester2, tester3, tester4;

    beforeEach(async function () {
        [dappHack, tester1WithProvider, sponWithProvider, tester2WithProvider, tester3WithProvider, tester4WithProvider, spon, tester1, tester2, tester3, tester4] = await deployContract();

        //signup builders to the hackathon
        await dappHack.connect(tester1WithProvider).builderSignup({ value: ethers.parseEther("0.01") });
        await dappHack.connect(tester2WithProvider).builderSignup({ value: ethers.parseEther("0.01") });
        await dappHack.connect(tester3WithProvider).builderSignup({ value: ethers.parseEther("0.01") });
        await dappHack.connect(tester4WithProvider).builderSignup({ value: ethers.parseEther("0.01") });


    });

    it("Unit test for initialise team ,changeteam and withdrawTeam functionality", async function () {

        const teamName1 = "Team 1";
        const teamMembers1 = [tester2.address, tester3.address];
        await expect(dappHack.connect(tester3WithProvider).initializeTeam(teamName1, teamMembers1)).to.emit(dappHack, "TeamInitialized").withArgs(teamName1, teamMembers1);

        const teamName2 = "Team 2";
        const teamMembers2 = [tester4.address];
        await expect(dappHack.connect(tester4WithProvider).initializeTeam(teamName2, teamMembers2)).to.emit(dappHack, "TeamInitialized").withArgs(teamName2, teamMembers2);


        const duplicateTeamName = "Duplicate Team";
        const duplicateTeamMembers = [tester2.address];
        await expect(dappHack.connect(sponWithProvider).initializeTeam(duplicateTeamName, duplicateTeamMembers))
        .to.be.revertedWith("participants already in team");

        // checking the updated map data 
        const getTeamName = await dappHack.getTeamName(0);
        expect(getTeamName).to.equal(teamName1);
        const getTeamName2 = await dappHack.getTeamName(1);
        expect(getTeamName2).to.equal(teamName2);
        const getTeamSize = await dappHack.getTeamSize(0);
        console.log(getTeamSize);
        const getTeamSize2 = await dappHack.getTeamSize(1);
        console.log(getTeamSize2);

        // check whether participants are added
        const getTeamParticipantAddress1 = await dappHack.getTeamParticipantAddress(0, 0);
        expect(getTeamParticipantAddress1).to.deep.equal(teamMembers1[0]);
        const getTeamParticipantAddress2 = await dappHack.getTeamParticipantAddress(0, 1);
        expect(getTeamParticipantAddress2).to.deep.equal(teamMembers1[1]);
        const getTeamParticipantAddress3 = await dappHack.getTeamParticipantAddress(1, 0);
        expect(getTeamParticipantAddress3).to.deep.equal(teamMembers2[0]);

        // testing changeTeam

        const changeTeam = await dappHack.connect(tester3WithProvider).changeTeam(0, 1);
        await expect(changeTeam).to.emit(dappHack, "TeamChanged").withArgs(0, 1);
        
    });

});