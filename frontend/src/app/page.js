"use client";
import styles from "@/styles/page.module.css";
import PageTemplate from "@/components/PageTemplate";
import HackCard from "@/components/HackCard";
import Link from "next/link";
import useDatabase from "@/utils/useDatabase";
import { useEffect, useState } from "react";

export default function Home() {
  const [hacks, setHacks] = useState([]);
  const { allHackathons } = useDatabase();

  useEffect(() => {
    const fetch = async () => {
      const hackData = await allHackathons();
      hackData.push({
        id: 1,
        name: {
          description: "test",
          endTime: 5000,
          gasService: "0xbe406f0189a0b4cf3a05c286473d23791dd44cc6",
          gateway: "0x999117D44220F33e0441fbAb2A5aDB8FF485c54D",
          hackName: "ethonline",
          maxParticipants: 500,
          organizer: ["0xA65920F5F3672dacf04e20DBAA99DE4053324d96"],
          rules: ["submit the project"],
          startTime: 1000,
          symbol: "TH",
          teamSizeLimit: 5,
        },
      });
      setHacks(hackData);
    };

    fetch();
  }, []);
  return (
    <PageTemplate>
      <div className="heading-container">
        <h1 className="heading">Live Hacks</h1>
        <Link href={"/"}>view all</Link>
      </div>

      <div className={styles.grid}>
        {hacks.length > 0 &&
          hacks?.map((hack) => {
            console.log(hack);
            return (
              <Link href={`/hack/${hack.name.hackName}`}>
                <HackCard hackData={hack.name} />
              </Link>
            );
          })}
      </div>
    </PageTemplate>
  );
}
