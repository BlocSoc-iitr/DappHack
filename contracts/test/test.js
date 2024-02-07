const { time, loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require("hardhat");
const { expect, assert , should , d} = require("chai");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
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
        return [dappHack, tester1WithProvider, sponWithProvider ,tester2WithProvider, tester3WithProvider, tester4WithProvider , spon , tester1 , tester2 , tester3 , tester4];
    }

describe("Testing calculatePoolPrizeChangePayment", function () {
    it("Basic testing", async function () {
        const [dappHack, tester1WithProvider, sponWithProvider ,tester2WithProvider, tester3WithProvider, tester4WithProvider , spon , tester1 , tester2 , tester3 , tester4] = await deployContract();       
        const prizePool = 100;
        const prizeArray = [100 , 50 , 25];

        const SignUp1 = await dappHack.connect(tester1WithProvider).sponsorSignup("First guy", [tester1.address], [400 ,200 , 100], 100, 1, {
            value: ethers.parseEther("0.0000000000000008"), // replace "1.0" with the amount you want to send
        });
        const SignUp2 = await dappHack.connect(tester2WithProvider).sponsorSignup("Second guy", [spon.address], [400 ,200 , 100], 200, 1, {
            value: ethers.parseEther("0.0000000000000009"), // replace "1.0" with the amount you want to send
        });
        const SignUp3 = await dappHack.connect(tester3WithProvider).sponsorSignup("Third guy", [tester2.address], [400 ,200 , 100], 300, 1, {
            value: ethers.parseEther("0.0000000000000010"), // replace "1.0" with the amount you want to send
        });
        const SignUp4 = await dappHack.connect(tester4WithProvider).sponsorSignup("Fourth guy", [tester3.address, tester4.address], [400 ,200 , 100], 400, 1, {
            value: ethers.parseEther("0.0000000000000011"), // replace "1.0" with the amount you want to send
        });

        const calculatePoolPrizeChangePayment = await dappHack.connect(tester2WithProvider).calculatePoolPrizeChangePayment(1,100);
        console.log(calculatePoolPrizeChangePayment);

    });
});


// const getSponsorAddress1 = await dappHack.connect(sponWithProvider).getSponsorAddress(0);
// const getSponsorAddress2 = await dappHack.connect(sponWithProvider).getSponsorAddress(1);
// console.log(getSponsorAddress1, getSponsorAddress2);
// const CheckSponsor1 = await dappHack.connect(sponWithProvider).isSponsor1(spon.address , 0);
// console.log(CheckSponsor1);
// const CheckSponsor2 = await dappHack.connect(sponWithProvider).isSponsor1(spon.address , 1);
// console.log(CheckSponsor2);
// const CheckSponsorId1 = await dappHack.connect(sponWithProvider).getSponsorId(tester1.address);
// console.log(CheckSponsorId1);

