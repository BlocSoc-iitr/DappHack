const { deploy, checkEnv, getEVMChains, getExamplePath, getWallet } = require('./libs');

const exampleName = process.argv[2];
const env = process.argv[3];
const chainsToDeploy = process.argv.slice(4);

// Check the environment. If it is not valid, exit.
checkEnv(env);

// Get the example object.
const example = require(getExamplePath(exampleName));
const parent = 'Filecoin';
// Get the chains for the environment.
const chains = getEVMChains(env, chainsToDeploy, parent);

// Get the wallet.
const wallet = getWallet();

// This will execute an example script. The example script must have a `deploy` function.
deploy(env, chains, wallet, example, parent);
