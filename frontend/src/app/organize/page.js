"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import classes from "@/styles/Organizer.module.css";
import Image from "next/image";
import offlineIcon from "../../../public/icons/offline.svg";
import onlineIcon from "../../../public/icons/online.svg";
import ImageSelector from "@/components/ImageSelector";
import { useNetwork } from "wagmi";
import testNets from "@axelar-network/axelar-chains-config/info/testnet.json";
import useDeployContract from "@/utils/useDeployContract";
import useDatabase from "@/utils/useDatabase";
import MinorPageTemplate from "@/components/MinorPageTemplate";

const Page = () => {
  const [aboutHack, setAboutHack] = useState({
    hackName: "Test Hack",
    startTime: 1000,
    endTime: 5000,
    maxParticipants: 500,
    teamSizeLimit: 5,
    description: "test",
    symbol: "TH",
  });

  const [axelar, setAxelar] = useState({ gateway: "", gasService: "" });
  const { chain } = useNetwork();
  const chainId = chain?.id;
  const [organizer, setOrganizer] = useState([
    "0xA65920F5F3672dacf04e20DBAA99DE4053324d96",
  ]);
  const [rules, setRules] = useState(["submit the projects"]);
  const [file, setFile] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const { deployParentContract, deployChildContract } = useDeployContract();
  const [chainUsed, setChainUsed] = useState(null);
  const [buttonTitle, setButtonTitle] = useState("Submit");
  const { createHackathon } = useDatabase();

  const handleChange = (name) => (event) => {
    setAboutHack({ ...aboutHack, [name]: event.target.value });
  };

  const handleAddOraganizer = (event) => {
    event.preventDefault();
    const address = event.target.elements["team-member-address"].value;
    setOrganizer([...teamMembers, address]);
    event.target.reset();
  };

  const handleRemoveOrganizer = (index) => {
    setRules(teamMembers.filter((_, i) => i !== index));
  };
  const handleAddRule = (event) => {
    event.preventDefault();
    const address = event.target.elements["hack-rule"].value;
    setRules([...teamMembers, address]);
    event.target.reset();
  };

  const handleRemoveRule = (index) => {
    setOrganizer(teamMembers.filter((_, i) => i !== index));
  };
  const handleParentDeploy = async () => {
    const parentArguments = [
      500,
      1000,
      aboutHack.maxParticipants,
      aboutHack.teamSizeLimit,
      organizer,
      aboutHack.hackName,
      aboutHack.symbol,
      axelar.gateway,
      axelar.gasService,
    ];
    const tableData = {
      startTime: aboutHack.startTime,
      endTime: aboutHack.endTime,
      maxParticipants: aboutHack.maxParticipants,
      teamSizeLimit: aboutHack.teamSizeLimit,
      organizer: organizer,
      hackName: aboutHack.hackName,
      symbol: aboutHack.symbol,
      gateway: axelar.gateway,
      gasService: axelar.gasService,
      description: aboutHack.description,
      rules: rules,
    };
    try {
      setLoading(true);
      setChainUsed(chainId);
      await createHackathon(JSON.stringify(tableData));
      // const contractAddress = await deployParentContract(parentArguments);
      console.log(contractAddress); // if (typeof contractAddress != "undefined") {

      setButtonTitle("Change Chain");

      // }
    } catch (err) {
      console.log(err);
      setLoading(false);
      setButtonTitle("Change Chain");
    }
  };
  const handleChildDeploy = async () => {
    try {
      const result = await deployChildContract([
        axelar.gateway,
        axelar.gasService,
      ]);
      console.log(result);
      setChainUsed(null);
      setButtonTitle("Submit");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(Object.values(testNets.chains));
    const filteredTestNets = Object.values(testNets.chains).filter(
      (testNet) => {
        console.log(testNet.chainId);
        return testNet.chainId == chainId;
      }
    );

    const gateway = filteredTestNets[0]?.contracts["AxelarGateway"].address;
    const gasService =
      filteredTestNets[0]?.contracts["AxelarGasService"].address;
    setAxelar({ gateway, gasService });
    console.log(gasService, gateway);
  }, [chainId]);
  return (
    <MinorPageTemplate>
      <div className={`page ${classes.right}`}>
        {/* <button
          onClick={() => {
            deployChildContract([axelar.gateway, axelar.gasService]);
          }}
        >
          deployChildContract
        </button> */}
        <h1 className={classes.heading}>Organiser Registration</h1>
        <div className={classes["mode-selection"]}>
          <h1>Mode of Hackathon</h1>
          <div className={classes.selection}>
            <div className={classes.offline}>
              <div className={classes["icon-row"]}>
                <Image src={offlineIcon} alt="offline" /> Offline
              </div>
              <p>For regular on-site hackathon</p>
            </div>
            <div className={classes.online}>
              <div className={classes["icon-row"]}>
                <Image src={onlineIcon} alt="offline" /> Online
              </div>
              <p>For Beginner-friendly hackathons </p>
            </div>
          </div>
        </div>
        <div className={classes["hack-details-container"]}>
          <h1>Hackathon Name</h1>
          <div className={classes["hack-input-container"]}>
            <div className={classes["hack-single"]}>
              <div className={classes["input-field-container"]}>
                <label htmlFor="hack-name">
                  Name (You can change this later)
                </label>
                <input
                  type="text"
                  id="hack-name"
                  placeholder="What are calling your hackathon?"
                  value={aboutHack.hackName}
                  onChange={handleChange("hackName")}
                />
              </div>

              <div className={classes["input-field-container"]}>
                <label htmlFor="start-time">Start time</label>
                <input
                  type="date"
                  id="start-time"
                  value={aboutHack.startTime}
                  onChange={handleChange("startTime")}
                />
              </div>
              <div className={classes["input-field-container"]}>
                <label htmlFor="end-time">End time</label>
                <input
                  type="date"
                  id="end-time"
                  value={aboutHack.endTime}
                  onChange={handleChange("endTime")}
                />
              </div>
              <div className={classes["input-field-container"]}>
                <label htmlFor="max-participants">Max Paticipants</label>
                <input
                  type="number"
                  id="max-participants"
                  placeholder="No. of Participants"
                  value={aboutHack.maxParticipants}
                  onChange={handleChange("maxParticipants")}
                />
              </div>
              <div className={classes["input-field-container"]}>
                <label htmlFor="team-size">Team Size Limit</label>
                <input
                  type="number"
                  id="team-size"
                  placeholder="Limit size of a team"
                  value={aboutHack.teamSizeLimit}
                  onChange={handleChange("teamSizeLimit")}
                />
              </div>
              <div className={classes["input-field-container"]}>
                <label htmlFor="symbol">Symbol</label>
                <input
                  type="text"
                  id="symbol"
                  placeholder="Your Hack Symbol"
                  value={aboutHack.symbol}
                  onChange={handleChange("symbol")}
                />
              </div>
              <div className={classes["input-field-container"]}>
                <label htmlFor="about-hack">Description</label>
                <textarea
                  type="text"
                  id="about-hack"
                  placeholder="Tell about your hackathon?"
                  rows={6}
                  value={aboutHack.description}
                  onChange={handleChange("description")}
                />
              </div>
            </div>
            <div className={classes["address-container"]}>
              <h3>Organizer:</h3>
              <form onSubmit={handleAddOraganizer}>
                <input
                  type="text"
                  placeholder="Enter Organizer's Address"
                  name="team-member-address"
                />
                <button className={classes["add-btn"]}>Add</button>
              </form>
            </div>
            <div className={classes["team-members-infromation"]}>
              <div className={classes.row}>
                <p>No.</p>
                <p>Organizer's Address</p>
                <p>Action</p>
              </div>
              {organizer.map((address, index) => (
                <div className={classes.row} key={address}>
                  <p>Organizer {index + 1}</p>
                  <p>{address}</p>
                  <div>
                    <button onClick={() => handleRemoveOrganizer(index)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className={classes["address-container"]}>
              <h3>Rules:</h3>
              <form onSubmit={handleAddRule}>
                <input
                  type="text"
                  placeholder="Enter Rule Details"
                  name="hack-rule"
                />
                <button className={classes["add-btn"]}>Add</button>
              </form>
            </div>
            <div className={classes["team-members-infromation"]}>
              <div className={classes.row}>
                <p style={{ flex: "1" }}>No.</p>
                <p style={{ flex: "4" }}>Rule</p>
                <p style={{ flex: "1" }}>Action</p>
              </div>
              {rules.map((rule, index) => (
                <div className={classes.row} key={rule}>
                  <p style={{ flex: "1" }}>Rule {index + 1}</p>
                  <p style={{ flex: "4" }}>{rule}</p>
                  <div style={{ flex: "1" }}>
                    <button onClick={() => handleRemoveRule(index)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div
              className={classes["address-container"]}
              style={{ alignItems: "flex-start" }}
            >
              <h3>Hack Image:</h3>
              <ImageSelector
                title={"Hack Image"}
                file={file}
                setFile={setFile}
              />
            </div>
          </div>
        </div>
        <div className={classes["btn-group"]}>
          <button className={classes["cancel-btn"]}>Cancel</button>
          <button
            onClick={handleParentDeploy}
            disabled={buttonTitle === "Change Chain"}
            className={classes["next-btn"]}
          >
            {isLoading ? <div className="spin"></div> : buttonTitle}
          </button>
          {chainUsed != null && chainId != null && chainId != chainUsed && (
            <button onClick={handleChildDeploy} className={classes["next-btn"]}>
              Submit Crosschain
            </button>
          )}
        </div>
      </div>
    </MinorPageTemplate>
  );
};

export default Page;
