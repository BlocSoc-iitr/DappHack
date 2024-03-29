"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import searchIcon from "../../public/icons/search.svg";
import Image from "next/image";
import Link from "next/link";

function PageTemplate({ children }) {
  const [toggle, setToggle] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window?.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="page-template">
      <div className="page-top">
        <div className="toggle-button">
          <Image
            src={"/icons/toggle-sidebar.svg"}
            width={20}
            height={20}
            className="toggle-checkbox-image"
            onClick={() => setToggle(!toggle)}
          />
        </div>
        <div className="input-container">
          <input id="hack-search" type="text" placeholder="Search" />
          <label htmlFor="hack-search">
            <Image src={searchIcon} alt="search" />
          </label>
        </div>
        <div className="organize">
          <Link href={"/organize"}>+ Organize Hackathon</Link>
        </div>
      </div>
      <div className="page-container">
        <div
          className="sidebar-fixed"
          style={{
            flex: windowWidth > 720 ? (toggle === true ? "1" : "2") : "0",
          }}
        >
          <Sidebar
            toggle={toggle}
            setToggle={setToggle}
            windowWidth={windowWidth}
          />
        </div>
        <div className="page">
          <div className="main-content">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default PageTemplate;
