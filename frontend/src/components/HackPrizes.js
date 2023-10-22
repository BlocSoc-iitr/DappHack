import classes from "@/styles/HackPrizes.module.css";
import HackPrizeCard from "./HackPrizeCard";
import Image from "next/image";
import shareIcon from "../../public/icons/share.svg";
import copyIcon from "../../public/icons/copy.svg";
import chainIcon from "../../public/icons/chain.svg";
import axelarImage from "../../public/axelar.jpeg";

const HackPrizes = () => {
  return (
    <div className={classes["prizes-container"]}>
      <div className={classes["prizes-list"]}>
        <HackPrizeCard title="Axelar" />
        <hr />
      </div>
      <div className={classes["prize-details"]}>
        <div className={classes["sponsor-details"]}>
          <div className={classes["details-container"]}>
            <div
              style={{ width: "152px", height: "152px", background: "#D9D9D9" }}
            >
              <Image src={axelarImage} width={152} height={152} />
            </div>
            <div>
              <h1 className={classes.heading}>Axelar</h1>
              {/* <div className={classes["address-chain"]}>
                <div>
                  <Image src={copyIcon} alt="copy" />
                  <p>Address : 0x682...5DbD</p>
                </div>
                <div>
                  <Image src={chainIcon} alt="chain" />
                  <p>Chain ID : s/kf.sdfkf</p>
                </div>
              </div> */}
              <h1 className={classes.prize}>$3200</h1>
            </div>
          </div>
          <div className="icon-container">
            <Image src={shareIcon} alt="web" />
          </div>
        </div>
        <div className={classes["sponsor-description"]}>
          <h1>About</h1>
          <p>
            Axelar is the full-stack interoperability layer for Web3. The
            network enables blockchain as a new application development
            platform, by integrating ecosystems of innovation into a seamless
            “Internet of blockchains.” Axelar is programmable and decentralized,
            secured by a proof-of-stake token, AXL. Application users access
            digital assets on any blockchain, with one click. Developers work
            with a simple API and access an open market of tooling to automate
            complex tasks.You can think of it as Stripe for Web3. More about
            Axelar: http://axelar.network
          </p>
          {/* <br />
          <p>
            📌 The Online round will be conducted from 19th - 20th October,
            where we'll shortlist Top 12-15 teams who'll be invited to the Final
            Presentation Round on 22nd October.
          </p>
          <br />
          <p>
            💫 On 22nd October, the Offline round (at a Co-Working Space) will
            allow participants to present Projects Live before Judges, along
            with Pitching of their Idea, Presentation for Winning amazing
            Prizes.
          </p> */}
        </div>
        <div className={classes["sponsor-description"]}>
          <h1>Prizes</h1>
          <p>
            Best Use of Axelar GMP
            <br /> 🥇 1st Place — $3,000 <br />
            🥈 2nd Place — $1,500
            <br /> 🥉 3rd Place — $500
          </p>
          <br />
          <p>
            <b>Description:</b> Use Axelar in your project to build a DApp that
            takes advantage of the ability to interact with contracts across
            multiple chains using Axelar’s General Message Passing.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HackPrizes;
