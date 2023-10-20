'use strict';

const {
    utils: { deployContract },
} = require('@axelar-network/axelar-local-dev');

const CrossDappHack = rootRequire('artifacts/contracts/child/CrossDappHack.sol/CrossDappHack.json');

async function deploy(chain, wallet) {
    console.log(`Deploying CrossDeal for ${chain.name}.`);
    chain.contract = await deployContract(wallet, CrossDappHack, [chain.gateway, chain.gasService]);
    chain.wallet = wallet;
    console.log(`Deployed CrossDeal for ${chain.name} at ${chain.contract.address}.`);
}

async function execute(chains, wallet, options) {
    const { source, destination, calculateBridgeFee } = options;

    const fee = await calculateBridgeFee(source, destination);

    const tx = await source.contract.crossSponsorSignup(destination.id, destination.contract.address, [DealRequestStruct], {
        value: fee + 1000000000000000,
    });
    const reciept = await tx.wait();
    console.log(reciept.transactionHash);
    console.log('done');
}

module.exports = {
    deploy,
    execute,
};
