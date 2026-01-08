import React, { useState, useRef } from "react";
import { FaUserCircle, FaCamera } from "react-icons/fa";

export default function ProfilePage() {
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  const userData = {
    name: "วาสนา จิตใจ",
    position: "เจ้าหน้าที่พัสดุ",
    branch: "001 หาดใหญ่",
    employeeId: "EMP-0012",
    phone: "08x-xxx-xxxx",
    email: "min123@gmail.com",
  };

  // ฟังก์ชันเปิดหน้าต่างเลือกไฟล์
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // ฟังก์ชันจัดการเมื่อเลือกรูปภาพ
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-5xl">
        
        {/* --- Header Section --- */}
        <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-black text-white flex items-center justify-center shadow-md">
            <FaUserCircle size={28} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">บัญชีของฉัน</h1>
            <p className="text-xs text-gray-500 mt-0.5">ข้อมูลบัญชีและการตั้งค่า</p>
          </div>
        </div>

        {/* --- Main Content Section --- */}
        <div className="rounded-3xl bg-white p-12 shadow-sm border border-gray-50 flex flex-col items-center">
          
          {/* ส่วนรูปโปรไฟล์ */}
          <div className="relative mb-4">
            <div className="h-40 w-40 rounded-full border-4 border-[#72C1D1] p-1 overflow-hidden bg-gray-100 flex items-center justify-center shadow-md">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="h-full w-full rounded-full object-cover" />
              ) : (
                <FaUserCircle className="h-full w-full text-gray-300" />
              )}
            </div>
          </div>

          {/* ช่องเลือกไฟล์ที่ซ่อนไว้ */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />

          <button 
            onClick={triggerFileInput} 
            className="text-[#8BC34A] font-bold text-sm mb-12 hover:underline"
          >
            แก้ไขโปรไฟล์
          </button>

          {/* ส่วนข้อมูลรายละเอียด */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
            {/* ข้อมูลผู้ใช้ */}
            <div className="rounded-2xl bg-gray-50/50 p-8 border border-gray-100">
              <h2 className="font-bold text-gray-900 mb-6 border-b pb-2 inline-block border-black text-left">ข้อมูลผู้ใช้</h2>
              <div className="space-y-4">
                <InfoItem label="ชื่อ-นามสกุล" value={userData.name} />
                <InfoItem label="ตำแหน่ง" value={userData.position} />
                <InfoItem label="สาขา" value={userData.branch} />
                <InfoItem label="รหัสพนักงาน" value={userData.employeeId} />
              </div>
            </div>

            {/* ข้อมูลติดต่อ */}
            <div className="rounded-2xl bg-gray-50/50 p-8 border border-gray-100">
              <h2 className="font-bold text-gray-900 mb-6 border-b pb-2 inline-block border-black text-left">ข้อมูลติดต่อ</h2>
              <div className="space-y-4">
                <InfoItem label="เบอร์โทรศัพท์" value={userData.phone} />
                <InfoItem label="อีเมล" value={userData.email} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Component ย่อยสำหรับแสดงแต่ละแถวของข้อมูล
function InfoItem({ label, value }) {
  return (
    <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-2 last:border-0">
      <span className="text-gray-500 font-medium">{label} :</span>
      <span className="text-gray-900 font-semibold">{value}</span>
    </div>
  );
}