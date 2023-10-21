import { contractAddress, abi } from "../../constants";
import { useState, useEffect } from "react";
import { useWeb3Contract } from "react-moralis";
import useWeb3 from "./useWeb3";
const useCrossDappHack = () => {
  const { userAccount } = useWeb3();
  const { runContractFunction, fetch, data, error, isLoading } =
    useWeb3Contract({});
  console.log(contractAddress.crossDappHack);
  const stake = 10000000000000000;
  const crossBuilderSignup = async () => {
    const parameters = {
      abi: abi.crossDappHack,
      contractAddress: contractAddress.crossDappHack,
      functionName: "crossBuilderSignup",
      params: {
        destinationChain: "Avalanche",
        destinationAddress: contractAddress.dappHack,
      },
      msgValue: stake,
    };
    try {
      const response = await runContractFunction({
        params: parameters,
        onSuccess: (response) => {
          console.log(response);
        },
        onError: (error) => {
          console.log(error);
        },
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
