'use strict';

const {
    utils: { deployContract },
} = require('@axelar-network/axelar-local-dev');
const { parse } = require('dotenv');
const { ethers, BigNumber } = require('ethers');

const CrossDappHack = rootRequire('artifacts/contracts/child/CrossDappHack.sol/CrossDappHack.json');

async function deploy(chain, wallet) {
    console.log(`Deploying CrossDeal for ${chain.name}.`);
    chain.contract = await deployContract(wallet, CrossDappHack, [chain.gateway, chain.gasService]);
    chain.wallet = wallet;
    console.log(`Deployed CrossDeal for ${chain.name} at ${chain.contract.address}.`);
}

async function execute(chains, wallet, options) {

    const { source, destination, calculateBridgeFee } = options;
    const fee = await calculateBridgeFee(source, destination, {
        gasLimit: 30000000
    });
    const value = parseInt(fee.toString()) + parseInt('10000000000000');
    console.log(`Crossing ${value} wei from ${source.name} to ${destination.name}.`);

    const tx = await source.contract.crossBuilderSignup(destination.id, destination.contract.address, {
        value: BigNumber.from(value),
        gasLimit: 30000000
    });
    const reciept = await tx.wait();
    console.log(reciept.transactionHash);

    const createTeam = await source.contract.crossinitializeTeam(destination.id, destination.contract.address, "Team1", [], {
        value: BigNumber.from(value),
        gasLimit: 30000000
    });
    const createTeamReciept = await createTeam.wait();
    console.log(createTeamReciept.transactionHash);
    for (const chain of chains) {
        chain.provider = new ethers.providers.JsonRpcProvider(chain.rpc);


        const wallet2 = new ethers.Wallet(process.env.PRIVATE_KEY2, chain.provider);

        const ContractJoinMember = new ethers.Contract(destination.contract.address, CrossDappHack.abi, wallet2);

        const OtherMembertx = await ContractJoinMember.crossBuilderSignup(destination.id, destination.contract.address, {
            value: BigNumber.from(value),
            gasLimit: 30000000
        });

        const Memberreciept = await OtherMembertx.wait();
        console.log(Memberreciept.transactionHash);
        const joinTeam = await ContractJoinMember.crossjoinTeam(source.id, source.contract.address, 0, {
            value: BigNumber.from(value),
            gasLimit: 30000000
        });
        const joinTeamReciept = await joinTeam.wait();
        console.log(joinTeamReciept.transactionHash);

        console.log(`Crossed ${value} wei from ${source.name} to ${destination.name}.`);
    }

    const withdrawTeam = await source.contract.crosswithdrawTeam(0, 0, destination.id, destination.contract.address, {
        value: fee,
        gasLimit: 30000000
    });

    const withdrawTeamReciept = await withdrawTeam.wait();
    console.log(withdrawTeamReciept.transactionHash);

}

module.exports = {
    deploy,
    execute,
};
