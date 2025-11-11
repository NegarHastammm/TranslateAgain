"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  Search,
  Plus,
  Send,
  Mic,
  Paperclip,
  MoreVertical,
  Pencil,
  Pin,
  Trash2,
  ChevronDown,
} from "lucide-react";

interface ChatItem {
  id: number;
  title: string;
}

const initialChats: ChatItem[] = [
  { id: 1, title: "چت شماره ۱" },
  { id: 2, title: "چت شماره ۲" },
  { id: 3, title: "چت شماره ۳" },
];

const versions = ["ChatGPT 3.5", "ChatGPT 4", "ChatGPT 4 Turbo"];

const ChatYar: React.FC = () => {
  const [isChatMenuOpen, setIsChatMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [chats, setChats] = useState(initialChats);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [version, setVersion] = useState("ChatGPT 3.5");
  const [versionMenuOpen, setVersionMenuOpen] = useState(false);

  const filteredChats = chats.filter((chat) =>
    chat.title.includes(searchTerm)
  );

  const addNewChat = () => {
    const newChat: ChatItem = {
      id: Date.now(),
      title: `چت جدید ${chats.length + 1}`,
    };
    setChats([newChat, ...chats]);
  };

  return (
    <div className="-mt-5 flex flex-col h-max-screen h-[83vh] overflow-hidden" dir="rtl">
      {/* هدر */}
      <header className="flex items-center justify-between p-4 border-b border-gray-200 bg-white shrink-0">
        {/* سمت چپ: فهرست و همبرگری */}
        <div className="flex items-center gap-2">
          <span className="text-gray-800 font-semibold">فهرست </span>
          <button
            className="p-2 rounded hover:bg-gray-200"
            onClick={() => setIsChatMenuOpen(!isChatMenuOpen)}
          >
            ☰
          </button>
        </div>

        {/* سمت راست: منوی نسخه ChatGPT */}
        <div className="relative inline-block text-left">
          <Image src="/Images/gpt.png" alt="gpt" width={100} height={100} className="top-[-6] left-[100] absolute" />
          <button
            className="flex justify-center items-center gap-1 px-3 py-1 font-bold rounded hover:bg-gray-100"
            
            onClick={() => setVersionMenuOpen(!versionMenuOpen)}
          >
            {version}
            <ChevronDown
              size={16}
              className={`transition-transform duration-200 font-bold ${
                versionMenuOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {versionMenuOpen && (
            <div className="absolute mt-1 right-0 w-40 bg-white border rounded shadow-lg z-50">
              {versions.map((v) => (
                <button
                  key={v}
                  className="w-full text-right px-3 py-2 hover:bg-gray-100"
                  onClick={() => {
                    setVersion(v);
                    setVersionMenuOpen(false);
                  }}
                >
                  {v}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* فضای مین صفحه */}
      <div className="flex-1 flex relative bg-gray-50 overflow-hidden">
        <div className="p-4">
        <Image src="/Images/chatMain.png" alt="chatMain" width={383} height={106} className=" "/>
        </div>

        {/* ستون ChatMenu */}
        {isChatMenuOpen && (
          <div className="absolute inset-0 z-40 ">
            {/* لایه نیمه‌شفاف */}
            <div
              className="absolute inset-0 bg-gray-200 bg-opacity-30"
              onClick={() => setIsChatMenuOpen(false)}
            />

            <div className="absolute  top-0 right-0 w-80 h-full bg-white shadow-lg flex flex-col p-4 z-50 transform transition-transform duration-300">
              {/* بالای ستون: چت جدید */}
              <div className="flex justify-between items-center mb-4">
                
                <button
                  className="flex items-center gap-1 text-[#1B2559] "
                  onClick={addNewChat}
                >
                  <Plus className="cursor-pointer"  size={16} /> چت جدید
                </button>
              <Image src="/Images/gpt.png" alt="gpt" width={100} height={100} className="absolute left-[1] top-[8]" />
              </div>

              {/* نوار جست‌وجو بدون اسکرول */}
              <div className="mb-4 ">
                <div className="flex items-center border rounded-md p-2">
                  <Search className="w-4 h-4 text-[#E6C286] ml-2 " />
                  <input
                    type="text"
                    placeholder="جستجو"
                    className="flex-1 outline-none text-[#1B2559]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    
                  />
                 
                </div>
                 <div className="text-[#1B2559] p-3 flex justify-start">
                    <span>(2358)مطالب جستجو شده</span>
                  </div>
              </div>

              {/* لیست چت‌ها با سه نقطه و آیکون */}
              <div className="flex-1 ">
                {filteredChats.map((chat) => (
                  <div
                    key={chat.id}
                    className="text-[#A28430] flex justify-between items-center p-2 border-b rounded hover:bg-gray-100"
                  >
                    <span>{chat.title}</span>
                    <div className="relative">
                      <button
                        className="p-1 hover:bg-gray-200 rounded text-[#1C274C]  "
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuId(openMenuId === chat.id ? null : chat.id);
                        }}
                      >
                        <MoreVertical size={16} />
                      </button>

                      {openMenuId === chat.id && (
                        <div className="absolute top-6 right-0 bg-white border rounded shadow-md w-40 z-50 flex flex-col">
                          <button className="flex items-center gap-2 p-2 hover:bg-gray-100 text-gray-700">
                            <Pencil size={14} /> ویرایش عنوان
                          </button>
                          <button className="flex items-center gap-2 p-2 hover:bg-gray-100 text-gray-700">
                            <Pin size={14} /> پین کردن
                          </button>
                          <button className="flex items-center gap-2 p-2 hover:bg-gray-100 text-gray-700">
                            <Trash2 size={14} /> حذف
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* نوار پیام پایین */}
      <div className="p-4 border-t border-gray-200 bg-white shrink-0 flex items-center gap-2">
        <input
          type="text"
          className="flex-1 border rounded-md p-2 outline-none"
          placeholder="پیام خود را بنویسید..."
        />
        <button className="bg-emerald-500 text-white rounded-md p-2 flex items-center justify-center hover:bg-emerald-600">
          <Send size={18} />
        </button>
        <button className="p-2 rounded hover:bg-gray-200 flex items-center justify-center">
          <Mic size={18} />
        </button>
        <button className="p-2 rounded hover:bg-gray-200 flex items-center justify-center">
          <Paperclip size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatYar;
