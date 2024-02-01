import useHandleContractWrite from "./useHandleContractWrite";
import useHandleContractRead from "./useHandleContractRead";
import { parseEther } from "viem";

const useDappHack = () => {
  const stake = parseEther("0.01");

  // builderSignup function
  const {
    data: dataBuilderSignup,
    isLoading: isLoadingBuilderSignup,
    isSuccess: isSuccessBuilderSignup,
    write: writeBuilderSignup,
  } = useHandleContractWrite({
    functionName: "builderSignup",
  });
  const builderSignup = async () => {
    try {
      const response = await writeBuilderSignup({
        args: [],
        value: stake,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // sponsorSignup function
  const {
    data: dataSponsorSignup,
    isLoading: isLoadingSponsorSignup,
    isSuccess: isSuccessSponsorSignup,
    write: writeSponsorSignup,
  } = useHandleContractWrite({
    functionName: "sponsorSignup",
  });
  const sponsorSignup = async (data) => {
    const name = data[0];
    const sponsorArray = data[1];
    const prizeArray = data[2];
    const poolPrize = data[3];
    const numberofPoolPrize = data[4];
    console.log(name, sponsorArray, prizeArray, poolPrize, numberofPoolPrize);

    let sum = 0;
    for (let i = 0; i < prizeArray.length; i++) {
      sum += prizeArray[i];
    }
    try {
      const response = await writeSponsorSignup({
        args: [name, sponsorArray, prizeArray, poolPrize, numberofPoolPrize],
        value: sum + poolPrize,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // createTeam function
  const {
    data: dataCreateTeam,
    isLoading: isLoadingCreateTeam,
    isSuccess: isSuccessCreateTeam,
    write: writeCreateTeam,
  } = useHandleContractWrite({
    functionName: "initializeTeam",
  });
  const createTeam = async (teamName, teamMembersArray) => {
    try {
      const response = await writeCreateTeam({
        args: [teamName, teamMembersArray],
        value: 0,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // submitProject function
  const {
    data: dataSubmitProject,
    isLoading: isLoadingSubmitProject,
    isSuccess: isSuccessSubmitProject,
    write: writeSubmitProject,
  } = useHandleContractWrite({
    functionName: "submitProject",
  });
  const submitProject = async (teamId, nftUri) => {
    try {
      const response = await writeSubmitProject({
        args: [teamId, nftUri],
        value: 0,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // judgeWinners function
  const {
    data: dataJudgeWinners,
    isLoading: isLoadingJudgeWinners,
    isSuccess: isSuccessJudgeWinners,
    write: writeJudgeWinners,
  } = useHandleContractWrite({
    functionName: "judgeWinners",
  });
  const judgeWinners = async (name, trackWinnerArray, poolPrizeArray) => {
    try {
      const response = await writeJudgeWinners({
        args: [name, trackWinnerArray, poolPrizeArray],
        value: 0,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // distributePrize function
  const {
    data: dataDistributePrize,
    isLoading: isLoadingDistributePrize,
    isSuccess: isSuccessDistributePrize,
    write: writeDistributePrize,
  } = useHandleContractWrite({
    functionName: "distributePrize",
  });
  const distributePrize = async () => {
    try {
      const response = await writeDistributePrize({
        args: [],
        value: 0,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // getSponsorName function
  const {
    data: dataGetSponsorName,
    isLoading: isLoadingGetSponsorName,
    isSuccess: isSuccessGetSponsorName,
    refetch: refetchGetSponsorName,
  } = useHandleContractRead({
    functionName: "getSponsorName",
    args: [1],
  });
  const getSponsorName = async (sponsorId) => {
    try {
      const response = await refetchGetSponsorName(
        {
          args: [sponsorId],
        },
        { force: true }
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  // getSponsorCount function
  const {
    data: dataGetSponsorCount,
    isLoading: isLoadingGetSponsorCount,
    isSuccess: isSuccessGetSponsorCount,
  } = useHandleContractRead({
    functionName: "getSponsorCount",
    args: [],
  });
  const getSponsorCount = async () => {
    try {
      console.log(
        dataGetSponsorCount,
        isLoadingGetSponsorCount,
        isSuccessGetSponsorCount
      );
      return dataGetSponsorCount;
    } catch (error) {
      console.log(error);
    }
  };

  // getSponsorAddress function
  const {
    data: dataGetSponsorAddress,
    isLoading: isLoadingGetSponsorAddress,
    isSuccess: isSuccessGetSponsorAddress,
    refetch: refetchGetSponsorAddress,
  } = useHandleContractRead({
    functionName: "getSponsorAddress",
    args: [1],
  });

  const getSponsorAddress = async (sponsorId) => {
    try {
      const response = await refetchGetSponsorAddress(
        {
          args: [sponsorId],
        },
        { force: true }
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  // getBuilderCount function
  const {
    data: dataGetBuilderCount,
    isLoading: isLoadingGetBuilderCount,
    isSuccess: isSuccessGetBuilderCount,
  } = useHandleContractRead({
    functionName: "getBuilderCount",
    args: [],
  });

  const getBuilderCount = async () => {
    try {
      console.log(
        dataGetBuilderCount,
        isLoadingGetBuilderCount,
        isSuccessGetBuilderCount
      );
      return dataGetBuilderCount;
    } catch (error) {
      console.log(error);
    }
  };

  // getTeamCount function
  const {
    data: dataGetTeamCount,
    isLoading: isLoadingGetTeamCount,
    isSuccess: isSuccessGetTeamCount,
  } = useHandleContractRead({
    functionName: "getTeamCount",
    args: [],
  });
  const getTeamCount = async () => {
    try {
      console.log(
        dataGetTeamCount,
        isLoadingGetTeamCount,
        isSuccessGetTeamCount
      );
      return dataGetTeamCount;
    } catch (error) {
      console.log(error);
    }
  };

  // getTeamName function
  const {
    data: dataGetTeamName,
    isLoading: isLoadingGetTeamName,
    isSuccess: isSuccessGetTeamName,
    refetch: refetchGetTeamName,
  } = useHandleContractRead({
    functionName: "getTeamName",
    args: [1],
  });
  const getTeamName = async (teamId) => {
    try {
      const response = await refetchGetTeamName(
        {
          args: [teamId],
        },
        { force: true }
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  // getTeamParticipantCount function
  const {
    data: dataGetTeamParticipantCount,
    isLoading: isLoadingGetTeamParticipantCount,
    isSuccess: isSuccessGetTeamParticipantCount,
    refetch: refetchGetTeamParticipantCount,
  } = useHandleContractRead({
    functionName: "getTeamParticipantCount",
    args: [1, 1],
  });
  const getTeamParticipantAddress = async (teamId, participantId) => {
    try {
      const response = await refetchGetTeamParticipantCount(
        {
          args: [teamId, participantId],
        },
        { force: true }
      );
      console.log(response);
      return response;
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
    getTeamParticipantAddress,
  };
};
export default useDappHack;
