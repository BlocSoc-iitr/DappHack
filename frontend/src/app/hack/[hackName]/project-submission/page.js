"use client";
import { useState } from "react";
import PageTemplate from "@/components/PageTemplate";
import classes from "@/styles/ProjectSubmission.module.css";
import SuccessfulModal from "@/components/SuccessfulModal";

const Page = () => {
  const [show, setShow] = useState(false);
  return (
    <PageTemplate>
      {show && <SuccessfulModal />}
      <div className={classes["hack-details"]}>
        <h1>Hackathon's Name</h1>
        <p>Tagline</p>
      </div>
      <h1 className={classes["project-heading"]}>Project Submission</h1>
      <div className={classes["project-container"]}>
        <h3>Hackathon Name</h3>
        <div className={classes["project-details"]}>
          <div>
            <div className={classes["project-info"]}>
              <div className={classes["input-field-container"]}>
                <label htmlFor="name">Project Name</label>
                <input type="text" id="name" placeholder="Hackathon" />
              </div>
              <div className={classes["input-field-container"]}>
                <label className={classes["video-label"]} htmlFor="address">
                  + Add Project Video
                </label>
                <input
                  type="text"
                  id="address"
                  placeholder="e.g. Asia's largest hackathon"
                  style={{ display: "none" }}
                />
              </div>
              <div className={classes["input-field-container"]}>
                <label htmlFor="reason">Project Description</label>
                <textarea
                  type="text"
                  id="reason"
                  placeholder="e.g. Asia's largest hackathon"
                  rows={6}
                />
              </div>
            </div>
            <div className={classes["tracks-info"]}>
              <h3>Tracks Description</h3>
              <div className={classes["track-field-container"]}>
                <div className={classes["input-field-container"]}>
                  <label htmlFor="reason">Track 1</label>
                  <textarea
                    type="text"
                    id="reason"
                    placeholder="e.g. Asia's largest hackathon"
                    rows={6}
                  />
                </div>
                <div className={classes["input-field-container"]}>
                  <label htmlFor="reason">Track 2</label>
                  <textarea
                    type="text"
                    id="reason"
                    placeholder="e.g. Asia's largest hackathon"
                    rows={6}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes["btn-group"]}>
        <button className={classes["cancel-btn"]}>Cancel</button>
        <button
          onClick={() => {
            setShow(true);
          }}
          className={classes["next-btn"]}
        >
          Submit
        </button>
      </div>
    </PageTemplate>
  );
};

export default Page;
