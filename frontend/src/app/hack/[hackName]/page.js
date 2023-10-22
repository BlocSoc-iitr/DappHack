"use client";
import { useState, useEffect } from "react";
import PageTemplate from "@/components/PageTemplate";
import classes from "@/styles/HackPage.module.css";
import HackOverview from "@/components/HackOverview";
import HackPrizes from "@/components/HackPrizes";
import useWeb3 from "@/utils/useWeb3";
// import { ConnectButton } from "web3uikit";
import useDeployContract from "@/utils/useDeployContract";
import useDappHack from "@/utils/useDappHack";
import useCrossDappHack from "@/utils/useCrossDappHack";
import useDatabase from "@/utils/useDatabase";
import { tableName } from "@/utils/useDatabase";
const pageNavigators = ["Overview", "Projects", "Timeline", "Prizes"];
const HackPage = ({ params }) => {
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
  const { createDatabase } = useDatabase();
  const { deployParentContract } = useDeployContract();
  const { builderSignup } = useDappHack();
  const { crossBuilderSignup } = useCrossDappHack();

  const [hackData, setHackData] = useState([]);
  const { readDatabase } = useDatabase();
  console.log(params.hackName.replace("%20", " "));

  useEffect(() => {
    const fetch = async () => {
      // const hackData = await readDatabase(tableName);
      // const filtered = hackData.filter(
      //   (hack) => hack.name.hackName === params["hackName"]
      // );
      const hackData = [];
      hackData.push({
        id: 1,
        name: {
          description: "test",
          endTime: 5000,
          gasService: "0xbe406f0189a0b4cf3a05c286473d23791dd44cc6",
          gateway: "0x999117D44220F33e0441fbAb2A5aDB8FF485c54D",
          hackName: "ethonline",
          maxParticipants: 500,
          organizer: ["0xA65920F5F3672dacf04e20DBAA99DE4053324d96"],
          rules: ["submit the project"],
          startTime: 1000,
          symbol: "TH",
          teamSizeLimit: 5,
        },
      });
      setHackData(hackData[0].name);
    };

    fetch();
  }, []);
  console.log(hackData);
  return (
    <PageTemplate>
      {/* <ConnectButton moralisAuth={false} /> */}
      {/* <button
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
      <button onClick={() => createDatabase("project")}>create db</button>
      <button onClick={() => crossBuilderSignup()}>Cross Signup</button> */}
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
      {selectedNavigator === "Prizes" ? (
        <HackPrizes />
      ) : (
        <HackOverview hackData={hackData} />
      )}
    </PageTemplate>
  );
};

export default HackPage;
