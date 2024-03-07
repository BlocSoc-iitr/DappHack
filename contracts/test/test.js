const { ethers } = require("hardhat");
const { expect} = require("chai");
const { anyValue , withArgs } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
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
    let dappHack, tester1WithProvider, sponWithProvider, tester2WithProvider, tester3WithProvider, tester4WithProvider, spon, tester1, tester2, tester3, tester4;

    beforeEach(async function () {
        [dappHack, tester1WithProvider, sponWithProvider, tester2WithProvider, tester3WithProvider, tester4WithProvider, spon, tester1, tester2, tester3, tester4] = await deployContract();

        // Assuming your contract has a method to sign up sponsors
        await dappHack.connect(tester1WithProvider).sponsorSignup("First guy", [tester1.address], [400,  200,  100],  100,  1, {
            value: ethers.parseEther("0.0000000000000008")
        });
        await dappHack.connect(tester2WithProvider).sponsorSignup("Second guy", [tester2.address,spon.address], [400,  200,  100],  200,  1, {
            value: ethers.parseEther("0.0000000000000009")
        });
        await dappHack.connect(tester3WithProvider).sponsorSignup("Third guy", [tester3.address], [400,  200,  100],  300,  1, {
            value: ethers.parseEther("0.0000000000000010")
        });
    });

    it("Unit test of calculatePoolPrizeChangePayment and changePrizePool", async function () {
        // testing calculatePoolPrizeChangePayment
        const calculatePoolPrizeChangePayment1 = await dappHack.connect(tester2WithProvider).calculatePoolPrizeChangePayment(100);
        expect(calculatePoolPrizeChangePayment1).to.equal(-100);

        const calculatePoolPrizeChangePayment2 = await dappHack.connect(tester2WithProvider).calculatePoolPrizeChangePayment(400);
        expect(calculatePoolPrizeChangePayment2).to.equal(200);

        // testing changePrizePool
        const beforegetSponsorPrizePool = await dappHack.connect(tester2WithProvider).getSponsorPrizePool(1);
         expect(beforegetSponsorPrizePool).to.equal(200);
        // getting balances before changing
        const balance1 = await dappHack.connect(tester2WithProvider).getBalance()
        await expect(dappHack.connect(tester2WithProvider).changePrizePool(100))
        .to.emit(dappHack, "PrizePoolChanged")
        .withArgs(tester2.address, beforegetSponsorPrizePool , 100);
        const aftergetSponsorPrizePool = await dappHack.connect(tester3WithProvider).getSponsorPrizePool(1);
        expect(aftergetSponsorPrizePool).to.equal(100);
        // getting balances after changing
        const balance2 = await dappHack.connect(tester3WithProvider).getBalance()
        expect(balance2 - balance1).to.equal(-100);
        
    });
    it("Unit test of calculate of calculatePrizeArrayChangePayment and changePrizeArray", async function(){
        // testing calculatePrizeArrayChangePayment
        const calculatePrizeArrayChangePayment1 = await dappHack.connect(tester3WithProvider).calculatePrizeArrayChangePayment([500 , 400 , 300]);
        expect(calculatePrizeArrayChangePayment1).to.equal(500);
        

        const calculatePrizeArrayChangePayment2 = await dappHack.connect(tester3WithProvider).calculatePrizeArrayChangePayment([300, 200, 100]);
        expect(calculatePrizeArrayChangePayment2).to.equal(-100);

        // testing changePrizeArray
        const beforegetSponsorPrizeArray = await dappHack.connect(tester3WithProvider).getSponsorPrizeArray();
        // balance before making change
        const balance1 = await dappHack.connect(tester3WithProvider).getBalance()
        // need to send eth when you setting prize array greater than the before msg.value
        expect(beforegetSponsorPrizeArray).to.deep.equal([400, 200, 100]);
        await expect(dappHack.connect(tester3WithProvider).changePrizeArray([500 , 400 , 300], {value: ethers.parseEther("0.0000000000000010")}))
        .to.emit(dappHack, "PrizeArrayChanged")
        .withArgs(tester3.address, beforegetSponsorPrizeArray , [500 , 400 , 300]);
        // balance after making first change
        const balance2 = await dappHack.connect(tester3WithProvider).getBalance()
        expect(balance2 - balance1).to.equal(1000);
        const aftergetSponsorPrizeArray = await dappHack.connect(tester3WithProvider).getSponsorPrizeArray();
        
        expect(aftergetSponsorPrizeArray).to.deep.equal([500 , 400 , 300]);
        // no need send eth when you are sending less prize array campared to before 
        await expect(dappHack.connect(tester3WithProvider).changePrizeArray([300 , 200 , 100]))
        .to.emit(dappHack, "PrizeArrayChanged")
        .withArgs(tester3.address, [500 , 400 , 300] , [300 , 200 , 100]);
        // balance after making second change
        const balance3 = await dappHack.connect(tester3WithProvider).getBalance()
        expect(balance3 - balance2).to.equal(-600);
    })
});


