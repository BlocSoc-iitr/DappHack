import React from "react";
import classes from "@/styles/Sidebar.module.css";
import Image from "next/image";
import exploreIcon from "../../public/icons/explore.svg";
import myHackathonsIcon from "../../public/icons/my-hackathons.svg";
import myProjectsIcon from "../../public/icons/my-projects.svg";
import organizeIcon from "../../public/icons/organize.svg";
import myProfileIcon from "../../public/icons/my-profile.svg";
import settingsIcon from "../../public/icons/settings.svg";
import logoutIcon from "../../public/icons/logout.svg";
import Link from "next/link";

const routes = [
  {
    title: "Explore",
    icon: exploreIcon,
  },
  {
    title: "My Hackathons",
    icon: myHackathonsIcon,
  },
  {
    title: "My Projects",
    icon: myProjectsIcon,
  },
  {
    title: "Organize",
    icon: organizeIcon,
  },
  {
    title: "My Profile",
    icon: myProfileIcon,
  },
  {
    title: "Settings",
    icon: settingsIcon,
  },
  {
    title: "Logout",
    icon: logoutIcon,
  },
];

function Sidebar() {
  return (
    <nav className={classes["sidebar"]}>
      <ul className={classes["links-list"]}>
        {routes.map((route) => (
          <li className={classes["links-list-item"]} key={route.title}>
            <Link className="active" href="/">
              <Image
                style={{ fill: "red" }}
                src={route.icon}
                alt={route.title}
              />
              <span className={classes.text}>{route.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Sidebar;
