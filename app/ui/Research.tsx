"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Search,
  Plus,
  MoreVertical,
  Pencil,
  Pin,
  Trash2,
} from "lucide-react";

interface ChatItem {
  id: number;
  title: string;
}

const initialChats: ChatItem[] = [
  { id: 1, title: "جستجوی شماره یک" },
  { id: 2, title: "جستجوی شماره دو" },
  { id: 3, title: "جستجوی شماره سه" },
];

const versions = ["ChatGPT 3.5", "ChatGPT 4", "ChatGPT 4 Turbo"];

const SearchYar: React.FC = () => {
  const [isChatMenuOpen, setIsChatMenuOpen] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [chats, setChats] = useState(initialChats);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const [version, setVersion] = useState("ChatGPT 3.5");
  const [versionMenuOpen, setVersionMenuOpen] = useState(false);

  const filteredChats = chats.filter((c) =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addNewChat = () => {
    const newChat: ChatItem = {
      id: Date.now(),
      title: `چت جدید ${chats.length + 1}`,
    };
    setChats([newChat, ...chats]);
  };

  // انیمیشن نرم کشویی
  const toggleChatMenu = () => {
    if (isChatMenuOpen) {
      // بستن با انیمیشن
      setIsAnimating(true);
      setTimeout(() => {
        setIsChatMenuOpen(false);
        setIsMenuVisible(false);
        setIsAnimating(false);
      }, 400);
    } else {
      // باز کردن با انیمیشن
      setIsChatMenuOpen(true);
      setIsMenuVisible(true);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 400);
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsChatMenuOpen(false);
        setVersionMenuOpen(false);
        setOpenMenuId(null);
        setIsMenuVisible(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      className="rounded-lg flex flex-col min-h-[83vh] overflow-hidden -mt-3 bg-gradient-to-b from-slate-50 to-white mt-1"
      dir="rtl"
    >
      {/* هدر */}
      <header className="flex items-center justify-between p-4 border-b border-gray-100 bg-white shrink-0 relative z-30 flex-row-reverse shadow-sm">
        <div className="relative flex items-center gap-3 h-14">
          <button
            className="px-3 h-full font-bold hover:bg-gray-100 rounded text-gray-800 transition-colors"
            onClick={() => setVersionMenuOpen((v) => !v)}
          >
            {version}
          </button>

          <Image
            src="/Images/gpt.png"
            alt="logo"
            width={56}
            height={56}
            className="w-20 h-20 mt-10 absolute left-[91px] top-[-30px]"
            priority
          />

          {versionMenuOpen && (
            <div className="absolute top-full mt-1 right-0 w-44 bg-white border border-gray-100 rounded-lg shadow-md z-50 transition-all duration-200 ease-out">
              {versions.map((v) => (
                <button
                  key={v}
                  className="w-full text-right px-3 py-2 hover:bg-gray-50 text-sm text-gray-700 transition-colors"
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

        <div className="flex items-center gap-3 h-14">
          <button
            className="p-2 rounded hover:bg-gray-100 text-xl text-gray-700 transition-all duration-200"
            onClick={toggleChatMenu}
          >
            ☰
          </button>
          <span className="font-bold text-gray-800 text-lg">فهرست</span>
        </div>
      </header>

      {/* بدنه سرچ */}
      <main className="flex-1 relative overflow-hidden bg-white">
        {/* بک‌گراند */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="max-w-4xl mx-auto h-full relative">
            <div className="absolute inset-0 grid place-items-center">
              <Image
                src="/Images/chatMain.png"
                alt="searchMain"
                width={383}
                height={106}
                className="object-contain opacity-80 w-[180px] sm:w-[280px] md:w-[380px]"
                priority
              />
            </div>
          </div>
        </div>

        {/* ناحیه نتایج جستجو */}
        <div className="relative w-full overflow-y-auto p-4 md:p-6 z-20 pb-56 max-h-[calc(83vh-80px)]">
          <div className="max-w-4xl mx-auto">
            {searchTerm ? (
              filteredChats.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-gray-700 text-sm mb-4">
                    {filteredChats.length} نتیجه برای: <span className="font-bold text-emerald-600">"{searchTerm}"</span>
                  </p>
                  {filteredChats.map((chat) => (
                    <div
                      key={chat.id}
                      className="p-4 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-all cursor-pointer"
                    >
                      <span className="font-medium text-gray-800">{chat.title}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg font-medium mb-2">هیچ نتیجه‌ای یافت نشد</p>
                  <p className="text-gray-400 text-sm">عبارت دیگری را امتحان کنید</p>
                </div>
              )
            ) : (
              <div className="text-center py-20" />
            )}
          </div>
        </div>

        {/* نوار سرچ */}
        <div className="absolute inset-x-0 bottom-4 z-30 pointer-events-none">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <div className="w-full pointer-events-auto flex items-center gap-2 p-3 bg-white shadow-md border border-gray-100 rounded-2xl">
              <input
                type="text"
                className="flex-1 border border-gray-200 rounded-xl px-4 py-3 outline-none text-sm bg-gray-50 focus:border-emerald-400 focus:bg-white transition-all placeholder:text-gray-400"
                placeholder="جست و جوی هوشمند"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="bg-emerald-500 text-white rounded-xl p-3 hover:bg-emerald-600 transition-all shadow-sm">
                <Search size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* سایدبار منوی فهرست با انیمیشن کشویی نرم */}
        {isChatMenuOpen && (
          <>
            {/* Overlay با fade نرم */}
            <div
              className={`absolute inset-0 bg-black/20 z-30 transition-all duration-300 ease-in-out 
                          ${isMenuVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              onClick={toggleChatMenu}
            />
            
            {/* Sidebar کشویی نرم */}
            <aside className={`absolute inset-y-0 right-0 w-80 h-full bg-white shadow-2xl border-l border-gray-100 z-40 flex flex-col overflow-hidden
                              transition-all duration-400 ease-out
                              ${isMenuVisible 
                                ? 'translate-x-0 opacity-100 scale-100' 
                                : 'translate-x-full opacity-0 scale-95 pointer-events-none'}`}>
              
              {/* Header aside */}
              <div className="p-4 border-b border-gray-100 flex items-center justify-between h-16 shrink-0">
                <button
                  className="flex items-center gap-2 text-[#1B2559] hover:text-emerald-600 transition-colors"
                  onClick={addNewChat}
                >
                  <Plus size={18} />
                  <span className="text-sm font-medium">چت جدید</span>
                </button>
                <Image
                  src="/Images/gpt.png"
                  alt="logo"
                  width={76}
                  height={76}
                  className="absolute left-[12px] top-[19px]"
                />
              </div>

              {/* Search input */}
              <div className="p-4 border-b border-gray-100 shrink-0">
                <div className="flex items-center border border-gray-200 rounded-xl p-3 bg-gray-50">
                  <Search className="w-5 h-5 text-gray-400 ml-2" />
                  <input
                    type="text"
                    placeholder="جستجو"
                    className="flex-1 h-10 outline-none text-sm bg-transparent text-gray-700"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* لیست چت ها */}
              <div className="flex-1 overflow-y-auto relative">
                {filteredChats.map((chat, index) => {
                  const openUp = index > filteredChats.length - 3;

                  return (
                    <div
                      key={chat.id}
                      className="text-[#1B2559] flex justify-between items-center p-3 border-b border-gray-100 hover:bg-gray-50 text-sm cursor-pointer transition-colors group"
                    >
                      <span className="truncate">{chat.title}</span>

                      <div className="relative opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                          className="p-1 rounded hover:bg-gray-100 text-gray-700 transition-all"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenuId(
                              openMenuId === chat.id ? null : chat.id
                            );
                          }}
                        >
                          <MoreVertical size={16} />
                        </button>

                        {openMenuId === chat.id && (
                          <div
                            className={`
                              absolute bg-white border border-gray-100 rounded-lg shadow-md w-40 z-50
                              left-0 transition-all duration-200 ease-out
                              ${openUp ? "bottom-full mb-1" : "top-full mt-1"}
                            `}
                          >
                            <button className="flex items-center gap-2 w-full text-right text-xs p-2 hover:bg-gray-50 text-gray-700 transition-colors">
                              <Pencil size={14} /> ویرایش عنوان
                            </button>
                            <button className="flex items-center gap-2 w-full text-right text-xs p-2 hover:bg-gray-50 text-gray-700 transition-colors">
                              <Pin size={14} /> پین کردن
                            </button>
                            <button className="flex items-center gap-2 w-full text-right text-xs p-2 hover:bg-gray-50 text-red-500 transition-colors">
                              <Trash2 size={14} /> حذف
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </aside>
          </>
        )}
      </main>
    </div>
  );
};

export default SearchYar;
