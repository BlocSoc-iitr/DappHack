'use strict';
require('dotenv').config();
const { executeEVMExample, checkEnv, getExamplePath, getWallet, getEVMChains } = require('./libs');

const exampleName = process.argv[2];
const env = process.argv[3];
const args = process.argv.slice(4);

// Check the environment. If it is not valid, exit.
checkEnv(env);

// Get the example object.
const example = require(getExamplePath(exampleName));

// Get the wallet.
const wallet = getWallet();

// This will execute an example script. The example script must have an `execute` function.

// Get the chains for the environment.
let selectedChains = [];

if (args.length >= 2) {
    selectedChains = [args[0], args[1]];
}
const parent = 'Filecoin';
// Get the chains for the environment.
const chains = getEVMChains(env, selectedChains, parent);
executeEVMExample(env, chains, args, wallet, example);
