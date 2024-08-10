// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { AxelarExecutable } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/executable/AxelarExecutable.sol';
import { IAxelarGateway } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGateway.sol';
import { IAxelarGasService } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGasService.sol';

contract CrossDappHack is AxelarExecutable {
  IAxelarGasService public immutable gasService;
  uint256 public constant STAKE = 10000000000000;

  constructor(address gateway_, address gasService_) AxelarExecutable(gateway_){
    gasService = IAxelarGasService(gasService_);
  }

  modifier DuplicateParticipants(address[] memory participant) {
        address[] memory AllParticipants = new address[](1 + participant.length);
    
        for (uint i = 0 ; i != participant.length; i++ ){
            AllParticipants[i] = participant[i];
        }
        
        AllParticipants[participant.length] = msg.sender;

        for (uint i = 0; i != AllParticipants.length; i++ ) {
            for (uint j = i + 1; j != AllParticipants.length; j++ ) {
                if(AllParticipants[j] == AllParticipants[i]) {
                   revert("Duplicate Participants");
                }
              
            }
           
        }
       
        _;
    }

    function crossBuilderSignup(
        string calldata destinationChain,
        string calldata destinationAddress
    ) external payable {
        //could be exploited. Include gas fee in the the require
        require(msg.value > STAKE, 'Stake is not enough');

        bytes memory payload = abi.encode("builderSignup" , msg.sender);
        gasService.payNativeGasForContractCall{ value: msg.value - STAKE }(
            address(this),
            destinationChain,
            destinationAddress,
            payload,
            msg.sender
        );
        gateway.callContract(destinationChain, destinationAddress, payload);
        // payable(address(this)).transfer(STAKE);

    }

  function crossinitializeTeam(
      string calldata destinationChain,
      string calldata destinationAddress,
      string calldata name,
      address[] calldata participants
  ) public payable DuplicateParticipants(participants) {
      address[] memory totalParticipants = new address[](participants.length + 1);
      
      for(uint i = 0; i < participants.length; i++){
          totalParticipants[i] = participants[i];
      }
      totalParticipants[participants.length] = msg.sender;

      bytes memory payload = abi.encode("initializeTeam" , name, totalParticipants);
      gateway.callContract(destinationChain, destinationAddress, payload);

      gasService.payNativeGasForContractCall{ value: msg.value }(
            address(this),
            destinationChain,
            destinationAddress,
            payload,
            msg.sender
        );
      gateway.callContract(destinationChain, destinationAddress, payload);   

  }  

  function crossjoinTeam(
      string calldata destinationChain,
      string calldata destinationAddress,
      uint256 teamIndex
  ) public payable {
      bytes memory payload = abi.encode( "joinTeam" , teamIndex , msg.sender);
      gateway.callContract(destinationChain, destinationAddress, payload);

      gasService.payNativeGasForContractCall{ value: msg.value }(
            address(this),
            destinationChain,
            destinationAddress,
            payload,
            msg.sender
        );
      gateway.callContract(destinationChain, destinationAddress, payload);   

  }
  
  function crosswithdrawTeam(
      string calldata destinationChain,
      string calldata destinationAddress,
      uint256 participantIndex,
      uint256 teamIndex
  ) public payable {
      bytes memory payload = abi.encode("withdrawTeam" , participantIndex , teamIndex , msg.sender);
      gateway.callContract(destinationChain, destinationAddress, payload);

      gasService.payNativeGasForContractCall{ value: msg.value }(
            address(this),
            destinationChain,
            destinationAddress,
            payload,
            msg.sender
        );
      gateway.callContract(destinationChain, destinationAddress, payload);   

  }

  function crosssubmitProject(
      string calldata destinationChain,
      string calldata destinationAddress,
      uint256 teamNumber,
      string memory nftUri
  ) public payable {
      bytes memory payload = abi.encode("submitProject" , teamNumber , nftUri , msg.sender);
      gateway.callContract(destinationChain, destinationAddress, payload);

      gasService.payNativeGasForContractCall{ value: msg.value }(
            address(this),
            destinationChain,
            destinationAddress,
            payload,
            msg.sender
        );
      gateway.callContract(destinationChain, destinationAddress, payload);   

  }

  function crossjudgeWinner(
      string calldata destinationChain,
      string calldata destinationAddress,
      string memory _sponsor_name,
      uint256[] memory trackWinners,
      uint256[] memory poolPrizeWinners
  ) public payable {
      bytes memory payload = abi.encode("judgeWinner" , _sponsor_name, trackWinners, poolPrizeWinners, msg.sender );
      gateway.callContract(destinationChain, destinationAddress, payload);

      gasService.payNativeGasForContractCall{ value: msg.value }(
            address(this),
            destinationChain,
            destinationAddress,
            payload,
            msg.sender
        );
      gateway.callContract(destinationChain, destinationAddress, payload);   

  }


}