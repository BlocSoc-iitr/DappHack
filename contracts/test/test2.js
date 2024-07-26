const { ethers } = require("hardhat");
const { expect } = require("chai");
const { anyValue, withArgs } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { describe } = require("mocha");

describe("DappHack", function () {
    let dappHack;
    let owner, addr1, addr2, addr3, addr4, addr5;

    beforeEach(async function () {



        [owner, addr1, addr2, addr3, addr4, addr5] = await ethers.getSigners();

        const startTime = 0; // Replace with your desired start time
        const endTime = 163; // Replace with your desired end time
        const maxParticipants = 100; // Replace with your desired maximum number of participants
        const teamSizeLimit = 5; // Replace with your desired maximum team size
        const organizers = [owner.address]; // Replace with your desired organizer addresses
        const name = "My Project NFT"; // Replace with your desired project NFT name
        const symbol = "MPN"; // Replace with your desired project NFT symbol

        const dappHackFactory = await hre.ethers.getContractFactory("DappHack");
        dappHack = await dappHackFactory.connect(owner).deploy(
            startTime,
            endTime,
            maxParticipants,
            teamSizeLimit,
            organizers,
            name,
            symbol
        );
        await dappHack.waitForDeployment();

    });

    describe("initializeTeam", function () {
        it("Should initialize a team correctly", async function () {

            await dappHack.connect(addr1).builderSignup({
                value: ethers.parseEther("1.0")
            });
            await dappHack.connect(addr2).builderSignup({
                value: ethers.parseEther("1.0")
            });
            await dappHack.connect(addr3).builderSignup({
                value: ethers.parseEther("1.0")
            });
            await dappHack.connect(addr4).builderSignup({
                value: ethers.parseEther("1.0")
            });
            await dappHack.connect(owner).builderSignup({
                value: ethers.parseEther("1.0")
            });
            await dappHack.connect(addr5).builderSignup({
                value: ethers.parseEther("1.0")
            });
            const participants = [addr1.getAddress(), addr2.getAddress()];
            console.log(participants);
            console.log(owner.getAddress());
            await dappHack.connect(owner).initializeTeam("Team1", participants);

            const team = await dappHack.s_teams(0);
            expect(team.name).to.equal("Team1");

            const size = await dappHack.connect(owner).getTeamSize(0);
            expect(size).to.be.equal(3);

        });

        it("Should fail if team already exists", async function () {
            await dappHack.connect(owner).builderSignup({
                value: ethers.parseEther("1.0")
            });
            await dappHack.connect(addr1).builderSignup({
                value: ethers.parseEther("1.0")
            });
            await dappHack.connect(addr2).builderSignup({
                value: ethers.parseEther("1.0")
            });
            await dappHack.connect(addr3).builderSignup({
                value: ethers.parseEther("1.0")
            });
            await dappHack.connect(addr4).builderSignup({
                value: ethers.parseEther("1.0")
            });

            await dappHack.connect(addr5).builderSignup({
                value: ethers.parseEther("1.0")
            });
            const participants = [addr1.getAddress()];
            await dappHack.connect(owner).initializeTeam("Team1", participants);

            await expect(dappHack.connect(owner).initializeTeam("Team1", participants)).to.be.revertedWith("Team already exists");
        });

        it("Should fail if team size exceeds limit", async function () {

            const participants = Array(5).fill(addr1.getAddress());
            await expect(dappHack.connect(owner).initializeTeam("Team2", participants)).to.be.revertedWith("Invalid team size");
        });

        it("Should fail if team is duplicated", async function () {
            await dappHack.connect(owner).builderSignup({
                value: ethers.parseEther("1.0")
            });
            await dappHack.connect(addr1).builderSignup({
                value: ethers.parseEther("1.0")
            });
            const participants = Array(3).fill(addr1.getAddress());
            await expect(dappHack.connect(owner).initializeTeam("Team2", participants)).to.be.revertedWith("Duplicate Participants");
        });

        it("Should fail if leader is added into the array", async function () {
            await dappHack.connect(owner).builderSignup({
                value: ethers.parseEther("1.0")
            });
            await dappHack.connect(addr1).builderSignup({
                value: ethers.parseEther("1.0")
            });
            const participants = [owner.getAddress(), addr1.getAddress()]
            await expect(dappHack.connect(owner).initializeTeam("Team1", participants)).to.be.revertedWith("Duplicate Participants");
        });

        it("Should fail if sender is already in participants", async function () {
            await dappHack.connect(owner).builderSignup({
                value: ethers.parseEther("1.0")
            });
            await dappHack.connect(addr1).builderSignup({
                value: ethers.parseEther("1.0")
            });
            const participants = [addr1.getAddress()];
            await expect(dappHack.connect(owner).initializeTeam("Team1", participants))
            await expect(dappHack.connect(owner).initializeTeam("Team3", participants)).to.be.revertedWith("Already in a team");
        });

        it("Should fail if sender is not a builder", async function () {
            await dappHack.connect(owner).builderSignup({
                value: ethers.parseEther("1.0")
            });
            await expect(dappHack.connect(owner).initializeTeam("Team1", [addr1.getAddress()])).to.be.revertedWith("Builder not found");
        }
        );
    });

    describe("joinTeam", function () {
        it("Should allow a builder to join an existing team", async function () {
            await dappHack.connect(owner).builderSignup({
                value: ethers.parseEther("1.0")
            });
            await dappHack.connect(addr1).builderSignup({
                value: ethers.parseEther("1.0")
            });
            await dappHack.connect(addr2).builderSignup({
                value: ethers.parseEther("1.0")
            });
            await dappHack.connect(addr3).builderSignup({
                value: ethers.parseEther("1.0")
            });
            await dappHack.connect(addr4).builderSignup({
                value: ethers.parseEther("1.0")
            });

            await dappHack.connect(addr5).builderSignup({
                value: ethers.parseEther("1.0")
            });
            const participants = [addr1.getAddress()];
            await dappHack.connect(owner).initializeTeam("Team1", participants);

            await dappHack.connect(addr2).joinTeam(0);


            const size = await dappHack.connect(owner).getTeamSize(0);
            expect(size).to.be.equal(3);
        });

        it("Should fail if builder is already in a team", async function () {
            await dappHack.connect(owner).builderSignup({
                value: ethers.parseEther("1.0")
            });
            await dappHack.connect(addr1).builderSignup({
                value: ethers.parseEther("1.0")
            });
            await dappHack.connect(addr2).builderSignup({
                value: ethers.parseEther("1.0")
            });
            await dappHack.connect(addr3).builderSignup({
                value: ethers.parseEther("1.0")
            });
            await dappHack.connect(addr4).builderSignup({
                value: ethers.parseEther("1.0")
            });

            await dappHack.connect(addr5).builderSignup({
                value: ethers.parseEther("1.0")
            });
            const addressofaddr1 = addr1.getAddress();
            const participants = [addressofaddr1];
            await dappHack.connect(owner).initializeTeam("Team7", participants);

            await dappHack.connect(addr2).joinTeam(0);
            await expect(dappHack.connect(addr2).joinTeam(0)).to.be.revertedWith("Already in a team");
        });

        it("Should fail if team does not exist", async function () {
            await dappHack.connect(owner).builderSignup({
                value: ethers.parseEther("1.0")
            });
            await dappHack.connect(addr1).builderSignup({
                value: ethers.parseEther("1.0")
            });
            await dappHack.connect(addr2).builderSignup({
                value: ethers.parseEther("1.0")
            });
            await dappHack.connect(addr3).builderSignup({
                value: ethers.parseEther("1.0")
            });
            await dappHack.connect(addr4).builderSignup({
                value: ethers.parseEther("1.0")
            });

            await dappHack.connect(addr5).builderSignup({
                value: ethers.parseEther("1.0")
            });
            await expect(dappHack.connect(addr2).joinTeam(999)).to.be.revertedWith("No such team exists");
        });

        it("Should fail if team limit is exceeded", async function () {
            await dappHack.connect(owner).builderSignup({
                value: ethers.parseEther("1.0")
            });
            await dappHack.connect(addr1).builderSignup({
                value: ethers.parseEther("1.0")
            });
            await dappHack.connect(addr2).builderSignup({
                value: ethers.parseEther("1.0")
            });
            await dappHack.connect(addr3).builderSignup({
                value: ethers.parseEther("1.0")
            });
            await dappHack.connect(addr4).builderSignup({
                value: ethers.parseEther("1.0")
            });

            await dappHack.connect(addr5).builderSignup({
                value: ethers.parseEther("1.0")
            });
            const participants = [addr1.getAddress(), addr2.getAddress(), addr3.getAddress(), addr4.getAddress()];
            await dappHack.connect(owner).initializeTeam("Team1", participants);


            await expect(dappHack.connect(addr5).joinTeam(0)).to.be.revertedWith("Team limit exceeded");
        });

        it("Mapping must change for every address", async function () {
            await dappHack.connect(owner).builderSignup({
                value: ethers.parseEther("1.0")
            });
            await dappHack.connect(addr1).builderSignup({
                value: ethers.parseEther("1.0")
            });
            await dappHack.connect(addr2).builderSignup({
                value: ethers.parseEther("1.0")
            });
            await dappHack.connect(addr3).builderSignup({
                value: ethers.parseEther("1.0")
            });
            await dappHack.connect(addr4).builderSignup({
                value: ethers.parseEther("1.0")
            });

            const participants = [addr1.getAddress(), addr2.getAddress(), addr3.getAddress()];
            await dappHack.connect(owner).initializeTeam("Team1", participants);
            await dappHack.connect(addr4).joinTeam(0);
            const newparticipants = [await addr1.getAddress(), await addr2.getAddress(), await addr3.getAddress(), await owner.getAddress(), await addr4.getAddress()];
            const [, list, ,] = await dappHack.connect(addr3).getYourTeamInfo();
            expect(list).to.be.deep.equal(newparticipants);

        });
    });

    describe("withdrawTeam", function () {
        it("Should allow a builder to withdraw from a team", async function () {
            await dappHack.connect(owner).builderSignup({
                value: ethers.parseEther("1.0")
            });
            await dappHack.connect(addr1).builderSignup({
                value: ethers.parseEther("1.0")
            });
            await dappHack.connect(addr2).builderSignup({
                value: ethers.parseEther("1.0")
            });
            await dappHack.connect(addr3).builderSignup({
                value: ethers.parseEther("1.0")
            });
            await dappHack.connect(addr4).builderSignup({
                value: ethers.parseEther("1.0")
            });

            await dappHack.connect(addr5).builderSignup({
                value: ethers.parseEther("1.0")
            });
            const participants = [addr1.getAddress()];
            await dappHack.connect(owner).initializeTeam("Team1", participants);

            await dappHack.connect(addr1).withdrawTeam(0, 0);

            expect((await dappHack.s_teams(0)).participants).to.not.include(addr1.getAddress());
            expect((await dappHack.builderToTeam(addr1.getAddress())).name).to.equal("");
        });

        it("Should fail if the builder is not in any team", async function () {
            await dappHack.connect(owner).builderSignup({
                value: ethers.parseEther("1.0")
            });
            await dappHack.connect(addr1).builderSignup({
                value: ethers.parseEther("1.0")
            });
            await dappHack.connect(addr2).builderSignup({
                value: ethers.parseEther("1.0")
            });
            await dappHack.connect(addr3).builderSignup({
                value: ethers.parseEther("1.0")
            });
            await dappHack.connect(addr4).builderSignup({
                value: ethers.parseEther("1.0")
            });

            await dappHack.connect(addr5).builderSignup({
                value: ethers.parseEther("1.0")
            });
            await expect(dappHack.connect(addr1).withdrawTeam(0, 0)).to.be.revertedWith("You're not in any team");
        });

        it("Should delete team if no participants are left", async function () {
            await dappHack.connect(owner).builderSignup({
                value: ethers.parseEther("1.0")
            });
            await dappHack.connect(addr1).builderSignup({
                value: ethers.parseEther("1.0")
            });
            await dappHack.connect(addr2).builderSignup({
                value: ethers.parseEther("1.0")
            });

            const participants = [addr1.getAddress(), addr2.getAddress()];
            await dappHack.connect(owner).initializeTeam("Team1", participants);
            await dappHack.connect(addr1).withdrawTeam(0, 0);
            const size = await dappHack.getTeamSize(0);
            expect(size).to.be.equal(2);
            await dappHack.connect(owner).withdrawTeam(0, 0);
            await dappHack.connect(addr2).withdrawTeam(0, 0);
            await dappHack.connect(owner).initializeTeam("Team2", participants);
            expect((await dappHack.s_teams(0)).name).to.equal("Team2");
        });

        it("Should be able to withdraw & Join a team again", async function () {
            await dappHack.connect(owner).builderSignup({
                value: ethers.parseEther("1.0")
            });
            await dappHack.connect(addr1).builderSignup({
                value: ethers.parseEther("1.0")
            });
            await dappHack.connect(addr2).builderSignup({
                value: ethers.parseEther("1.0")
            });
            await dappHack.connect(addr3).builderSignup({
                value: ethers.parseEther("1.0")
            });
            await dappHack.connect(addr4).builderSignup({
                value: ethers.parseEther("1.0")
            });

            const participants = [addr1.getAddress(), addr2.getAddress(), addr3.getAddress(), addr4.getAddress()];
            await dappHack.connect(owner).initializeTeam("Team1", participants);
            await dappHack.connect(addr1).withdrawTeam(0, 0);
            await dappHack.connect(addr1).joinTeam(0);
            const size = await dappHack.getTeamSize(0);

            expect(size).to.be.equal(5);
        });

        it("Mapping must change for every address", async function () {
            await dappHack.connect(owner).builderSignup({
                value: ethers.parseEther("1.0")
            });
            await dappHack.connect(addr1).builderSignup({
                value: ethers.parseEther("1.0")
            });
            await dappHack.connect(addr2).builderSignup({
                value: ethers.parseEther("1.0")
            });
            await dappHack.connect(addr3).builderSignup({
                value: ethers.parseEther("1.0")
            });
            await dappHack.connect(addr4).builderSignup({
                value: ethers.parseEther("1.0")
            });

            const participants = [addr1.getAddress(), addr2.getAddress(), addr3.getAddress(), addr4.getAddress()];
            await dappHack.connect(owner).initializeTeam("Team1", participants);
            await dappHack.connect(addr1).withdrawTeam(0, 0);
            const newparticipants = [await owner.getAddress(), await addr2.getAddress(), await addr3.getAddress(), await addr4.getAddress()];

            const [, list, ,] = await dappHack.getYourTeamInfo();
            expect(list).to.be.deep.equal(newparticipants);

        })
    });
});