import { contractAddress, abi } from "../../constants";
import { useState, useEffect } from "react";
import { useWeb3Contract } from "react-moralis";
import useWeb3 from "./useWeb3";
const useDappHack = () => {
  const { userAccount } = useWeb3();
  const { runContractFunction, fetch, data, error, isLoading } =
    useWeb3Contract({});
  console.log(contractAddress.dappHack);
  const stake = 10000000000;
  const builderSignup = async () => {
    const parameters = {
      abi: abi.dappHack,
      contractAddress: contractAddress.dappHack,
      functionName: "builderSignup",
      params: {},
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
  const sponsorSignup = async (
    name,
    sponsorArray,
    prizeArray,
    poolPrize,
    numberofPoolPrize
  ) => {
    let sum = 0;
    for (let i = 0; i < prizeArray.length; i++) {
      sum += prizeArray[i];
    }
    const parameters = {
      abi: abi.dappHack,
      contractAddress: contractAddress.dappHack,
      functionName: "sponsorSignup",
      params: {
        name: name,
        _sponsors: sponsorArray,
        _prizeArray: prizeArray,
        _poolPrize: poolPrize,
        _numberofPoolPrize: numberofPoolPrize,
      },
      msgValue: sum + poolPrize,
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

  const createTeam = async (teamName, teamMembersArray) => {
    const parameters = {
      abi: abi.dappHack,
      contractAddress: contractAddress.dappHack,
      functionName: "initializeTeam",
      params: {
        name: teamName,
        participants: teamMembersArray,
      },
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

  const submitProject = async (teamId, nftUri) => {
    const parameters = {
      abi: abi.dappHack,
      contractAddress: contractAddress.dappHack,
      functionName: "submitProject",
      params: {
        teamNumber: teamId,
        nftUri: projectName,
      },
      msgValue: 0,
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

  const judgeWinners = async (name, trackWinnerArray, poolPrizeArray) => {
    const parameters = {
      abi: abi.dappHack,
      contractAddress: contractAddress.dappHack,
      functionName: "judgeWinners",
      params: {
        _sponsor_name: name,
        trackWinners: trackWinnerArray,
        poolPrizeWinners: poolPrizeArray,
      },
      msgValue: 0,
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

  const distributePrize = async () => {
    const parameters = {
      abi: abi.dappHack,
      contractAddress: contractAddress.dappHack,
      functionName: "distributePrize",
      params: {},
      msgValue: 0,
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

  const getSponsorName = async (sponsorId) => {
    const parameters = {
      abi: abi.dappHack,
      contractAddress: contractAddress.dappHack,
      functionName: "getSponsorName",
      params: {
        sponsorNumber: sponsorId,
      },
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
      console.log(response.result);
      return response.result;
    } catch (error) {
      console.log(error);
    }
  };
  const getSponsorCount = async () => {
    const parameters = {
      abi: abi.dappHack,
      contractAddress: contractAddress.dappHack,
      functionName: "getSponsorCount",
      params: {},
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
      console.log(response.result);
      return response.result;
    } catch (error) {
      console.log(error);
    }
  };

  const getSponsorAddress = async (sponsorId) => {
    const parameters = {
      abi: abi.dappHack,
      contractAddress: contractAddress.dappHack,
      functionName: "getSponsorAddress",
      params: {
        sponsorNumber: sponsorId,
      },
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
      console.log(response.result);
      return response.result;
    } catch (error) {
      console.log(error);
    }
  };

  const getBuilderCount = async () => {
    const parameters = {
      abi: abi.dappHack,
      contractAddress: contractAddress.dappHack,
      functionName: "getBuilderCount",
      params: {},
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
      console.log(response.result);
      return response.result;
    } catch (error) {
      console.log(error);
    }
  };

  const getTeamCount = async () => {
    const parameters = {
      abi: abi.dappHack,
      contractAddress: contractAddress.dappHack,
      functionName: "getTeamCount",
      params: {},
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
      console.log(response.result);
      return response.result;
    } catch (error) {
      console.log(error);
    }
  };

  const getTeamName = async (teamId) => {
    const parameters = {
      abi: abi.dappHack,
      contractAddress: contractAddress.dappHack,
      functionName: "getTeamName",
      params: {
        teamNumber: teamId,
      },
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
      console.log(response.result);
      return response.result;
    } catch (error) {
      console.log(error);
    }
  };

  const getTeamParticipantAddress = async (teamId, participantId) => {
    const parameters = {
      abi: abi.dappHack,
      contractAddress: contractAddress.dappHack,
      functionName: "getTeamParticipantAddress",
      params: {
        teamNumber: teamId,
        participantNumber: participantId,
      },
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
      console.log(response.result);
      return response.result;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    builderSignup,
    sponsorSignup,
    createTeam,
    submitProject,
    judgeWinners,
    distributePrize,
    getSponsorName,
    getSponsorCount,
    getSponsorAddress,
    getBuilderCount,
    getTeamCount,
    getTeamName,
  };
};
export default useDappHack;
