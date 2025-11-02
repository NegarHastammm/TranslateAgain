"use client";
import { useState } from "react";

export default function LoginCard() {
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    alert(`شماره وارد شده: ${phone}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      

      <div className="relative bg-white rounded-[15px] shadow-lg p-6 flex flex-col items-center w-[483px] h-[596px] border-[1px] z-10">
        
   
        <img 
          src="/Images/logo.png" 
          alt="Login Illustration" 
          className="mb-4 w-32 h-32 object-cover rounded-full"
        />

        <div className="text-center font-bold tracking-0 leading-[100%] mb-6">
          <p>دستیار هوشمندسازان ترجمه</p>
        </div>

  
        <form className="w-full" onSubmit={handleSubmit}>
          <label className="block text-gray-700 mb-2">شماره موبایل</label>
          <div className="flex flex-row-reverse mb-4">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
              +۹۸
            </span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="۹۱۲۳۴۵۶۷۸۹"
              className="flex-1 border border-gray-300 rounded-r-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400"
            />
          </div>

          <button 
            type="submit" 
            className="w-full mt-2 text-white py-2 hover:bg-green-700 transition h-[62px] rounded-[7px] border-[1px] bg-[#278760] text-[#FFFFFF]"
          >
            ارسال پیامک
          </button>
        </form>
      </div>

   
      <img 
        src="/Images/button.png" 
        alt="Floating Decoration" 
        className="-mt-25 w-[30%] h-32 object-contain"
      />
    </div>
  );
}
