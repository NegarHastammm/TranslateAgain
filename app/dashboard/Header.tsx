"use client";
import React, { useState } from "react";
import { Bell, Sun, Moon, Menu } from "lucide-react";

interface HeaderProps {
  fullName: string;
  jobTitle: string;
  profileImage?: string;
  toggleSidebar?: () => void;
}

const Header: React.FC<HeaderProps> = ({ fullName, jobTitle, profileImage, toggleSidebar }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  };

  return (
    <div className="sticky top-0 z-40 w-full h-16 px-4 bg-white dark:bg-gray-800 shadow-md flex items-center justify-between">

      <div className="flex items-center gap-2 md:hidden">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded bg-gray-200 dark:bg-gray-700"
        >
          <Menu size={24} />
        </button>


        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            {profileImage ? (
              <img src={profileImage} alt="profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-400 flex items-center justify-center text-white">
                {fullName.charAt(0)}
              </div>
            )}
          </div>
          <div className="flex flex-col text-right">
            <span className="font-semibold text-gray-700 dark:text-gray-200">{fullName}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">{jobTitle}</span>
          </div>
        </div>
      </div>


      <div className="hidden md:flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          {profileImage ? (
            <img src={profileImage} alt="profile" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-400 flex items-center justify-center text-white">
              {fullName.charAt(0)}
            </div>
          )}
        </div>
        <div className="flex flex-col text-right">
          <span className="font-semibold text-gray-700 dark:text-gray-200">{fullName}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">{jobTitle}</span>
        </div>
      </div>


      <div className="flex items-center gap-4">
        <Bell className="w-6 h-6 text-gray-600 dark:text-gray-200 cursor-pointer" />
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 cursor-pointer"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-gray-700 dark:text-gray-200" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Header;
