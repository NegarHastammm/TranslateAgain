"use client";
import React from "react";
import "../globals.css";


import Card from "../ui/Card";
import CircleChart from "../ui/CircleChart";
import MountainChart from "../ui/MountainChart";
import { Home as HomeIconLucide, User, Settings } from "lucide-react";
import Header from "./Header";

const HomeIcon = () => <HomeIconLucide className="w-5 h-5 text-gray-500" />;
const SettingsIcon = () => <Settings className="w-5 h-5 text-gray-500" />;

const Home: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">


      <div className="flex-1 flex flex-col p-6 gap-6 overflow-auto">



        <div className="flex flex-wrap gap-6 justify-center">
          <Card
            texts={["متن اول","متن دوم"]}
            ChartComponent={<MountainChart startColor="#9dff00ff" endColor="#c8f500ff" />}
            icons={[<HomeIcon />]}
          />

          <Card
            texts={["متن اول","متن دوم"]}
            ChartComponent={<MountainChart startColor="#dde00dff" endColor="#c0f306ff" />}
            icons={[<SettingsIcon />]}
          />

          <Card
            texts={["متن اول","متن دوم"]}
            ChartComponent={<CircleChart size={70} />}
            icons={[<HomeIcon />]}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
