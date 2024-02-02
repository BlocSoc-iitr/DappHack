"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Image from "next/image";

function MinorPageTemplate({ children }) {
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
      <div className="page-top-minor">
        <div className="toggle-button">
          <Image
            src={"/icons/toggle-sidebar.svg"}
            width={20}
            height={20}
            className="toggle-checkbox-image"
            onClick={() => setToggle(!toggle)}
          />
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

export default MinorPageTemplate;
