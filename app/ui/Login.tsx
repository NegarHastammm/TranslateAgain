"use client";
import { useState } from "react";

export default function LoginCard() {
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    alert(`شماره وارد شده: ${phone}`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-2xl shadow-lg w-80 p-6 flex flex-col items-center">
        

        <img 
          src="/Images/logo.png" 
          alt="Login Illustration" 
          className="w-32 h-32 object-cover  mb-4"
        />

      
        <form className="w-full" onSubmit={handleSubmit}>
          <label className="block text-gray-700 mb-2">شماره موبایل</label>
          <div className="flex flex-row-reverse">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
              ۹۸+
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
            className="w-full mt-4 bg-green-900 text-white py-2 rounded-lg hover:bg-green-600 transition"
          >
            ورود
          </button>
        </form>
      </div>
    </div>
  );
}
