import classes from "@/styles/Sponsor.module.css";
import Sidebar from "@/components/Sidebar";
import ImageSelector from "@/components/ImageSelector";
const Page = () => {
  return (
    <div className="page-template">
      <Sidebar />
      <div className={`page ${classes.right}`}>
        <h1 className={classes.heading}>Sponsor Registration</h1>
        <div className={classes["sponsor-container"]}>
          <div className={classes.section}>
            <h3>Basic Details</h3>
            <div className={classes.form}>
              <div className={classes["input-field-container"]}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="Hackathon" />
              </div>
              <div className={classes["input-field-container"]}>
                <label htmlFor="prize">Total Pool Prizes</label>
                <input
                  type="number"
                  id="pool"
                  placeholder="Number of Pool Prizes"
                />
              </div>
              <div className={classes["input-field-container"]}>
                <label htmlFor="about">About</label>
                <textarea
                  type="text"
                  id="about"
                  placeholder="e.g. Asia's largest hackathon"
                  rows={6}
                />
              </div>
            </div>
          </div>
          <div className={classes.section}>
            <h3>Links</h3>
            <div className={classes.form}>
              <div className={classes["input-field-container"]}>
                <label htmlFor="website">Website Link</label>
                <input type="text" id="website" placeholder="Website URL" />
              </div>
              <div className={classes["input-field-container"]}>
                <label htmlFor="email">Contact Email</label>
                <input
                  type="text"
                  id="email"
                  placeholder="Mail Id for the hackathon"
                />
              </div>
            </div>
          </div>
          <div className={classes.section}>
            <h3>Images</h3>
            <div className={classes["img-selectors"]}>
              <ImageSelector title="Hackathon Logo" />
              <ImageSelector title="Cover Image" />
              <ImageSelector title="Brand Color" />
            </div>
          </div>
        </div>
        <div className={classes["btn-group"]}>
          <button className={classes["cancel-btn"]}>Cancel</button>
          <button className={classes["next-btn"]}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Page;
