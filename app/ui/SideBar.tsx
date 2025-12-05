"use client";
import React, { useEffect, useRef, useState } from "react";
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
  ChevronDown,
  UserCog
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
  { key: "dashboard", label: "داشبورد", icon: <LayoutDashboard size={18} />, active: true },
  { key: "chat", label: "چت یار", icon: <UserCog size={18} /> },
  { key: "report", label: "کتابخانه هوشمند", icon: <BookMarked size={18} /> },
  { key: "feedback", label: "گزارش خطا و پیشنهاد", icon: <MailWarning size={18} /> },
  { key: "docs", label: "راهنما و مستندات", icon: <FileText size={18} /> },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const reportRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleReportClick = () => {
    setSubmenuOpen((prev) => !prev);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-200 bg-opacity-15 backdrop-blur-[1px] z-40 md:hidden transition-opacity duration-300"
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
       <div className="flex flex-col h-full justify-between">






          {/* لوگو */}
          <div className="relative py-6 px-4 border-b border-gray-100 flex justify-center items-center">
            <img src="/Images/logo.png" alt="لوگو" className="w-420 h-auto object-contain mx-auto" />
            <button
              className="absolute right-4 md:hidden p-2 rounded hover:bg-gray-200 transition top-[9]"
              onClick={() => setIsOpen(false)}
            >
              <X size={24} />
            </button>
          </div>

          {/* منو — مشکل اینجا بود (mt-[-80]) → حذف شد */}
          <nav className="flex-1 overflow-y-auto mt-2">
            <ul className="space-y-0">
              {menu.map((item, index) => (
                <li key={item.key} className="relative">

                  {index !== 0 && <div className="w-full h-px bg-[#000000] opacity-15 my-1"></div>}

                  <button
                    ref={item.key === "report" ? reportRef : null}
                    onClick={item.key === "report" ? handleReportClick : undefined}
                    className={clsx(
                      "flex items-center justify-between w-full text-right pr-4 pl-3 py-3 rounded-md transition-colors duration-150",
                      item.active
                        ? "bg-emerald-50 text-emerald-700 font-semibold"
                        : "hover:bg-emerald-50 text-gray-700"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      {item.icon}
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>

                    {item.key === "report" && (
                      <ChevronDown
                        className={clsx(
                          "w-4 h-4 text-gray-500 transition-transform duration-300",
                          submenuOpen ? "rotate-180" : "rotate-0"
                        )}
                      />
                    )}
                  </button>

                  {/* ساب‌منوی کشویی */}
                  {item.key === "report" && (
                    <div
                      className={clsx(
                        "overflow-hidden transition-[max-height,opacity] duration-300"
,
                        submenuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                      )}
                    >
                      <ul className="pr-8 mt-1 space-y-1 text-gray-700 text-sm">
                        <li className="py-2 px-2 rounded-md hover:bg-gray-100 cursor-pointer">جست‌وجوی هوشمند</li>
                        <li className="py-2 px-2 rounded-md hover:bg-gray-100 cursor-pointer">مطالعه آنلاین</li>
                        <li className="py-2 px-2 rounded-md hover:bg-gray-100 cursor-pointer">مدیریت منابع</li>
                        <li className="py-2 px-2 rounded-md hover:bg-gray-100 cursor-pointer">یادداشت‌های من</li>
                      </ul>
                    </div>
                  )}

                </li>
              ))}
            </ul>
          </nav>

          {/* دانلود و خروج */}
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
