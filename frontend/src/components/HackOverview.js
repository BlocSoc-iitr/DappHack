import classes from "@/styles/HackOverview.module.css";
import styles from "@/styles/page.module.css";
import Image from "next/image";
import Link from "next/link";
import timeIcon from "../../public/icons/time.svg";
import locationIcon from "../../public/icons/location.svg";
import emailIcon from "../../public/icons/email.svg";
import shareIcon from "../../public/icons/share.svg";
import HackCard from "@/components/HackCard";
import projectImage from "../../public/project.jpeg";
import hackImage from "../../public/hackathon.jpeg";
import { useEffect, useState } from "react";

const HackOverview = ({ hackData }) => {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const countdownDate = new Date("October 29, 2023 00:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      setTimeLeft(`${days}d:${hours}h:${minutes}m`);

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft("Application closed");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className={classes["hack-container"]}>
      <div className={classes["hack-details-container"]}>
        <div className={classes["img-container"]}>
          <Image
            style={{ borderRadius: "8px" }}
            src={projectImage}
            height={380}
            width={700}
            alt="hack-img"
          />
          <div className={classes["hack-name-tag"]}>
            <h1>{hackData.hackName}</h1>
            <p>Tagline</p>
          </div>
        </div>

        <div className={classes["overview-container"]}>
          <h3>Overview</h3>
          <p>{hackData.description}</p>
          {/* <p>
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
          </p> */}
        </div>
        <div className={classes["overview-container"]}>
          <h3>Eligibility and Rules</h3>
          <ul className={classes["rules-list"]}>
            {hackData?.rules?.map((rule, i) => (
              <li key={i}>
                <p>{rule}</p>
              </li>
            ))}
            {/* <li>
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
            </li> */}
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
        {/* <div className={styles.grid}>
          <HackCard />

          <HackCard />
        </div> */}
      </div>

      <div>
        <div className={classes["apply-box"]}>
          <div className={classes["hack-img-container"]}>
            <Image
              src={projectImage}
              width={240}
              height={120}
              alt="projec-img"
            />
          </div>
          <h3>{hackData.hackName}</h3>
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
              Online
            </p>
          </div>
          <p>Application ends in </p>
          <h6>{timeLeft}</h6>
          <Link href={`/apply/${hackData.hackName}`}>Apply As Builder</Link>
          <Link style={{ marginTop: "1rem" }} href={`/sponsor`}>
            Apply As Sponsor
          </Link>
        </div>
        <button
          style={{
            marginTop: "2rem",
            color: "#fff",
            backgroundColor: "#aaa",
            border: "none",
            padding: "1rem 2rem",
            borderRadius: "8px",
            cursor: "not-allowed",
            fontSize: "20px",
            fontWeight: "600",
          }}
        >
          Distribute Price
        </button>
      </div>
    </div>
  );
};

export default HackOverview;
