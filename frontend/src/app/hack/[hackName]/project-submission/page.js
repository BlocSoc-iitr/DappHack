"use client";
import { useState } from "react";
import PageTemplate from "@/components/PageTemplate";
import classes from "@/styles/ProjectSubmission.module.css";
import SuccessfulModal from "@/components/SuccessfulModal";
import useDappHack from "@/utils/useDappHack";
import useDatabase from "@/utils/useDatabase";
import { projectTableName } from "@/utils/useDatabase";
import ImageSelector from "@/components/ImageSelector";

const Page = () => {
  const traits = "Test Hack";
  const [project, setProject] = useState({
    name: "DappHack",
    description: "Web3 hackathon portal",
    track1: "Filecoin",
    track2: "Polygon",
    link: "",
  });
  const [show, setShow] = useState(false);
  const [file, setFile] = useState(null);
  const [projectImage, setProjectImage] = useState(null);
  const { writeInDatabase } = useDatabase();

  const handleProjectChange = (name) => (event) => {
    setProject({ ...project, [name]: event.target.value });
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const { getTeamCount, submitProject } = useDappHack();
  const handleProjectSubmit = async () => {
    const formData = new FormData();
    formData.append("file", projectImage);
    formData.append("name", project.name);
    formData.append("description", project.description);
    formData.append("traits", traits);
    console.log(process.env.NEXT_PUBLIC_BACKEND_URL);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/hackathon/create-nft-uri`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      // const teamId = await getTeamCount();
      const projectData = {
        name: project.name,
        description: project.description,
        track1: project.track1,
        track2: project.track2,
        teamId: 1,
        traits: traits,
        uri: data.Uri[0],
      };
      if (!data.Uri[0]) return;
      await writeInDatabase(projectTableName, 0, JSON.stringify(projectData));
      // const result = await submitProject(teamId, data.Uri[0]);
      // console.log(result);
    } catch (err) {
      console.log(err);
    }
  };
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
                <input
                  type="text"
                  id="name"
                  placeholder="Hackathon"
                  value={project.name}
                  onChange={handleProjectChange("name")}
                />
              </div>
              <div className={classes["input-field-container"]}>
                <label className={classes["video-label"]} htmlFor="address">
                  + Add Project Video
                </label>
                <input
                  type="file"
                  id="address"
                  placeholder="e.g. Asia's largest hackathon"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </div>
              <div
                style={{ flex: "1 1 400px" }}
                className={classes["input-field-container"]}
              >
                <label htmlFor="name">Project Link</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Hackathon"
                  value={project.link}
                  onChange={handleProjectChange("link")}
                />
              </div>
              <div
                style={{ flex: "1 1 1700px" }}
                className={classes["input-field-container"]}
              >
                <label htmlFor="reason">Project Description</label>
                <textarea
                  type="text"
                  id="reason"
                  placeholder="e.g. Asia's largest hackathon"
                  rows={6}
                  value={project.description}
                  onChange={handleProjectChange("description")}
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
                    value={project.track1}
                    onChange={handleProjectChange("track1")}
                  />
                </div>
                <div className={classes["input-field-container"]}>
                  <label htmlFor="reason">Track 2</label>
                  <textarea
                    type="text"
                    id="reason"
                    placeholder="e.g. Asia's largest hackathon"
                    rows={6}
                    value={project.track2}
                    onChange={handleProjectChange("track2")}
                  />
                </div>
              </div>
            </div>
            <div className={classes["tracks-info"]}>
              <h3 style={{ marginBottom: "2rem" }}>Project Image</h3>
              <ImageSelector
                title={"Image"}
                file={projectImage}
                setFile={setProjectImage}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={classes["btn-group"]}>
        <button className={classes["cancel-btn"]}>Cancel</button>
        <button
          onClick={() => {
            handleProjectSubmit();
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
