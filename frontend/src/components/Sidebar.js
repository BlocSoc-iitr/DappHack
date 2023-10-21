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
import Wallet from "./Wallet";
import { useListen } from "@/utils/useListen";
import { useMetamask } from "@/utils/useMetamask";

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
    path: "/",
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

function Sidebar() {
  const { dispatch } = useMetamask();
  const listen = useListen();

  useEffect(() => {
    if (typeof window !== undefined) {
      const ethereumProviderInjected = typeof window.ethereum !== "undefined";

      const isMetamaskInstalled =
        ethereumProviderInjected && Boolean(window.ethereum.isMetaMask);

      const local = window.localStorage.getItem("metamaskState");

      if (local) {
        listen();
      }

      const { wallet, balance } = local
        ? JSON.parse(local)
        : { wallet: null, balance: null };

      dispatch({ type: "pageLoaded", isMetamaskInstalled, wallet, balance });
    }
  }, []);
  return (
    <nav className={classes["sidebar"]}>
      <div className={classes["wallet-container"]}>
        <Wallet />
      </div>
      <ul className={classes["links-list"]}>
        {routes.map((route) => (
          <li className={classes["links-list-item"]} key={route.title}>
            <Link className="active" href={route.path}>
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
