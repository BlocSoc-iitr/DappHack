import classes from "@/styles/HackCard.module.css";
import timerIcon from "../../public/icons/timer.svg";
import shareIcon from "../../public/icons/share.svg";
import Image from "next/image";
const HackCard = () => {
  return (
    <div className={classes["card-container"]}>
      <div className={classes["card-top-section"]}>
        <div className={classes["share-link"]}>
          <Image
            className={classes["share-icon"]}
            src={shareIcon}
            alt="share"
          />
        </div>
      </div>
      <div className={classes["card-content"]}>
        <h3>Hackathon Name</h3>
        <p className={classes.type}>Hackathon</p>
        <div className={classes.timer}>
          <Image src={timerIcon} alt="time" />
          <p>
            Ends in | <span>00:00:00</span>
          </p>
        </div>
        <p className={classes.members}>100+ members</p>
      </div>
    </div>
  );
};

export default HackCard;
