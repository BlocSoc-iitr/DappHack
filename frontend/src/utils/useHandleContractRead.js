import React from "react";
import { contractAddress, abi } from "../../constants";
import { useContractRead } from "wagmi";

const useHandleContractRead = ({ functionName, args }) => {
  console.log(functionName);
  console.log(args);
  console.log(contractAddress.dappHack);

  const { data, isLoading, isSuccess, refetch } = useContractRead({
    address: contractAddress.dappHack,
    abi: abi.dappHack,
    functionName: functionName,
    args: args,
  });

  return {
    data,
    isLoading,
    isSuccess,
    refetch,
  };
};

export default useHandleContractRead;
