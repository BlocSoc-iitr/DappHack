'use strict';

const {
    utils: { deployContract },
} = require('@axelar-network/axelar-local-dev');

const DappHack = rootRequire('./artifacts/contracts/parent/DappHack.sol/DappHack.json');

async function deploy(chain, wallet) {
    console.log(`Deploying DappHack for ${chain.name}.`);
    console.log(wallet);
    const startTime = 0; // Replace with your desired start time
    const endTime = 163; // Replace with your desired end time
    const maxParticipants = 100; // Replace with your desired maximum number of participants
    const teamSizeLimit = 5; // Replace with your desired maximum team size
    const organizers = [wallet.address]; // Replace with your desired organizer addresses
    const name = 'My Project NFT'; // Replace with your desired project NFT name
    const symbol = 'MPN'; // Replace with your desired project NFT symbol

    chain.contract = await deployContract(wallet, DappHack, [
        startTime,
        endTime,
        maxParticipants,
        teamSizeLimit,
        organizers,
        name,
        symbol,
        chain.gateway,
        chain.gasService,
    ]);
    chain.wallet = wallet;
    console.log(`Deployed DappHack for ${chain.name} at ${chain.contract.address}`);
}
module.exports = {
    deploy,
};
