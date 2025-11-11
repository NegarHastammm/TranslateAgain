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
  ChevronDown,
} from "lucide-react";

interface ChatItem { id: number; title: string; }
interface MsgBox  { id: number; role: "user" | "bot"; msg: string; }

const initialChats: ChatItem[] = [
  { id: 1, title: "چت شماره ۱" },
  { id: 2, title: "چت شماره ۲" },
  { id: 3, title: "چت شماره ۳" },
];

const initialMsgs: MsgBox[] = [
  { id: 1, role: "bot",  msg: "سلام! من چت‌یار هستم 🤖" },
  { id: 2, role: "user", msg: "سلام! حالت چطوره؟" },
];

const versions = ["ChatGPT 3.5", "ChatGPT 4", "ChatGPT 4 Turbo"];

const MessageBubble: React.FC<{ role: "user" | "bot"; msg: string }> = ({ role, msg }) => {
  const isUser = role === "user";
  return (
    <div className={`w-full flex mb-2 ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`flex items-end gap-2 max-w-[80%] ${isUser ? "flex-row-reverse" : "flex-row"}`}>
        <div className={`rounded-full w-8 h-8 flex items-center justify-center text-white text-sm shrink-0 ${isUser ? "bg-emerald-500" : "bg-gray-400"}`}>
          {isUser ? "U" : "B"}
        </div>
        <div className={`rounded-2xl px-3 py-2 leading-7 break-words ${
          isUser ? "bg-emerald-500 text-white rounded-tr-none"
                 : "bg-white text-gray-800 border rounded-tl-none"
        }`}>
          {msg}
        </div>
      </div>
    </div>
  );
};

const ChatYar: React.FC = () => {
  const [isChatMenuOpen, setIsChatMenuOpen]   = useState(false);
  const [searchTerm, setSearchTerm]           = useState("");
  const [chats, setChats]                     = useState(initialChats);
  const [openMenuId, setOpenMenuId]           = useState<number | null>(null);
  const [version, setVersion]                 = useState("ChatGPT 3.5");
  const [versionMenuOpen, setVersionMenuOpen] = useState(false);

  const [msgs, setMsgs] = useState<MsgBox[]>(initialMsgs);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const filteredChats = chats.filter((c) => c.title.includes(searchTerm));

  const addNewChat = () => {
    const newChat: ChatItem = { id: Date.now(), title: `چت جدید ${chats.length + 1}` };
    setChats([newChat, ...chats]);
    setMsgs([]);
  };

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [msgs.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setIsChatMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setMsgs((prev) => [...prev, { id: Date.now(), role: "user", msg: trimmed }]);
    setInput("");
    setTimeout(() => {
      setMsgs((prev) => [...prev, { id: Date.now() + 1, role: "bot", msg: "پاسخ نمونه از ربات 🤖" }]);
    }, 600);
  };
  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="flex flex-col min-h-[83vh] overflow-hidden -mt-5" dir="rtl">
      {/* ===== هدر ===== */}
      {/* جابه‌جایی گروه‌ها: «ورژن + لوگو» راست، «منو + چت‌یار» چپ */}
      <header className="flex items-center justify-between p-4 border-b border-gray-200 bg-white shrink-0 relative z-30 flex-row-reverse">
        {/* راست: ورژن + لوگو (هم‌راستا با متن) */}
        <div className="relative flex items-center gap-3 h-14">
          <button
            className="flex items-center gap-2 px-3 h-full leading-none font-bold rounded hover:bg-gray-100"
            onClick={() => setVersionMenuOpen((v) => !v)}
          >
            {version}
            <ChevronDown
              size={18}
              className={`transition-transform duration-200 ${versionMenuOpen ? "rotate-180" : ""}`}
            />
          </button>
          <Image
            src="/Images/gpt.png"
            alt="logo"
            width={56} height={56}
            className="w-14 h-14 shrink-0 align-middle"
            priority
          />
          {versionMenuOpen && (
            <div className="absolute top-full mt-1 right-0 w-44 bg-white border rounded shadow-lg z-50">
              {versions.map((v) => (
                <button
                  key={v}
                  className="w-full text-right px-3 py-2 hover:bg-gray-100"
                  onClick={() => { setVersion(v); setVersionMenuOpen(false); }}
                >
                  {v}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* چپ: منو + عنوان (هم‌راستا) */}
        <div className="flex items-center gap-3 h-14">
          <button
            className="p-2 rounded hover:bg-gray-200 text-xl h-full flex items-center"
            onClick={() => setIsChatMenuOpen((v) => !v)}
            aria-label="باز کردن منو"
          >
            ☰
          </button>
          <span className="text-gray-800 font-bold text-lg leading-none self-center">چت‌یار</span>
        </div>
      </header>

      {/* ===== بدنه چت ===== */}
      <main className="flex-1 relative overflow-hidden bg-gray-50">
        {/* لایه تزئینی: لوگوی وسط + تصویر پایین‌چپ (در ستون چت) */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="h-full max-w-4xl mx-auto relative">
            {/* لوگوی وسط ستون چت */}
            <div className="absolute inset-0 grid place-items-center">
              <Image
                src="/Images/chatMain.png"
                alt="chatMain"
                width={383} height={106}
                className="object-contain opacity-90 w-[180px] sm:w-[280px] md:w-[383px]"
                priority
              />
            </div>
            {/* تصویر ثابت پایینِ چپ */}
            <div className="absolute -bottom-1 -left-26">
              <Image
                src="/Images/bg.png"
                alt="bg"
                width={320} height={220}
                className="transform rotate-26 object-contain w-[270px] sm:w-[220px] md:w-[240px] opacity-100"
                priority
              />
            </div>
          </div>
        </div>

        {/* لیست پیام‌ها */}
        <div ref={scrollRef} className="relative w-full h-full overflow-y-auto p-4 md:p-6 z-20">
          <div className="max-w-4xl mx-auto">
            {msgs.map((m) => <MessageBubble key={m.id} role={m.role} msg={m.msg} />)}
            <div className="h-2" />
          </div>
        </div>

        {/* منوی سمت راست (دراور) */}
        <aside
          className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isChatMenuOpen ? "translate-x-0" : "translate-x-full"}`}
          role="dialog" aria-label="منوی چت‌ها"
        >
          <div className="flex flex-col h-full">
            {/* هدر منو: «چت جدید» و لوگوی بزرگ روبرو (هم‌راستا) */}
            <div className="p-4 border-b flex items-center justify-between h-16">
              <button className="flex items-center gap-2 h-full leading-none text-[#1B2559]" onClick={addNewChat}>
                <Plus size={18} /> <span className="font-medium">چت جدید</span>
              </button>
              <Image src="/Images/gpt.png" alt="gpt-large" width={56} height={56}
                     className="w-14 h-14 shrink-0 align-middle" />
            </div>

            {/* جستجو */}
            <div className="p-4 border-b">
              <div className="flex items-center border rounded-md p-2">
                <Search className="w-4 h-4 text-[#E6C286] ml-2" />
                <input
                  type="text"
                  placeholder="جستجو..."
                  className="flex-1 h-9 outline-none text-[#1B2559] bg-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* لیست چت‌ها */}
            <div className="flex-1 overflow-y-auto">
              {filteredChats.map((chat) => (
                <div key={chat.id}
                     className="text-[#1B2559] flex justify-between items-center p-3 border-b hover:bg-gray-50 cursor-pointer">
                  <span className="truncate">{chat.title}</span>
                  <div className="relative">
                    <button className="p-1 hover:bg-gray-200 rounded text-[#1C274C]"
                            onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === chat.id ? null : chat.id); }}>
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
              {filteredChats.length === 0 && (
                <div className="p-6 text-sm text-gray-500">نتیجه‌ای یافت نشد.</div>
              )}
            </div>
          </div>
        </aside>

        {/* بک‌دراپ منو */}
        {isChatMenuOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
               onClick={() => setIsChatMenuOpen(false)} />
        )}
      </main>

      {/* ===== فوتر ===== */}
      <footer className="p-4 border-t border-gray-200 bg-white shrink-0 flex items-center gap-2 z-30">
        <input
          type="text"
          className="flex-1 border rounded-md p-2 outline-none"
          placeholder="پیام خود را بنویسید..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onInputKeyDown}
        />
        <button className="bg-emerald-500 text-white rounded-md p-2 flex items-center justify-center hover:bg-emerald-600" onClick={handleSend}>
          <Send size={18} />
        </button>
        <button className="p-2 rounded hover:bg-gray-200 flex items-center justify-center">
          <Mic size={18} />
        </button>
        <button className="p-2 rounded hover:bg-gray-200 flex items-center justify-center">
          <Paperclip size={18} />
        </button>
      </footer>
    </div>
  );
};

export default ChatYar;
