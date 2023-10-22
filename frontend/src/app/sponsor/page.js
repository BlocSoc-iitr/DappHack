"use client";
import classes from "@/styles/Sponsor.module.css";
import Sidebar from "@/components/Sidebar";
import ImageSelector from "@/components/ImageSelector";
import { useState } from "react";
import useDappHack from "@/utils/useDappHack";
const Page = () => {
  const [sponsor, setSponsor] = useState({
    name: "",
    sponsors: "",
    prizes: "",
    noOfPoolPrizes: "",
    poolPrize: "",
    about: "",
    website: "",
    email: "",
  });

  const { sponsorSignup } = useDappHack();

  const handleSponsorChange = (name) => (event) => {
    setSponsor({ ...sponsor, [name]: event.target.value });
  };

  const handleSponsorSignup = async () => {
    const result = await sponsorSignup([
      sponsor.name,
      sponsor.sponsors,
      sponsor.prizes,
      sponsor.poolPrize,
      sponsor.noOfPoolPrizes,
    ]);
    console.log(result);
  };

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
                <input
                  type="text"
                  id="name"
                  placeholder="Hackathon"
                  value={sponsor.name}
                  onChange={handleSponsorChange("name")}
                />
              </div>
              <div className={classes["input-field-container"]}>
                <label htmlFor="pools">Total Pool Prizes</label>
                <input
                  type="number"
                  id="pools"
                  placeholder="Number of Pool Prizes"
                  value={sponsor.noOfPoolPrizes}
                  onChange={handleSponsorChange("noOfPoolPrizes")}
                />
              </div>
              <div className={classes["input-field-container"]}>
                <label htmlFor="sponsors">Sponsor Addresses</label>
                <input
                  type="number"
                  id="sponsors"
                  placeholder="Number of Pool Prizes"
                  value={sponsor.sponsors}
                  onChange={handleSponsorChange("sponsors")}
                />
              </div>
              <div className={classes["input-field-container"]}>
                <label htmlFor="prizes">Prizes</label>
                <input
                  type="number"
                  id="prizes"
                  placeholder="Number of Pool Prizes"
                  value={sponsor.prizes}
                  onChange={handleSponsorChange("prizes")}
                />
              </div>
              <div className={classes["input-field-container"]}>
                <label htmlFor="pool-prize">Pool Prize</label>
                <input
                  type="number"
                  id="pool-prize"
                  placeholder="Number of Pool Prizes"
                  value={sponsor.poolPrize}
                  onChange={handleSponsorChange("poolPrize")}
                />
              </div>
              <div className={classes["input-field-container"]}>
                <label htmlFor="about">About</label>
                <textarea
                  type="text"
                  id="about"
                  placeholder="e.g. Asia's largest hackathon"
                  rows={6}
                  value={sponsor.about}
                  onChange={handleSponsorChange("about")}
                />
              </div>
            </div>
          </div>
          <div className={classes.section}>
            <h3>Links</h3>
            <div className={classes.form}>
              <div className={classes["input-field-container"]}>
                <label htmlFor="website">Website Link</label>
                <input
                  type="text"
                  id="website"
                  placeholder="Website URL"
                  value={sponsor.website}
                  onChange={handleSponsorChange("website")}
                />
              </div>
              <div className={classes["input-field-container"]}>
                <label htmlFor="email">Contact Email</label>
                <input
                  type="text"
                  id="email"
                  placeholder="Mail Id for the hackathon"
                  value={sponsor.email}
                  onChange={handleSponsorChange("email")}
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
          <button onClick={handleSponsorSignup} className={classes["next-btn"]}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
