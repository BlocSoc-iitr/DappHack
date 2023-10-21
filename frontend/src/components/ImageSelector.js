import Image from "next/image";
import uploadIcon from "../../public/icons/upload.svg";
import classes from "@/styles/ImageSelector.module.css";
const ImageSelector = ({ title, file, setFile }) => {
  return (
    <div className={classes.container}>
      <h3>{title}</h3>
      <div className={classes["input-container"]}>
        <input style={{ display: "none" }} id={"img"} type="file" />
        <label style={{ cursor: "Pointer" }} htmlFor="img">
          <Image src={uploadIcon} alt="upload" />
          <p>Drag and drop or click to choose</p>
          <p>300x124 .png or .jpeg 5 MB max</p>
        </label>
      </div>
    </div>
  );
};

export default ImageSelector;
