"use client";
import React, { useState, useEffect } from "react";
import classes from "@/styles/HackTimeline.module.css";
import Image from "next/image";
import useGetHackTimeline from "@/utils/useGetHackTimeline";

const HackTimeline = () => {
  const { GetHackTimeline, isLoading } = useGetHackTimeline();
  const [dataTimeLine, setDataTimeLine] = useState([]);

  useEffect(() => {
    const fetchHackTimeline = async () => {
      const response = await GetHackTimeline("wallet", "projectid");
      console.log(response);
      setDataTimeLine(response);
    };
    fetchHackTimeline();
  }, []);

  return (
    <div className={classes["timeline-container"]}>
      {dataTimeLine.map((data) => (
        <div className={classes["timeline-box"]}>
          <div className={classes["timeline-box-time"]}>
            <div className={classes["timelone-dot"]}>
              <Image
                src={"/icons/timeLinedot.svg"}
                width={12}
                height={12}
                alt="dot"
              />
            </div>
            {data.time}
          </div>
          <div className={classes["timeline-box-description"]}>
            {data.description}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HackTimeline;
