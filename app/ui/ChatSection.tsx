"use client";
import React, { useState } from "react";
import {
  Pencil,
  Pin,
  Trash2,
  Search,
  Paperclip,
  Mic,
  ChevronDown,
} from "lucide-react";

interface ChatItem {
  id: number;
  title: string;
  subChats?: string[];
}

const initialChats: ChatItem[] = [
  { id: 1, title: "چت شماره ۱", subChats: ["پیام ۱", "پیام ۲"] },
  { id: 2, title: "چت شماره ۲", subChats: ["پیام ۳"] },
  { id: 3, title: "چت شماره ۳" },
];

const ChatYar: React.FC = () => {
  const [chats, setChats] = useState(initialChats);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<number | null>(null);

  const filteredChats = chats.filter((chat) =>
    chat.title.includes(searchTerm)
  );

  return (
    <div className="flex flex-col h-full relative" dir="rtl">
      {/* هدر */}
      <header className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
        <span className="text-gray-800 font-semibold">فهرست</span>
        <button
          className="p-2 rounded hover:bg-gray-200"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </header>

      {/* منوی همبرگری با انیمیشن */}
      <div
        className={`absolute top-full right-0 mt-1 w-72 bg-white border border-gray-200 shadow-lg z-50
          transform transition-transform duration-300 origin-top-right
          ${isMenuOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"}
        `}
        style={{ transformOrigin: "top right" }}
      >
        {/* جستجو */}
        <div className="p-2 border-b border-gray-200">
          <div className="flex items-center border rounded-md p-2">
            <Search className="text-gray-500 w-4 h-4 ml-2" />
            <input
              type="text"
              placeholder="جست‌وجو بین چت‌ها..."
              className="flex-1 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="ml-2 text-gray-500">({filteredChats.length})</span>
          </div>
        </div>

        {/* لیست چت‌ها */}
        <div className="max-h-64 overflow-y-auto p-2">
          {filteredChats.map((chat) => (
            <div key={chat.id} className="flex flex-col">
              <div
                className="flex justify-between items-center p-2 rounded hover:bg-gray-100 cursor-pointer"
                onClick={() =>
                  chat.subChats
                    ? setOpenSubMenu(openSubMenu === chat.id ? null : chat.id)
                    : undefined
                }
              >
                <span>{chat.title}</span>
                {chat.subChats && (
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openSubMenu === chat.id ? "rotate-180" : ""
                    }`}
                  />
                )}
              </div>

              {/* ساب منو */}
              {chat.subChats && (
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openSubMenu === chat.id ? "max-h-40" : "max-h-0"
                  }`}
                >
                  {chat.subChats.map((sub, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center p-2 pr-6 rounded hover:bg-gray-100 text-sm text-gray-700"
                    >
                      <span>{sub}</span>
                      <div className="flex gap-2 text-gray-500">
                        <button title="ویرایش">
                          <Pencil size={14} />
                        </button>
                        <button title="پین">
                          <Pin size={14} />
                        </button>
                        <button title="حذف">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* فضای پیام پایین */}
      <div className="mt-auto p-4 border-t border-gray-200 flex items-center gap-2">
        <input
          type="text"
          placeholder="پیام خود را بنویسید..."
          className="flex-1 border rounded-md p-2 outline-none"
        />
        <button title="ارسال فایل">
          <Paperclip size={20} />
        </button>
        <button title="ضبط صدا">
          <Mic size={20} />
        </button>
        <button className="bg-emerald-500 text-white rounded-md px-4 py-2">
          ارسال
        </button>
      </div>
    </div>
  );
};

export default ChatYar;
