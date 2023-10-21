import styles from "@/styles/page.module.css";
import PageTemplate from "@/components/PageTemplate";
import HackCard from "@/components/HackCard";
import Link from "next/link";

export default function Home() {
  return (
    <PageTemplate>
      <div className="heading-container">
        <h1 className="heading">Live Hacks</h1>
        <Link href={"/"}>view all</Link>
      </div>

      <div className={styles.grid}>
        <Link href="/hack/Hackathon">
          <HackCard />
        </Link>
        <HackCard />
      </div>
      <div className="heading-container">
        <h1 className="heading">Upcoming Hacks</h1>
        <Link href={"/"}>view all</Link>
      </div>

      <div className={styles.grid}>
        <HackCard />
      </div>
      <div className="heading-container">
        <h1 className="heading">Past Hacks</h1>
        <Link href={"/"}>view all</Link>
      </div>

      <div className={styles.grid}>
        <HackCard />
      </div>
    </PageTemplate>
  );
}
