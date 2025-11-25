"use client";
import React, { useEffect, useRef, useState } from "react";
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
} from "lucide-react";

interface ChatItem {
  id: number;
  title: string;
}

interface MsgBox {
  id: number;
  role: "user" | "bot";
  msg: string;
}

const initialChats: ChatItem[] = [
  { id: 1, title: "چت شماره ۱" },
  { id: 2, title: "چت شماره ۲" },
  { id: 3, title: "چت شماره ۳" },
];

const initialMsgs: MsgBox[] = [
  { id: 1, role: "bot", msg: "سلام! من چت‌یار هستم 🤖" },
  { id: 2, role: "user", msg: "سلام! حالت چطوره؟" },
];

const versions = ["ChatGPT 3.5", "ChatGPT 4", "ChatGPT 4 Turbo"];

// --- پیام‌ها ---
const MessageBubble: React.FC<{ role: "user" | "bot"; msg: string }> = ({
  role,
  msg,
}) => {
  const isUser = role === "user";
  return (
    <div
      className={`w-full flex mb-2 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex items-end gap-2 max-w-[80%] ${
          isUser ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <div
          className={`rounded-full w-8 h-8 flex items-center justify-center text-white text-sm shrink-0 ${
            isUser ? "bg-emerald-500" : "bg-gray-400"
          }`}
        >
          {isUser ? "U" : "B"}
        </div>
        <div
          className={`rounded-2xl px-3 py-2 leading-7 break-words ${
            isUser
              ? "bg-emerald-500 text-white rounded-tr-none"
              : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
          }`}
        >
          {msg}
        </div>
      </div>
    </div>
  );
};

// --- کامپوننت اصلی ---
const ChatYar: React.FC = () => {
  const [isChatMenuOpen, setIsChatMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [chats, setChats] = useState(initialChats);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const [version, setVersion] = useState("ChatGPT 3.5");
  const [versionMenuOpen, setVersionMenuOpen] = useState(false);

  const [msgs, setMsgs] = useState<MsgBox[]>(initialMsgs);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const filteredChats = chats.filter((c) => c.title.includes(searchTerm));

  const addNewChat = () => {
    const newChat: ChatItem = {
      id: Date.now(),
      title: `چت جدید ${chats.length + 1}`,
    };
    setChats([newChat, ...chats]);
    setMsgs([]);
  };

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [msgs.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsChatMenuOpen(false);
        setVersionMenuOpen(false);
        setOpenMenuId(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setMsgs((prev) => [
      ...prev,
      { id: Date.now(), role: "user", msg: trimmed },
    ]);

    setInput("");

    setTimeout(() => {
      setMsgs((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "bot", msg: "پاسخ نمونه از ربات 🤖" },
      ]);
    }, 500);
  };

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div
      className="rounded-lg flex flex-col min-h-[83vh] overflow-hidden -mt-3 bg-gradient-to-b from-slate-50 to-white mt-1"
      dir="rtl"
    >
      {/* ===== هدر ===== */}
      <header className="flex items-center justify-between p-4 border-b border-gray-100 bg-white shrink-0 relative z-30 flex-row-reverse shadow-sm">
        {/* ورژن بدون فلش */}
        <div className="relative flex items-center gap-3 h-14">
          <button
            className="px-3 h-full font-bold hover:bg-gray-100 rounded text-gray-800"
            onClick={() => setVersionMenuOpen((v) => !v)}
          >
            {version}
          </button>

          <Image
            src="/Images/gpt.png"
            alt="logo"
            width={56}
            height={56}
            className="w-20 h-20 mt-10 absolute left-[91] top-[-30]"
            priority
          />

          {versionMenuOpen && (
            <div className="absolute top-full mt-1 right-0 w-44 bg-white border border-gray-100 rounded-lg shadow-md z-50">
              {versions.map((v) => (
                <button
                  key={v}
                  className="w-full text-right px-3 py-2 hover:bg-gray-50 text-sm text-gray-700"
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

        {/* دکمه منوی همبرگری */}
        <div className="flex items-center gap-3 h-14">
          <button
            className="p-2 rounded hover:bg-gray-100 text-xl text-gray-700"
            onClick={() => setIsChatMenuOpen((v) => !v)}
          >
            ☰
          </button>
          <span className="font-bold text-gray-800 text-lg">فهرست</span>
        </div>
      </header>

      {/* ===== بدنه چت ===== */}
      <main className="flex-1 relative overflow-hidden bg-white">
        {/* پس‌زمینه و لوگو */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="max-w-4xl mx-auto h-full relative">
            <div className="absolute inset-0 grid place-items-center">
              <Image
                src="/Images/chatMain.png"
                alt="chatMain"
                width={383}
                height={106}
                className="object-contain opacity-80 w-[180px] sm:w-[280px] md:w-[380px]"
                priority
              />
            </div>

            <div className="absolute -bottom-1 -left-26">
              <Image
                src="/Images/bg.png"
                alt="bg"
                width={320}
                height={220}
                className="transform rotate-12 object-contain w-[270px] sm:w-[220px] md:w-[380px]"
                priority
              />
            </div>
          </div>
        </div>

        {/* پیام‌ها */}
        <div
          ref={scrollRef}
          className="relative w-full overflow-y-auto p-4 md:p-6 z-20 pb-32 max-h-[calc(83vh-80px)]" // ← اضافه شد max-height
        >
          <div className="max-w-4xl mx-auto">
            {msgs.map((m) => (
              <MessageBubble key={m.id} role={m.role} msg={m.msg} />
            ))}
          </div>
        </div>

        {/* نوار اینپوت شناور */}
        <div className="absolute inset-x-0 bottom-4 z-30 pointer-events-none">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <div className="w-full pointer-events-auto flex items-center gap-2 p-3 bg-white shadow-md border border-gray-100 rounded-2xl">
              <input
                type="text"
                className="flex-1 border border-gray-200 rounded-md px-3 py-2 outline-none text-sm bg-gray-50 focus:border-emerald-400 focus:bg-white transition-colors"
                placeholder="پیام خود را بنویسید..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onInputKeyDown}
              />
              <button
                className="bg-emerald-500 text-white rounded-md p-2 hover:bg-emerald-600 transition-colors"
                onClick={handleSend}
              >
                <Send size={18} />
              </button>
              <button className="p-2 rounded hover:bg-gray-100 text-gray-600">
                <Mic size={18} />
              </button>
              <button className="p-2 rounded hover:bg-gray-100 text-gray-600">
                <Paperclip size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* ===== سایدبار چت ===== */}
        {isChatMenuOpen && (
          <>
            {/* بک‌دراپ */}
            <div
              className="absolute inset-0 bg-black/20 z-30"
              onClick={() => {
                setIsChatMenuOpen(false);
                setOpenMenuId(null);
              }}
            />

            {/* سایدبار */}
            <aside className="absolute inset-y-0 right-0 w-80 bg-white shadow-2xl border-l border-gray-100 z-40 flex flex-col">
              {/* هدر */}
              <div className="p-4 border-b border-gray-100 flex items-center justify-between h-16">
                <button
                  className="flex items-center gap-2 text-[#1B2559] hover:text-emerald-600"
                  onClick={addNewChat}
                >
                  <Plus size={18} />
                  <span className="text-sm font-medium">چت جدید</span>
                </button>
                 <Image src="/Images/gpt.png" alt="logo" width={76} height={76} className="absolute left-[12] top-[19]" />
              </div>

              {/* جستجو */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center border border-gray-200 rounded-md p-2 bg-gray-50">
                  <Search className="w-4 h-4 text-[#E6C286] ml-2" />
                  <input
                    type="text"
                    placeholder="جستجو..."
                    className="flex-1 h-9 outline-none text-sm bg-transparent text-[#1B2559]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* لیست چت‌ها */}
              <div className="flex-1 overflow-y-auto relative">
                {filteredChats.map((chat, index) => {
                  const openUp = index > filteredChats.length - 3; // آیتم‌های آخر: منو به بالا

                  return (
                    <div
                      key={chat.id}
                      className="text-[#1B2559] flex justify-between items-center p-3 border-b border-gray-100 hover:bg-gray-50 text-sm cursor-pointer"
                    >
                      <span className="truncate">{chat.title}</span>

                      <div className="relative">
                        <button
                          className="p-1 rounded hover:bg-gray-100 text-gray-700"
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
                              left-0
                              ${openUp ? "bottom-full mb-1" : "top-full mt-1"}
                            `}
                          >
                            <button className="flex items-center gap-2 w-full text-right text-xs p-2 hover:bg-gray-50 text-gray-700">
                              <Pencil size={14} /> ویرایش عنوان
                            </button>
                            <button className="flex items-center gap-2 w-full text-right text-xs p-2 hover:bg-gray-50 text-gray-700">
                              <Pin size={14} /> پین کردن
                            </button>
                            <button className="flex items-center gap-2 w-full text-right text-xs p-2 hover:bg-gray-50 text-red-500">
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

export default ChatYar;
