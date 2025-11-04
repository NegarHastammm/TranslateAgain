"use client";
import React, { useState, useEffect } from "react";

import Header from "./Header";
import Sidebar from "../ui/SideBar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);


  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  return (
    <div className="flex min-h-screen bg-gray-100">
 
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />


      <div
        className={`
          flex-1 flex flex-col
          transition-all duration-300
          md:mr-64
        `}
      >
  
        <Header
          fullName="علی رضایی"
          jobTitle="مهندس نرم‌افزار"
          profileImage="https://i.pravatar.cc/150?img=3"
          toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
        />


        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
