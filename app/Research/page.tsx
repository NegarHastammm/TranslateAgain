

"use client";
import React from "react";
import "../globals.css";

import { FaFilePdf } from "react-icons/fa";
import Card from "../ui/Card";
import CircleChart from "../ui/CircleChart";
import MountainChart from "../ui/MountainChart";
import { Home as HomeIconLucide, Settings } from "lucide-react";
import Image from "next/image";
const HomeIcon = () => <HomeIconLucide className="w-5 h-5 text-gray-500" />;
const SettingsIcon = () => <Settings className="w-5 h-5 text-gray-500" />;

import Research from "../ui/Research";

const Home: React.FC = () => {
  return (
    <>
    <Research />
    
    </>

   
  

      );
};

export default Home;