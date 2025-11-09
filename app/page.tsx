import Link from "next/link";
import "./globals.css";
import CircleChart from "./ui/CircleChart";
import MountainChart from "./ui/MountainChart";

export default function Home() {
  return (
    <div className="flex align-center justify-center flex-col text-left">
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/login">Login</Link>
      <Link href="/chatSection">ChatSection</Link>
    </div>
  );
}
