"use client";
import { useState } from "react";
import PageTemplate from "@/components/PageTemplate";
import classes from "@/styles/HackPage.module.css";
import HackOverview from "@/components/HackOverview";
import HackPrizes from "@/components/HackPrizes";
import useWeb3 from "@/utils/useWeb3";
// import { ConnectButton } from "web3uikit";
import useDeployContract from "@/utils/useDeployContract";
import useDappHack from "@/utils/useDappHack";
import useCrossDappHack from "@/utils/useCrossDappHack";
const pageNavigators = ["Overview", "Projects", "Timeline", "Prizes"];
const HackPage = () => {
  const [selectedNavigator, setSelectedNavigator] = useState(pageNavigators[0]);

  const handleNavigatorClick = (navigator) => {
    setSelectedNavigator(navigator);
  };
  const { chainId, userAccount, Moralis, isWeb3Enabled, web3 } = useWeb3();
  console.log(isWeb3Enabled);
  const startTime = 0; // Replace with your desired start time
  const endTime = 163; // Replace with your desired end time
  const maxParticipants = 100; // Replace with your desired maximum number of participants
  const teamSizeLimit = 5; // Replace with your desired maximum team size
  const organizers = ["0x9299eac94952235ae86b94122d2f7c77f7f6ad30"]; // Replace with your desired organizer addresses
  const name = "My Project NFT"; // Replace with your desired project NFT name
  const symbol = "MPN"; // Replace with your desired project NFT symbol
  const gateway = "0xC249632c2D40b9001FE907806902f63038B737Ab";
  const gasService = "0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6";
  const { deployParentContract } = useDeployContract();
  const { builderSignup } = useDappHack();
  const { crossBuilderSignup } = useCrossDappHack();
  return (
    <PageTemplate>
      {/* <ConnectButton moralisAuth={false} /> */}
      <button
        onClick={() =>
          deployParentContract([
            startTime,
            endTime,
            maxParticipants,
            teamSizeLimit,
            organizers,
            name,
            symbol,
            gateway,
            gasService,
          ])
        }
      >
        Deploy
      </button>
      <button onClick={() => builderSignup()}>Signup</button>
      <button onClick={() => crossBuilderSignup()}>Cross Signup</button>
      <div className={classes["page-navigator"]}>
        <ul className={classes["links-list"]}>
          {pageNavigators.map((navigator) => (
            <li
              key={navigator}
              className={navigator === selectedNavigator ? classes.active : ""}
              onClick={() => handleNavigatorClick(navigator)}
            >
              {navigator}
            </li>
          ))}
        </ul>
      </div>
      {/* {selectedNavigator === "Overview" && <HackOverview />} */}
      {selectedNavigator === "Prizes" ? <HackPrizes /> : <HackOverview />}
    </PageTemplate>
  );
};

export default HackPage;
