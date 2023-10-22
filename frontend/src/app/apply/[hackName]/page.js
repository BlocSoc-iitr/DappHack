"use client";
import { useState } from "react";
import PageTemplate from "@/components/PageTemplate";
import classes from "@/styles/HackApply.module.css";
import ApplyTeamFormation from "@/components/ApplyTeamFormation";
import useDappHack from "@/utils/useDappHack";
import useCrossDappHack from "@/utils/useCrossDappHack";
import useWeb3 from "@/utils/useWeb3";

const pageNavigators = ["Basics", "Team Formation"];

const Page = ({ params }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("Puspendra Mahariya");

  const [address, setAddress] = useState(
    "0xCe340D9A71b2aa8F7FAa2f989158f14BEDE3E1b2"
  );
  const [reason, setReason] = useState("To enhance skills");
  const [teamName, setTeamName] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { chainId } = useWeb3();

  const { builderSignup, createTeam } = useDappHack();
  const { crossBuilderSignup } = useCrossDappHack();

  const hackName = params.hackName.replace("%20", " ");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };
  const handleNext = async () => {
    try {
      if (!chainId) return;
      setIsLoading(true);
      if (chainId === 314159) {
        const result = await builderSignup();
        console.log(result);
      } else {
        const result = await crossBuilderSignup();
        console.log(result);
      }

      setStep(step + 1);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
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

  const handleTeamSignup = async () => {
    if (!teamName || teamMembers.length === 0) return;
    setIsLoading(true);
    console.log(typeof teamName, teamMembers);
    const result = await createTeam(teamName, teamMembers);
    setIsLoading(false);
    console.log(result);
  };
  return (
    <PageTemplate>
      <div className={classes["hack-details"]}>
        <h1>{hackName}</h1>
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
              {isLoading ? <div className="spin"></div> : "Next"}
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
          handleTeamSignup={handleTeamSignup}
          isLoading={isLoading}
        />
      )}
    </PageTemplate>
  );
};

export default Page;
