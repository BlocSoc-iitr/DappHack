// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { AxelarExecutable } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/executable/AxelarExecutable.sol';
import { IAxelarGateway } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGateway.sol';
import { IAxelarGasService } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGasService.sol';

contract CrossDappHack is AxelarExecutable {
  IAxelarGasService public immutable gasService;
  uint256 public constant STAKE = 1000000000000000;

  constructor(address gateway_, address gasService_) AxelarExecutable(gateway_){
    gasService = IAxelarGasService(gasService_);
  }

    function crossBuilderSignup(
        string calldata destinationChain,
        string calldata destinationAddress
    ) external payable {
        //could be exploited. Include gas fee in the the require
        require(msg.value > STAKE, 'Stake is not enough');
                payable(address(this)).transfer(STAKE);

        bytes memory payload = abi.encode(msg.sender);
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