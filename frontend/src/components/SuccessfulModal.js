import classes from "@/styles/ProjectSubmission.module.css";
import Link from "next/link";
import Image from "next/image";
import tickCircle from "../../public/icons/tick-circle.svg";
const SuccessfulModal = () => {
  return (
    <div className={classes.backdrop} id="modal">
      <div className={classes.modal}>
        <h1>Project Submitted Successfully</h1>
        <div className={classes["icon-container"]}>
          <div className={classes.icon}>
            <Image src={tickCircle} alt={"success"} />
          </div>
        </div>
        <p>Thank you for submitting the project. Best of Luck for results!</p>
        <div className={classes["modal-btns"]}>
          <Link href={"/my-hackathons"}>My Hackathons</Link>
          <Link href="/">Home</Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessfulModal;
