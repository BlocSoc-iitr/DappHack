import { contractAddress, abi } from "../../constants";
import { useContractWrite } from "wagmi";
import { parseEther } from "viem";

const useCrossDappHack = () => {
  console.log(contractAddress.crossDappHack);
  const stake = parseEther("0.01");

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: contractAddress.dappHack,
    abi: abi.dappHack,
    functionName: "crossBuilderSignup",
  });

  const crossBuilderSignup = async () => {
    try {
      const response = await write({
        args: ["filecoin-2", contractAddress.dappHack],
        value: stake,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    crossBuilderSignup,
  };
};
export default useCrossDappHack;
