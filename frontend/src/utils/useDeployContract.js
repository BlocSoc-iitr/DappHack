import { abi, bytecode } from "constants";
import { createWalletClient, custom, http } from "viem";
import { filecoinCalibration } from "viem/chains";
import { useAccount } from "wagmi";

const useDeployContract = () => {
  const walletClient = createWalletClient({
    chain: filecoinCalibration,
    transport: http(process.env.yourapikey),
  });

  const { address: account } = useAccount();

  const deployParentContract = async (argument) => {
    try {
      console.log("deploying");
      console.log(argument);
      const hash = await walletClient.deployContract({
        abi: abi.dappHack,
        account,
        bytecode: bytecode.dappHack,
        args: argument,
      });
      console.log(hash);
    } catch (error) {
      console.log(error);
    }
  };

  const deployChildContract = async (argument) => {
    try {
      console.log("deploying");
      console.log(argument);
      const hash = await walletClient.deployContract({
        abi: abi.crossDappHack,
        account,
        bytecode: bytecode.crossDappHack,
        args: argument,
      });
      console.log(hash);
    } catch (error) {
      console.log(error);
    }
  };

  return { deployParentContract, deployChildContract };
};

export default useDeployContract;
