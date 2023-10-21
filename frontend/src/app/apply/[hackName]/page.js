"use client";
import { useState } from "react";
import PageTemplate from "@/components/PageTemplate";
import classes from "@/styles/HackApply.module.css";
import ApplyTeamFormation from "@/components/ApplyTeamFormation";

const pageNavigators = ["Basics", "Team Formation"];

const Page = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");

  const [address, setAddress] = useState("");
  const [reason, setReason] = useState("");
  const [teamName, setTeamName] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };
  const handleNext = () => {
    setStep(step + 1);
  };
  const handlePrevious = () => {
    setStep(step - 1);
  };
  const handleAddTeamMember = (event) => {
    event.preventDefault();
    const address = event.target.elements["team-member-address"].value;
    setTeamMembers([...teamMembers, address]);
    event.target.reset();
  };

  const handleRemoveTeamMember = (index) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
  };
  return (
    <PageTemplate>
      <div className={classes["hack-details"]}>
        <h1>Hackathon's Name</h1>
        <p>Tagline</p>
      </div>
      <div className={classes["application-process"]}>
        <h1>Application Process</h1>
        <div className={classes["page-navigator"]}>
          <ul>
            {pageNavigators.map((navigator, index) => (
              <li
                key={navigator}
                className={step === index + 1 ? classes.active : ""}
              >
                {navigator}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {step === 1 ? (
        <div className={classes["apply-basics-container"]}>
          <form className={classes.form}>
            <div className={classes["input-field-container"]}>
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                placeholder="Hackathon"
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <div className={classes["input-field-container"]}>
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                placeholder="e.g. Asia's largest hackathon"
                value={address}
                onChange={handleAddressChange}
              />
            </div>
            <div className={classes["input-field-container"]}>
              <label htmlFor="reason">Why you want to participate?</label>
              <textarea
                type="text"
                id="reason"
                placeholder="e.g. Asia's largest hackathon"
                value={reason}
                onChange={handleReasonChange}
                rows={6}
              />
            </div>
          </form>
          <div className={classes["btn-group"]}>
            <button className={classes["cancel-btn"]}>Cancel</button>
            <button onClick={handleNext} className={classes["next-btn"]}>
              Next
            </button>
          </div>
        </div>
      ) : (
        <ApplyTeamFormation
          teamName={teamName}
          setTeamName={setTeamName}
          teamMembers={teamMembers}
          handleAddTeamMember={handleAddTeamMember}
          handleRemoveTeamMember={handleRemoveTeamMember}
          handlePrevious={handlePrevious}
        />
      )}
    </PageTemplate>
  );
};

export default Page;
