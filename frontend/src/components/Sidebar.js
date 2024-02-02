"use client";
import React, { useEffect } from "react";
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
import { usePathname } from "next/navigation";

import { ConnectButton } from "@rainbow-me/rainbowkit";

const routes = [
  {
    title: "Explore",
    icon: exploreIcon,
    path: "/",
  },
  {
    title: "My Hackathons",
    icon: myHackathonsIcon,
    path: "/",
  },
  {
    title: "My Projects",
    icon: myProjectsIcon,
    path: "/project/Test%20Hack",
  },
  {
    title: "Organize",
    icon: organizeIcon,
    path: "/organize",
  },
  {
    title: "My Profile",
    icon: myProfileIcon,
    path: "/",
  },
  {
    title: "Settings",
    icon: settingsIcon,
    path: "/",
  },
  {
    title: "Logout",
    icon: logoutIcon,
    path: "/",
  },
];

function Sidebar({ toggle, setToggle, windowWidth }) {
  console.log(toggle);
  const pathname = usePathname()?.split("/")[1];

  return (
    <>
      <input
        type="checkbox"
        id="toggle"
        className={classes["toggle-checkbox"]}
        checked={toggle}
        onClick={() => {
          setToggle(!toggle);
        }}
      />
      <Image
        src={"/icons/toggle-sidebar.svg"}
        width={20}
        height={20}
        className={classes["toggle-checkbox-image"]}
      />
      <div className={classes["top-blur"]}></div>
      <nav className={classes["sidebar"]}>
        <div
          className={classes["wallet-container"]}
          style={{
            display:
              windowWidth > 720
                ? toggle === true
                  ? "none"
                  : "block"
                : "block",
          }}
        >
          <ConnectButton showBalance={false} chainStatus="icon" />
        </div>
        <ul className={classes["links-list"]}>
          {routes.map((route) => (
            <li className={classes["links-list-item"]} key={route.title}>
              <Link
                className="active"
                href={route.path}
                style={{
                  flexDirection:
                    windowWidth > 720
                      ? toggle === true
                        ? "column"
                        : "row"
                      : "row",
                }}
              >
                <Image
                  style={{
                    fill: "red",
                    height:
                      windowWidth > 720
                        ? toggle === true
                          ? "3rem"
                          : "4rem"
                        : "4rem",
                    width:
                      windowWidth > 720
                        ? toggle === true
                          ? "3.7rem"
                          : "4rem"
                        : "4rem",
                    paddingLeft:
                      windowWidth > 720
                        ? toggle === true
                          ? "1rem"
                          : "1.5rem"
                        : "1.5rem",
                  }}
                  src={route.icon}
                  alt={route.title}
                  className={
                    pathname === route.path.split("/")[1]
                      ? `${classes["active-icon"]}`
                      : ""
                  }
                />
                <span
                  className={
                    pathname === route.path.split("/")[1]
                      ? `${classes["text"]} ${classes["active"]}`
                      : classes["text"]
                  }
                >
                  {route.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default Sidebar;
