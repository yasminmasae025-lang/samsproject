import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyLogo from "../../assets/mylogo.png";

export default function LoginPage() {
  // 1. สร้าง State เพื่อเลือกว่าเป็น Admin หรือ User (ค่าเริ่มต้นเป็น User)
  const [role, setRole] = useState("user"); 
  const [empCode, setEmpCode] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emp_code: empCode,
          password: password, // 🔑 ส่งรหัสผ่านจริง
        }),
      });

      if (!res.ok) {
        alert("รหัสพนักงานหรือรหัสผ่านไม่ถูกต้อง");
        return;
      }

      //const data = await res.json(); // ✅ ประกาศ data ให้ถูก
      const result = await res.json();

      //const user = data.user; // backend ส่ง user มา
      const user = result.user;

      // 🔐 เช็ค role ฝั่ง frontend (ตาม UX ที่วาวาทำ)
      if (role === "admin" && user.role !== "Admin" && user.role !== "Superadmin") {
        alert("คุณไม่มีสิทธิ์เข้าโหมด Admin");
        return;
      }

      // ✅ เก็บข้อมูลผู้ใช้
      // localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("user", JSON.stringify(result.user));

      // 🚀 redirect
      // 🔐 เช็คสิทธิ์จริงจาก backend
      if (user.role === "Superadmin") {
        navigate("/admin/dashboard");
      } else {
        // User + Admin ใช้หน้าเดียวกัน
        navigate("/user/material");
      }

    } catch (error) {
      console.error(error);
      alert("เชื่อมต่อ backend ไม่ได้");
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
              <label className="text-xs font-bold text-gray-900 ml-1">รหัสพนักงาน</label>
              <input
                type="text"
                placeholder="EMP001"
                value={empCode}
                onChange={(e) => setEmpCode(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl bg-[#F8F9FA] border-none outline-none focus:ring-2 focus:ring-black/5 text-sm"
                required
              />
              {/* <input
                type="email"
                placeholder="min123@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl bg-[#F8F9FA] border-none outline-none focus:ring-2 focus:ring-black/5 text-sm"
                required
              /> */}
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