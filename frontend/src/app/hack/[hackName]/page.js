"use client";
import { useState } from "react";
import PageTemplate from "@/components/PageTemplate";
import classes from "@/styles/HackPage.module.css";
import HackOverview from "@/components/HackOverview";
import HackPrizes from "@/components/HackPrizes";

const pageNavigators = ["Overview", "Projects", "Timeline", "Prizes"];
const HackPage = () => {
  const [selectedNavigator, setSelectedNavigator] = useState(pageNavigators[0]);

  const handleNavigatorClick = (navigator) => {
    setSelectedNavigator(navigator);
  };

  return (
    <PageTemplate>
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
