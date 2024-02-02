import React from "react";
import { contractAddress, abi } from "../../constants";
import { useContractWrite } from "wagmi";

const useHandleContractWrite = ({ functionName }) => {
  console.log(functionName);
  console.log(contractAddress.dappHack);

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: contractAddress.dappHack,
    abi: abi.dappHack,
    functionName: functionName,
  });

  return {
    data,
    isLoading,
    isSuccess,
    write,
  };
};

export default useHandleContractWrite;
