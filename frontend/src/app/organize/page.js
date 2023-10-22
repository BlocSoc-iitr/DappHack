"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import classes from "@/styles/Organizer.module.css";
import Image from "next/image";
import offlineIcon from "../../../public/icons/offline.svg";
import onlineIcon from "../../../public/icons/online.svg";
import ImageSelector from "@/components/ImageSelector";

const Page = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [rules, setRules] = useState([]);
  const [file, setFile] = useState(null);
  const handleAddOraganizer = (event) => {
    event.preventDefault();
    const address = event.target.elements["team-member-address"].value;
    setTeamMembers([...teamMembers, address]);
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
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
  };
  return (
    <div className="page-template">
      <Sidebar />
      <div className={`page ${classes.right}`}>
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
                />
              </div>

              <div className={classes["input-field-container"]}>
                <label htmlFor="start-time">Start time</label>
                <input type="date" id="start-time" />
              </div>
              <div className={classes["input-field-container"]}>
                <label htmlFor="end-time">End time</label>
                <input type="date" id="end-time" />
              </div>
              <div className={classes["input-field-container"]}>
                <label htmlFor="max-participants">Max Paticipants</label>
                <input
                  type="number"
                  id="max-participants"
                  placeholder="No. of Participants"
                />
              </div>
              <div className={classes["input-field-container"]}>
                <label htmlFor="team-size">Team Size Limit</label>
                <input
                  type="number"
                  id="team-size"
                  placeholder="Limit size of a team"
                />
              </div>
              <div className={classes["input-field-container"]}>
                <label htmlFor="about-hack">Description</label>
                <textarea
                  type="text"
                  id="about-hack"
                  placeholder="Tell about your hackathon?"
                  rows={6}
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
              {teamMembers.map((address, index) => (
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
          <button className={classes["next-btn"]}>Continue</button>
        </div>
      </div>
    </div>
  );
};

export default Page;
