import classes from "@/styles/HackPrizes.module.css";
import HackPrizeCard from "./HackPrizeCard";
import Image from "next/image";
import shareIcon from "../../public/icons/share.svg";
import copyIcon from "../../public/icons/copy.svg";
import chainIcon from "../../public/icons/chain.svg";

const HackPrizes = () => {
  return (
    <div className={classes["prizes-container"]}>
      <div className={classes["prizes-list"]}>
        <HackPrizeCard />
        <hr />
        <HackPrizeCard />
        <hr />
        <HackPrizeCard />
      </div>
      <div className={classes["prize-details"]}>
        <div className={classes["sponsor-details"]}>
          <div className={classes["details-container"]}>
            <div
              style={{ width: "152px", height: "152px", background: "#D9D9D9" }}
            ></div>
            <div>
              <h1 className={classes.heading}>Mask Network</h1>
              <div className={classes["address-chain"]}>
                <div>
                  <Image src={copyIcon} alt="copy" />
                  <p>Address : 0x682...5DbD</p>
                </div>
                <div>
                  <Image src={chainIcon} alt="chain" />
                  <p>Chain ID : s/kf.sdfkf</p>
                </div>
              </div>
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
            Hack Unicorn Club presents Hack Unicorn 2.0, India's prestigious
            hackathon, uniting tech enthusiasts nationwide. This hybrid event
            combines Online and Offline rounds, ensuring Innovation meets Tech.
          </p>
          <br />
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
          </p>
        </div>
        <div className={classes["sponsor-description"]}>
          <h1>Heading 2</h1>
          <p>
            Hack Unicorn Club presents Hack Unicorn 2.0, India's prestigious
            hackathon, uniting tech enthusiasts nationwide. This hybrid event
            combines Online and Offline rounds, ensuring Innovation meets Tech.
          </p>
          <br />
          <p>
            📌 The Online round will be conducted from 19th - 20th October,
            where we'll shortlist Top 12-15 teams who'll be invited to the Final
            Presentation Round on 22nd October.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HackPrizes;
