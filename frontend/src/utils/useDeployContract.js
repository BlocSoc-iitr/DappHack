import Web3 from "web3";
import { abi, bytecode } from "constants";
import useWeb3 from "./useWeb3";
const useDeployContract = () => {
  const { userAccount, Moralis } = useWeb3();

  const deployParentContract = async (argument) => {
    // await Moralis.enableWeb3();
    let provider = new Web3(Moralis.provider);

    const MyContract = new provider.eth.Contract(abi.dappHack);
    console.log(MyContract);
    const gasPrice = await provider?.eth?.getGasPrice();

    // console.log(gasPrice);
    console.log(userAccount);
    let newContractInstance;
    try {
      newContractInstance = await MyContract.deploy({
        data: bytecode.dappHack,
        arguments: argument,
      }).send({
        from: userAccount,
        gas: 3000000,
        gasPrice: gasPrice,
      });
    } catch (error) {
      console.log(error);
    }
    console.log(newContractInstance);
    // setContract(newContractInstance.options.address);
    // console.log(contract);
    console.log(
      `Contract deployed at address ${newContractInstance.options.address}`
    );
    return newContractInstance.options.address;
  };

  const deployChildContract = async (argument) => {
    // await Moralis.enableWeb3();
    let provider = new Web3(Moralis.provider);

    const MyContract = new provider.eth.Contract(abi.crossDappHack);
    console.log(MyContract);
    const gasPrice = await provider?.eth?.getGasPrice();

    // console.log(gasPrice);
    console.log(userAccount);
    let newContractInstance;
    try {
      newContractInstance = await MyContract.deploy({
        data: bytecode.crossDappHack,
        arguments: argument,
      }).send({
        from: userAccount,
        gas: 3000000,
        gasPrice: gasPrice,
      });
    } catch (error) {
      console.log(error);
    }
    console.log(newContractInstance);
    // setContract(newContractInstance.options.address);
    // console.log(contract);
    console.log(
      `Contract deployed at address ${newContractInstance.options.address}`
    );
    return newContractInstance.options.address;
  };

  return { deployParentContract, deployChildContract };
};

export default useDeployContract;
