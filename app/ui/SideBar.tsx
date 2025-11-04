"use client";
import React, { useEffect } from "react";
import clsx from "clsx";
import {
  LayoutDashboard,
  BookMarked,
  BarChart3,
  MailWarning,
  FileText,
  LogOut,
  Download,
  X,
} from "lucide-react";

type MenuItem = {
  key: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
};

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const menu: MenuItem[] = [
  { key: "dashboard", label: "داشبورد", icon: <LayoutDashboard size={18} /> },
  { key: "library", label: "کتابخانه هوشمند", icon: <BookMarked size={18} />, active: true },
  { key: "report", label: "گزارش‌گیری و آمار", icon: <BarChart3 size={18} /> },
  { key: "feedback", label: "گزارش خطا و پیشنهاد", icon: <MailWarning size={18} /> },
  { key: "docs", label: "راهنما و مستندات", icon: <FileText size={18} /> },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

   
      <aside
        dir="rtl"
        className={clsx(
          "fixed top-0 right-0 h-screen w-64 bg-white border-l border-gray-200 z-50 transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full",
          "md:translate-x-0" 
        )}
      >
        <div className="flex flex-col h-full justify-between overflow-y-auto">

          <div>
            <div className="flex items-center justify-between py-6 px-4 border-b border-gray-100">
              <img src="/Images/logo.png" alt="لوگو" className="w-32 h-auto object-contain" />
              <button
                className="md:hidden p-1 rounded hover:bg-gray-200"
                onClick={() => setIsOpen(false)}
              >
                <X size={24} />
              </button>
            </div>


            <nav className="mt-4">
              <ul className="space-y-1">
                {menu.map((item) => (
                  <li key={item.key}>
                    <button
                      className={clsx(
                        "group flex items-center justify-between w-full text-right pr-4 pl-3 py-3 rounded-md transition-all duration-150 relative overflow-hidden",
                        item.active
                          ? "bg-emerald-50 text-emerald-700"
                          : "hover:bg-emerald-50 text-gray-700"
                      )}
                    >
                      {item.active && (
                        <span className="absolute right-1 top-0 h-full w-1 bg-emerald-500 rounded-r-md" />
                      )}
                      <div className="flex items-center gap-2 z-10">
                        {item.icon}
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>


          <div className="px-4 py-6 border-t border-gray-100 space-y-4">
            <button className="flex items-center justify-center gap-2 w-full border border-gray-300 rounded-lg py-2.5 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition">
              <Download size={18} className="text-emerald-600" />
              <span className="text-sm">دانلود اپلیکیشن</span>
            </button>

            <button className="flex items-center gap-2 text-gray-600 hover:text-emerald-700 text-sm transition">
              <LogOut size={18} />
              خروج از سامانه
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
