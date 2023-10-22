import { EPNSChannel } from '../../helpers/epnschannel';
import config from '../../config';
import { Logger } from 'winston';
import { Inject, Service } from 'typedi';
import DappHackSettings from './DappHackSettings.json';
import axios from 'axios';
import request, { gql } from 'graphql-request';
import {abi} from './abi';
import { DappHackModel, IDappHackData } from './DappHackModel';
import { latest } from '@pushprotocol/restapi/src/lib/chat';

@Service()
export default class DappHackChannel extends EPNSChannel {
  constructor(@Inject('logger') public logger: Logger, @Inject('cached') public cached) {
    super(logger, {
      networkToMonitor: config.web3MainnetNetwork,
      dirname: __dirname,
      name: 'DappHack',
      url: 'https://github.com/DappHack',
      useOffChain: true,
    });
  }

  async notifyAuthRequest(simulate: any) {
     //  Overide logic if need be
     const logicOverride =
     typeof simulate == 'object'
       ? simulate.hasOwnProperty('logicOverride')
         ? simulate.hasOwnProperty('logicOverride')
         : false
       : false;
     let latestBlockNumber = simulate.logicOverride.mode
        ? simulate.logicOverride.latestBlockNumber
        : await this.getDappHackDataFromDB();
   //  -- End Override logic

   let { initiateAuthentications} = await request(
      DappHackSettings.DappHack_subgraph,
      this.fetchAuthRequestData()
    );

    if(latestBlockNumber == null) {
      latestBlockNumber = initiateAuthentications[initiateAuthentications.length - 1].txBlockNumber;
      this.setDappHackDataInDB({ latestBlockNumber: latestBlockNumber });
    }
    
    for(const authRequest of initiateAuthentications){
      if(authRequest.txBlockNumber > latestBlockNumber) {
        const title = `DappHack Auth Request`;
      const message = `DappHack has request for authentication\n [t: Transaction Id:]${authRequest.txId}\n [s: Transaction Block Number:] ${authRequest.txBlockNumber}\n [d: Transaction Timestamp:] ${authRequest.txTimestamp}`;
      const payloadTitle = `DappHack Auth Request`;
      const payloadMsg = `DappHack has request for authentication\n [t: Transaction Id:]${authRequest.txId}\n [s: Transaction Block Number:] ${authRequest.txBlockNumber}\n [d: Transaction Timestamp:] ${authRequest.txTimestamp}`;
      const cta = `https://goerli.etherscan.io/tx/${authRequest.transactionHash}`;
      const payload = {
        type: 3, // Type of Notification
        notifTitle: title, // Title of Notification
        notifMsg: message, // Message of Notification
        title: payloadTitle, // Internal Title
        msg: payloadMsg, // Internal Message
        cta: cta, // Call to Action String
      };
      const receipents = simulate.hasOwnProperty('txOverride') && simulate.txOverride.mode
        ? simulate.txOverride.receipents
        : authRequest.user;
      this.sendNotification({
        recipient: receipents,
        title: payload.notifTitle,
        message: payload.notifMsg,
        payloadTitle: payload.title,
        payloadMsg: payload.msg,
        notificationType: payload.type,
        cta: payload.cta,
        image: null,
        simulate: simulate,
      });
      }
    }
    this.setDappHackDataInDB({ latestBlockNumber: initiateAuthentications[initiateAuthentications.length - 1].txBlockNumber });
  }

  async notifyAuthConfirmation(simulate: any) {
    //  Overide logic if need be
    const logicOverride =
    typeof simulate == 'object'
      ? simulate.hasOwnProperty('logicOverride')
        ? simulate.hasOwnProperty('logicOverride')
        : false
      : false;
    let latestBlockNumber = simulate.logicOverride.mode
       ? simulate.logicOverride.latestBlockNumber
       : await this.getDappHackDataFromDB();
  //  -- End Override logic

  let { authenticationCompleteds } = await request(
     DappHackSettings.DappHack_subgraph,
     this.fetchAuthConfirmationData()
   );

   if(latestBlockNumber == null) {
     latestBlockNumber = authenticationCompleteds[authenticationCompleteds.length - 1].txBlockNumber;
     this.setDappHackDataInDB({ latestBlockNumber: latestBlockNumber });
   }
   
   for(const authRequest of authenticationCompleteds){
     if(authRequest.txBlockNumber > latestBlockNumber) {
       const title = `DappHack Authorized`;
     const message = authRequest.success
       ? `Your transaction has been authorized by DappHack\n [t: Transaction Id:]${authRequest.txId}\n [s: Transaction Block Number:] ${authRequest.txBlockNumber}\n [d: Transaction Timestamp:] ${authRequest.txTimestamp}`
       : `Your transaction has been rejected by DappHack\n [t: Transaction Id:]${authRequest.txId}\n [s: Transaction Block Number:] ${authRequest.txBlockNumber}\n [d: Transaction Timestamp:] ${authRequest.txTimestamp}`;
     const payloadTitle = `DappHack Authorized`;
     const payloadMsg = authRequest.success
        ? `Your transaction has been authorized by DappHack\n [t: Transaction Id:]${authRequest.txId}\n [s: Transaction Block Number:] ${authRequest.txBlockNumber}\n [d: Transaction Timestamp:] ${authRequest.txTimestamp}`
        : `Your transaction has been rejected by DappHack\n [t: Transaction Id:]${authRequest.txId}\n [s: Transaction Block Number:] ${authRequest.txBlockNumber}\n [d: Transaction Timestamp:] ${authRequest.txTimestamp}`;
     const cta = `https://goerli.etherscan.io/tx/${authRequest.transactionHash}`;
     const payload = {
       type: 3, // Type of Notification
       notifTitle: title, // Title of Notification
       notifMsg: message, // Message of Notification
       title: payloadTitle, // Internal Title
       msg: payloadMsg, // Internal Message
       cta: cta, // Call to Action String
     };
     const receipents = simulate.hasOwnProperty('txOverride') && simulate.txOverride.mode
       ? simulate.txOverride.receipents
       : authRequest.user;
     this.sendNotification({
       recipient: receipents,
       title: payload.notifTitle,
       message: payload.notifMsg,
       payloadTitle: payload.title,
       payloadMsg: payload.msg,
       notificationType: payload.type,
       cta: payload.cta,
       image: null,
       simulate: simulate,
     });
     }
   }
   this.setDappHackDataInDB({ latestBlockNumber: authenticationCompleteds[authenticationCompleteds.length - 1].txBlockNumber });
 }

  async getDappHackDataFromDB() {
    this.logInfo(`Getting DappHack Data from DB..`);
    const doc = await DappHackModel.findOne({ _id: 'DappHack_DATA' });
    this.log("DappHack Data Fetched Successfully");
    return doc;
  }
  
  async setDappHackDataInDB(data: IDappHackData) {
    this.logInfo(`Setting DappHack DATA to DB %o`);
    await DappHackModel.findOneAndUpdate({ _id: 'DappHack_DATA' }, data, { upsert: true });
     this.logInfo('DappHack Data Set Successfully');
  }

  private fetchAuthRequestData() {
    return gql`
      query Query {
        initiateAuthentications {
          id
          user
          txId
          methodId
          transactionHash
          txBlockNumber
          txTimestamp
        }
      }
    `;
  }

  private fetchAuthConfirmationData() {
    return gql`
      query Query {
        authenticationCompleteds {
          id
          success
          user
          txId
          contract
          methodId
          transactionHash
          txBlockNumber
          txTimestamp
          value
        }
      }
    `;
  }
}
