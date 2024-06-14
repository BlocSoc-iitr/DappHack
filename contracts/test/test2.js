const { ethers } = require("hardhat");
const { expect } = require("chai");
const { anyValue, withArgs } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { describe } = require("mocha");

describe("DappHack2", function () {
    let DappHack2, dappHack2;
    let owner, addr1, addr2, addr3, addr4, addr5;

    beforeEach(async function () {

        try {
            // Deploy the contract
            DappHack2 = await ethers.getContractFactory("DappHack2");
            dappHack2 = await DappHack2.deploy();
            await dappHack2.waitForDeployment();

            // Get signers
            [owner, addr1, addr2, addr3, addr4, addr5] = await ethers.getSigners();


        } catch (error) {
            console.error(error);
        }

    });

    describe("initializeTeam", function () {
        it("Should initialize a team correctly", async function () {

            await dappHack2.connect(addr1).builderSignup();
            await dappHack2.connect(addr2).builderSignup();
            await dappHack2.connect(addr3).builderSignup();
            await dappHack2.connect(addr4).builderSignup();
            await dappHack2.connect(owner).builderSignup();
            await dappHack2.connect(addr5).builderSignup();
            const participants = [addr1.getAddress(), addr2.getAddress()];
            console.log(participants);
            console.log(owner.getAddress());
            await dappHack2.connect(owner).initializeTeam("Team1", participants);

            const team = await dappHack2.s_teams(0);
            expect(team.name).to.equal("Team1");

            const size = await dappHack2.connect(owner).getTeamSize(0);
            expect(size).to.be.equal(3);

        });

        it("Should fail if team already exists", async function () {
            await dappHack2.connect(owner).builderSignup();
            await dappHack2.connect(addr1).builderSignup();
            await dappHack2.connect(addr2).builderSignup();
            await dappHack2.connect(addr3).builderSignup();
            await dappHack2.connect(addr4).builderSignup();

            await dappHack2.connect(addr5).builderSignup();
            const participants = [addr1.getAddress()];
            await dappHack2.connect(owner).initializeTeam("Team1", participants);

            await expect(dappHack2.connect(owner).initializeTeam("Team1", participants)).to.be.revertedWith("Team already exists");
        });

        it("Should fail if team size exceeds limit", async function () {

            const participants = Array(5).fill(addr1.getAddress());
            await expect(dappHack2.connect(owner).initializeTeam("Team2", participants)).to.be.revertedWith("Invalid team size");
        });

        it("Should fail if team is duplicated", async function () {
            await dappHack2.connect(owner).builderSignup();
            await dappHack2.connect(addr1).builderSignup();
            const participants = Array(3).fill(addr1.getAddress());
            await expect(dappHack2.connect(owner).initializeTeam("Team2", participants)).to.be.revertedWith("Duplication detected");
        });

        it("Should fail if leader is added into the array", async function () {
            await dappHack2.connect(owner).builderSignup();
            await dappHack2.connect(addr1).builderSignup();
            const participants = [owner.getAddress(), addr1.getAddress()]
            await expect(dappHack2.connect(owner).initializeTeam("Team1", participants)).to.be.revertedWith("Duplication detected");
        });

        it("Should fail if sender is already in participants", async function () {
            await dappHack2.connect(owner).builderSignup();
            await dappHack2.connect(addr1).builderSignup();
            const participants = [addr1.getAddress()];
            await expect(dappHack2.connect(owner).initializeTeam("Team1", participants))
            await expect(dappHack2.connect(owner).initializeTeam("Team3", participants)).to.be.revertedWith("Already in a team");
        });
    });

    describe("joinTeam", function () {
        it("Should allow a builder to join an existing team", async function () {
            await dappHack2.connect(owner).builderSignup();
            await dappHack2.connect(addr1).builderSignup();
            await dappHack2.connect(addr2).builderSignup();
            await dappHack2.connect(addr3).builderSignup();
            await dappHack2.connect(addr4).builderSignup();

            await dappHack2.connect(addr5).builderSignup();
            const participants = [addr1.getAddress()];
            await dappHack2.connect(owner).initializeTeam("Team1", participants);

            await dappHack2.connect(addr2).joinTeam(0);


            const size = await dappHack2.connect(owner).getTeamSize(0);
            expect(size).to.be.equal(3);
        });

        it("Should fail if builder is already in a team", async function () {
            await dappHack2.connect(owner).builderSignup();
            await dappHack2.connect(addr1).builderSignup();
            await dappHack2.connect(addr2).builderSignup();
            await dappHack2.connect(addr3).builderSignup();
            await dappHack2.connect(addr4).builderSignup();

            await dappHack2.connect(addr5).builderSignup();
            const addressofaddr1 = addr1.getAddress();
            const participants = [addressofaddr1];
            await dappHack2.connect(owner).initializeTeam("Team7", participants);

            await dappHack2.connect(addr2).joinTeam(0);
            await expect(dappHack2.connect(addr2).joinTeam(0)).to.be.revertedWith("Already in a team");
        });

        it("Should fail if team does not exist", async function () {
            await dappHack2.connect(owner).builderSignup();
            await dappHack2.connect(addr1).builderSignup();
            await dappHack2.connect(addr2).builderSignup();
            await dappHack2.connect(addr3).builderSignup();
            await dappHack2.connect(addr4).builderSignup();

            await dappHack2.connect(addr5).builderSignup();
            await expect(dappHack2.connect(addr2).joinTeam(999)).to.be.revertedWith("No such team exists");
        });

        it("Should fail if team limit is exceeded", async function () {
            await dappHack2.connect(owner).builderSignup();
            await dappHack2.connect(addr1).builderSignup();
            await dappHack2.connect(addr2).builderSignup();
            await dappHack2.connect(addr3).builderSignup();
            await dappHack2.connect(addr4).builderSignup();

            await dappHack2.connect(addr5).builderSignup();
            const participants = [addr1.getAddress(), addr2.getAddress(), addr3.getAddress(), addr4.getAddress()];
            await dappHack2.connect(owner).initializeTeam("Team1", participants);


            await expect(dappHack2.connect(addr5).joinTeam(0)).to.be.revertedWith("Team limit exceeded");
        });
    });

    describe("withdrawTeam", function () {
        it("Should allow a builder to withdraw from a team", async function () {
            await dappHack2.connect(owner).builderSignup();
            await dappHack2.connect(addr1).builderSignup();
            await dappHack2.connect(addr2).builderSignup();
            await dappHack2.connect(addr3).builderSignup();
            await dappHack2.connect(addr4).builderSignup();

            await dappHack2.connect(addr5).builderSignup();
            const participants = [addr1.getAddress()];
            await dappHack2.connect(owner).initializeTeam("Team1", participants);

            await dappHack2.connect(addr1).withdrawTeam(0);

            expect((await dappHack2.s_teams(0)).participants).to.not.include(addr1.getAddress());
            expect((await dappHack2.builderToTeam(addr1.getAddress())).name).to.equal("");
        });

        it("Should fail if the builder is not in any team", async function () {
            await dappHack2.connect(owner).builderSignup();
            await dappHack2.connect(addr1).builderSignup();
            await dappHack2.connect(addr2).builderSignup();
            await dappHack2.connect(addr3).builderSignup();
            await dappHack2.connect(addr4).builderSignup();

            await dappHack2.connect(addr5).builderSignup();
            await expect(dappHack2.connect(addr1).withdrawTeam(0)).to.be.revertedWith("You're not in any team");
        });
    });
});
