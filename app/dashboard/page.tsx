"use client";
import React from "react";
import "../globals.css";

import { FaFilePdf } from "react-icons/fa";
import Card from "../ui/Card";
import CircleChart from "../ui/CircleChart";
import MountainChart from "../ui/MountainChart";
import { Home as HomeIconLucide, Settings } from "lucide-react";

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
              <Card
              bgClass="bg-orange-200"
               textClass="text-black"
            texts={["متن اول","متن دوم طولانی تر از متن اول است"]}
            
             icons={[
               <FaFilePdf className="text-orange-800 w-11 h-11" />]}
          />  
              <Card
              bgClass="bg-yellow-200"
               textClass="text-black"
            texts={["متن اول","متن دوم طولانی تر از متن اول است"]}
            
             icons={[
               <FaFilePdf className="text-yellow-400 w-13 h-13" />]}
          />
               <Card
               bgClass="bg-yellow-100"
               textClass="text-black"
            texts={["متن اول","متن دوم طولانی تر از متن اول است"]}
            
             icons={[
               <FaFilePdf className="text-orange-400 w-15 h-15" />]}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
