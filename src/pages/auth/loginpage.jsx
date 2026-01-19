import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyLogo from "../../assets/mylogo.png";

export default function LoginPage() {
  // 1. สร้าง State เพื่อเลือกว่าเป็น Admin หรือ User (ค่าเริ่มต้นเป็น User)
  const [role, setRole] = useState("user"); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
  e.preventDefault();
  
  if (role === "admin") {
    // ถ้าเลือกเป็น Admin ให้ไปที่หน้า Dashboard ของ Admin
    navigate("/admin/dashboard"); 
  } else {
    // ถ้าเลือกเป็น User ให้ไปหน้าแรกของ User ปกติ
    navigate("/user/material"); 
  }
};

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center p-4 relative">
      
      {/* --- ส่วนเลือก Role (มุมบนขวา) --- */}
      <div className="absolute top-8 right-8 bg-white rounded-full p-1 border border-gray-200 flex shadow-sm">
        <button
          onClick={() => setRole("admin")}
          className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
            role === "admin" ? "bg-[#1A1A1A] text-white" : "text-gray-900"
          }`}
        >
          Admin
        </button>
        <button
          onClick={() => setRole("user")}
          className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
            role === "user" ? "bg-[#1A1A1A] text-white" : "text-gray-900"
          }`}
        >
          User
        </button>
      </div>

      
      <div className="mb-3 flex flex-col items-center">
      <img 
        src={MyLogo} 
        alt="AIC Logo" 
        className="h-30 w-auto object-contain" 
      />
    </div>

      {/* --- การ์ด Login --- */}
      <div className="w-full max-w-[350px] bg-white rounded-[2.5rem] shadow-sm border border-gray-50 overflow-hidden">
        <div className="p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">เข้าสู่ระบบ</h2>
          
          <form onSubmit={handleLogin} className="space-y- text-left">
            {/* Input อีเมล */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-900 ml-1">อีเมล</label>
              <input
                type="email"
                placeholder="min123@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl bg-[#F8F9FA] border-none outline-none focus:ring-2 focus:ring-black/5 text-sm"
                required
              />
            </div>

            {/* Input รหัสผ่าน */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-900 ml-1">รหัสผ่าน</label>
              <input
                type="password"
                placeholder=".........."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl bg-[#F8F9FA] border-none outline-none focus:ring-2 focus:ring-black/5 text-sm"
                required
              />
            </div>

            {/* ปุ่มเข้าสู่ระบบ */}
            <button
              type="submit"
              className="w-full py-3 mt-4 bg-[#1A1A1A] text-white rounded-2xl font-bold text-sm hover:bg-black transition-colors shadow-lg"
            >
              เข้าสู่ระบบ
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}