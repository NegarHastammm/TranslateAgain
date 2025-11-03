"use client";
import { useState, useRef } from "react";

export default function LoginCard() {
  // ------------------- State Management -------------------
  const [mode, setMode] = useState<"phone" | "otp" | "username">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // ایجاد رفرنس برای هر فیلد OTP جهت کنترل فوکوس
  const otpRefs = Array.from({ length: 5 }, () => useRef<HTMLInputElement>(null));

  // ------------------- Phone Submit -------------------
  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (phone.length < 11) {
      alert("لطفاً شماره تلفن معتبر وارد کنید.");
      return;
    }

    // شبیه‌سازی ارسال OTP
    setMode("otp");
  };

  // ------------------- OTP Input Handling -------------------
  const handleOtpChange = (value: string, index: number) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 4) otpRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  // ------------------- OTP Submit -------------------
  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 5) {
      alert("کد تأیید باید ۵ رقم باشد.");
      return;
    }
    alert(`کد وارد شده: ${code}`);
  };

  // ------------------- Username Login -------------------
  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      alert("لطفاً نام کاربری و رمز عبور را وارد کنید.");
      return;
    }
    alert(`ورود با: ${username} / ${password}`);
  };

  // ------------------- UI Rendering -------------------
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="relative bg-white rounded-[15px] shadow-lg p-6 flex flex-col items-center w-[483px] h-auto z-10">
        <img 
          src="/Images/logo.png" 
          alt="Login Illustration" 
          className="mb-4 w-[150px] h-[150px] object-contain"
        />

        <div className="text-center font-bold tracking-0 leading-[100%] mb-6">
          <p>دستیار هوشمندسازان ترجمه</p>
        </div>

        {/* ------------------- Phone Form ------------------- */}
        {mode === "phone" && (
          <form className="w-full" onSubmit={handlePhoneSubmit}>
            <label className="block text-gray-700 mb-2">
              شماره تلفن خود را وارد کنید
            </label>
            <div className="flex flex-row-reverse mb-4">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                ۹۸+
              </span>
              <input
                dir="rtl"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="9124356759"
                className="flex-1 border border-gray-300 rounded-r-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-900 focus:border-green-900"
              />
            </div>

            <button 
              type="submit" 
              className="w-full mt-2 text-white py-2 hover:bg-green-700 transition h-[62px] rounded-[7px] border-[1px] bg-[#278760] text-[#FFFFFF]"
            >
              ارسال پیامک
            </button>

            <p
              onClick={() => setMode("username")}
              className="text-center text-green-900 mt-10 cursor-pointer hover:underline"
            >
              ورود از طریق نام کاربری و بسورد
            </p>
          </form>
        )}

        {/* ------------------- OTP Form ------------------- */}
        {mode === "otp" && (
          <form className="w-full flex flex-col items-center" onSubmit={handleOtpSubmit}>
            <p className="text-gray-700 mb-4 text-center">کد تأیید ۵ رقمی را وارد کنید</p>
            
            <div className="flex justify-center gap-2 mb-6">
              {otp.map((digit, index) => (
                <input
                  dir="ltr"
                  key={index}
                  ref={otpRefs[index]}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 text-center border border-gray-300 rounded-md text-lg focus:ring-2 focus:ring-green-900 focus:border-green-900"
                />
              ))}
            </div>

            <button 
              type="submit" 
              className="w-full text-white py-2 hover:bg-green-700 transition h-[62px] rounded-[7px] border-[1px] bg-[#278760] text-[#FFFFFF]"
            >
              تایید
            </button>

            <p
              onClick={() => setMode("username")}
              className="text-center text-green-900 mt-10 cursor-pointer hover:underline"
            >
              ورود از طریق نام کاربری و بسورد
            </p>
            <p
              onClick={() => setMode("phone")}
              className="text-center text-gray-500 mt-2 text-sm cursor-pointer hover:underline"
            >
              بازگشت به شماره تلفن
            </p>
          </form>
        )}

        {/* ------------------- Username/Password Form ------------------- */}
        {mode === "username" && (
          <form className="w-full flex flex-col items-center" onSubmit={handleUsernameSubmit}>
            <p className="block text-gray-700 mb-2 w-full text-right">ورود به بنل</p>
            <input
              dir="rtl"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="نام کاربری خود را وارد کنید"
              className="w-full mb-4 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-900 focus:border-green-900"
            />

            <label className="block text-gray-700 mb-2 w-full text-right">رمز عبور</label>
            <input
              dir="rtl"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="رمز عبور خود را وارد کنید"
              className="w-full mb-6 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-900 focus:border-green-900"
            />

            <button 
              type="submit" 
              className="w-full text-white py-2 hover:bg-green-700 transition h-[62px] rounded-[7px] border-[1px] bg-[#278760] text-[#FFFFFF]"
            >
              ورود
            </button>

            <p
              onClick={() => setMode("phone")}
              className="text-center text-green-900 mt-10 cursor-pointer hover:underline"
            >
              ورود از طریق شماره تلفن
            </p>
          </form>
        )}
      </div>

      <img 
        src="/Images/button.png" 
        alt="Floating Decoration" 
        className="-mt-25 w-[30%] h-32 object-contain"
      />
    </div>
  );
}
