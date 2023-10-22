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
    // console.log(source);
    const fee = await calculateBridgeFee(source, destination);
    console.log(fee);
    const tx = await source.contract.crossBuilderSignup(destination.id, destination.contract.address, {
        value: fee,
        gasLimit: 300000000,
    });
    const reciept = await tx.wait();
    console.log(reciept.transactionHash);
    console.log('done');
}

module.exports = {
    deploy,
    execute,
};
