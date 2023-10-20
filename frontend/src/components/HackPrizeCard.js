import classes from "@/styles/HackPrizes.module.css";
const HackPrizeCard = () => {
  return (
    <div className={classes["prize-card"]}>
      <div className={classes["sponsor-icon"]}></div>
      <div>
        <h3
          style={{
            color: "#00061d",
            fontSize: "var(--ft-500)",
            fontWeight: "600",
          }}
        >
          Mask Network
        </h3>
        <h3
          style={{
            color: "#00061d",
            opacity: "0.6",
            fontSize: "var(--ft-500)",
            fontWeight: "700",
          }}
        >
          $3200
        </h3>
      </div>
    </div>
  );
};

export default HackPrizeCard;
