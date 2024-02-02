"use client";
import React, { useState, useEffect } from "react";
import classes from "@/styles/HackProjects.module.css";
import Image from "next/image";
import Link from "next/link";
import useGetHackProject from "@/utils/useGetHackProject";

const HackProjects = () => {
  const { GetHackProject, isLoading } = useGetHackProject();
  const [hackProjectData, sethackProjectData] = useState([]);

  useEffect(() => {
    const fetchHackProject = async () => {
      const response = await GetHackProject("wallet", "projectid");
      console.log(response);
      sethackProjectData(response);
    };
    fetchHackProject();
  }, []);

  return (
    <div className={classes["projects-container"]}>
      <div className={classes["projects-heading-box"]}>
        <div className={classes["project-heading-box-text"]}>Basic info</div>
        <div className={classes["project-heading-box-text"]}>Team Members</div>
        <div className={classes["project-heading-box-text-2"]}>Description</div>
        <div className={classes["project-heading-box-text"]}>Action</div>
      </div>
      <div className={classes["projects-all-project"]}>
        {hackProjectData.map((project) => (
          <div className={classes["projects-project"]}>
            <div className={classes["project-name-team-image"]}>
              <div>
                <Image
                  src={"/icons/project.svg"}
                  width={50}
                  height={50}
                  alt="project"
                />
              </div>
              <div className={classes["project-name-team"]}>
                <div className={classes["project-project-name"]}>
                  {project.projectName}
                </div>
                <div className={classes["project-team-name"]}>
                  {project.teamName}
                </div>
              </div>
            </div>
            <div className={classes["project-team-members"]}>
              {project.teamMembers.map((member) => (
                <div className={classes["project-team-member"]}>
                  <Image
                    src={`/users/${member}.svg`}
                    width={30}
                    height={30}
                    alt={member}
                  />
                </div>
              ))}
            </div>
            <div className={classes["project-description"]}>
              {project.description}
            </div>
            <div className={classes["project-action"]}>
              <Link href={project.link}>View Project</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HackProjects;
