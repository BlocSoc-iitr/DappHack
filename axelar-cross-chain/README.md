# DAPPHACK AXELAR CONTRACTS

## Overview

Some basic contracts of dapphack have been implemented here to demonstrate the cross-chain functionality of the Axelar Network. The contracts are written in solidity and are deployed on the Axelar Testnet.

## Usage

Axelar is core to our product. All our cross-chain functionalities come with the help of Axelar. We used various Axelar SDKs to write contracts along with their implementation on different chains and integrate them with UI. With the help of Axelar, we were able to provide multi-chain functionalities to our Dapp. We have written some good contracts which could be seen here [Axelar Contracts](https://github.com/BlocSoc-iitr/DappHack/tree/master/axelar-cross-chain). We have used axelar's gmp sdk, js sdk, axelar-local-dev, etc to make our contracts testing easy.

With axelar we deployed parent hackathon contracts one chain and child contracts on other different chains which are connected with the help of axelar. This enables sponsor to sponsor the hackathon on any chain and participants to participate and provide stake on any supported chain by communicating state through axelar gateways.

Some of our successful transactions on axelar can be seen here -
[0x9299eac94952235Ae86b94122D2f7c77F7F6Ad30](https://testnet.axelarscan.io/address/0x9299eac94952235Ae86b94122D2f7c77F7F6Ad30?tab=general_message_passing)

While working on axelar we have some feedback -

1. SDKs and axelar-example repo was of great help and the dev skills on them are really very very good.
2. There's some issue with configuration of filecoin calibnet, we had to tweak some node modules of axelarjs sdk to get them working.
3. The gas payment from axelarscan was not working even after connecting wallet.
 <!-- GETTING STARTED -->

## Getting Started

To Test the contracts, you can use the following steps:

### Prerequisites

Intialize the project and install the dependencies

-   npm
    ```sh
    git clone https://github.com/BlocSoc-iitr/DappHack.git
    cd axelar-cross-chain
    npm install
    ```

### Deploying the contracts

1. Enter your private key in `.env`
    ```js
    const PRIVATE_KEY = 'ENTER YOUR KEY';
    ```
2. Currently the parent chain is set to Filecoin which could be changed in deploy.js and execute.js.
   Filecoin calibnet tokens would be needed which you could get [here](https://faucet.calibration.fildev.network/)
3. Compile the contracts
    ```sh
    npm run build
    ```
4. Deploy the contracts on parent chain with
    ```sh
    npm run deploy parent testnet Filecoin
    ```
5. Deploy the contracts on any child chain (polygon here) with
    ```sh
    npm run deploy child testnet Polygon
    ```
6. Now you can interact with the contracts with the help of execute.js. This would register you as builder in hacathon.
    ```sh
    npm run execute child testnet Polygon Filecoin
    ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>
