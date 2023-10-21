"use client";
import { useState } from "react";
import PageTemplate from "@/components/PageTemplate";
import classes from "@/styles/HackApply.module.css";
import ApplyBasics from "@/components/ApplyBasics";
import ApplyTeamFormation from "@/components/ApplyTeamFormation";

const pageNavigators = ["Basics", "Team Formation"];

const Page = () => {
  const [selectedNavigator, setSelectedNavigator] = useState(pageNavigators[0]);

  const handleNavigatorClick = (navigator) => {
    setSelectedNavigator(navigator);
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
            {pageNavigators.map((navigator) => (
              <li
                key={navigator}
                className={
                  navigator === selectedNavigator ? classes.active : ""
                }
                onClick={() => handleNavigatorClick(navigator)}
              >
                {navigator}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {selectedNavigator === "Basics" && <ApplyBasics />}
      {selectedNavigator === "Team Formation" && <ApplyTeamFormation />}
    </PageTemplate>
  );
};

export default Page;
