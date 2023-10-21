import classes from "@/styles/HackOverview.module.css";
import styles from "@/styles/page.module.css";
import Image from "next/image";
import Link from "next/link";
import timeIcon from "../../public/icons/time.svg";
import locationIcon from "../../public/icons/location.svg";
import emailIcon from "../../public/icons/email.svg";
import shareIcon from "../../public/icons/share.svg";
import HackCard from "@/components/HackCard";

const HackOverview = () => {
  return (
    <div className={classes["hack-container"]}>
      <div className={classes["hack-details-container"]}>
        <div className={classes["img-container"]}>
          <div className={classes["hack-name-tag"]}>
            <h1>Hackathon's Name</h1>
            <p>Tagline</p>
          </div>
        </div>

        <div className={classes["overview-container"]}>
          <h3>Overview</h3>
          <p>
            Hack Unicorn Club presents Hack Unicorn 2.0, India's prestigious
            hackathon, uniting tech enthusiasts nationwide. This hybrid event
            combines Online and Offline rounds, ensuring Innovation meets Tech.
          </p>
          <p>
            📌 The Online round will be conducted from 19th - 20th October,
            where we'll shortlist Top 12-15 teams who'll be invited to the Final
            Presentation Round on 22nd October.
          </p>
          <p>
            💫 On 22nd October, the Offline round (at a Co-Working Space) will
            allow participants to present Projects Live before Judges, along
            with Pitching of their Idea, Presentation for Winning amazing
            Prizes.
          </p>
        </div>
        <div className={classes["overview-container"]}>
          <h3>Eligibility and Rules</h3>
          <ul className={classes["rules-list"]}>
            <li>
              <p>
                Hack Unicorn Club presents Hack Unicorn 2.0, India's prestigious
                hackathon
              </p>
            </li>
            <li>
              <p>
                uniting tech enthusiasts nationwide. This hybrid event combines
                Online and Offline rounds, ensuring Innovation meets Tech.
              </p>
            </li>
            <li>
              <p>
                📌 The Online round will be conducted from 19th - 20th October
              </p>
            </li>
            <li>
              <p>
                where we'll shortlist Top 12-15 teams who'll be invited to the
                Final Presentation Round on 22nd October.
              </p>
            </li>
            <li>
              <p>
                💫 On 22nd October, the Offline round (at a Co-Working Space)
                will allow participants to present Projects Live before Judges
              </p>
            </li>
            <li>
              <p>
                along with Pitching of their Idea, Presentation for Winning
                amazing Prizes.
              </p>
            </li>
          </ul>
        </div>
        <div
          className={`${classes["overview-container"]} ${classes["contact-container"]}`}
        >
          <h3>Contact</h3>
          <div className={classes["contact-details-container"]}>
            <div className={classes["email-container"]}>
              <div className={classes["icon-container"]}>
                <Image src={emailIcon} alt="email" />
              </div>
              <div className={classes.details}>
                <p>Email</p>
                <p>oraganizer.company@gmail.com</p>
              </div>
            </div>
            <div className={classes["email-container"]}>
              <div className={classes["icon-container"]}>
                <Image src={shareIcon} alt="web" />
              </div>
              <div className={classes.details}>
                <p>Website</p>
                <p>www.organisation.com</p>
              </div>
            </div>
          </div>
        </div>
        <div className="heading-container">
          <h1 className="heading">Live Hacks</h1>
          <Link href={"/"}>view all</Link>
        </div>
        <div className={styles.grid}>
          <HackCard />

          <HackCard />
        </div>
      </div>

      <div className={classes["apply-box"]}>
        <div className={classes["hack-img-container"]}></div>
        <h3>Hackathon's Name</h3>
        <div className={classes.row}>
          <Image src={timeIcon} alt="time" />
          <p>
            <span>Time: </span>
            Oct 29 - Nov 2, 2023
          </p>
        </div>
        <div className={classes.row}>
          <Image src={locationIcon} alt="venue" />
          <p>
            <span>Venue: </span>
            Banglore, India
          </p>
        </div>
        <p>Application ends in </p>
        <h6>15d:2h:16m</h6>
        <Link href="/apply/hackathon">Apply Now</Link>
      </div>
    </div>
  );
};

export default HackOverview;
