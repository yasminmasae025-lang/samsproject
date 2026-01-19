import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaPlus, FaEllipsisV, FaUsers , FaTrash, FaEdit} from "react-icons/fa";

export default function AdminUserManagement() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("ทั้งหมด");
  const [openMenuId, setOpenMenuId] = useState(null);

  const handleDeleteUser = (id) => {
  if (window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบผู้ใช้คนนี้?")) {
    // 1. กรองเอา ID ที่ต้องการลบออก
    const updatedData = users.filter(user => String(user.id) !== String(id));
    
    // 2. อัปเดต State เพื่อให้หน้าจอเปลี่ยนทันที
    setUsers(updatedData);
    
    // 3. บันทึกลง localStorage (เพื่อให้เปิดมาใหม่แล้วข้อมูลยังหายไปอยู่)
    localStorage.setItem("admin_users", JSON.stringify(updatedData));
    
    setOpenMenuId(null);
    alert("ลบผู้ใช้สำเร็จแล้ว");
  }
};
  // ข้อมูลสมมติสำหรับแสดงผลตามรูปภาพ
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("admin_users");
    return saved ? JSON.parse(saved) : [
      { id: "01", name: "วาสนา จิตใจ", role: "เจ้าหน้าที่พัสดุ", branch: "001 หาดใหญ่", servicePoint: "เคาน์เตอร์", username: "user001" },
      { id: "02", name: "มิน มาซาเอะ", role: "Admin", branch: "ส่วนกลาง", servicePoint: "ตึกE", username: "admin01" },
    ];
  });

  return (
    <div className="p-5 bg-gray-100 min-h-screen text-left">
      
      {openMenuId !== null && (
      <div 
        className="fixed inset-0 z-20 bg-transparent" 
        onClick={() => setOpenMenuId(null)} 
      />
    )}
      {/* 1. ส่วนหัว (Header Section) */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-3 flex items-center gap-4">
        <div className="bg-black p-3 rounded-xl text-white">
          <FaUsers size={24} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-800">การจัดการผู้ใช้</h1>
          <p className="text-gray-400 text-xs">จัดการและติดตามข้อมูลสิทธ์ผู้ใช้ทั้งหมด</p>
        </div>
      </div>

      {/* 2. แถบตัวกรองและปุ่มเพิ่ม (Filter & Add Button) */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-3 flex items-center justify-between">
        <div className="flex gap-2">
          {["ทั้งหมด",].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-2 rounded-xl font-bold text-sm transition-all ${
                activeTab === tab 
                ? "bg-black text-white" 
                : "bg-gray-100 text-gray-400 hover:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 3. ตารางรายชื่อ (User Table) */}
      <div className="bg-white rounded-[1rem] shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-center">
          <thead className="bg-white border-b border-gray-100">
            <tr>
              <th className="px-8 py-5 text-xs font-bold uppercase w-20">ID</th>
              <th className="px-8 py-5 text-xs font-bold uppercase">ชื่อผู้ใช้</th>
              <th className="px-8 py-5 text-xs font-bold uppercase">ตำแหน่ง</th>
              <th className="px-8 py-5 text-xs font-bold uppercase">จุดบริการ</th>
              <th className="px-8 py-5 text-xs font-bold uppercase">สาขา</th>
              <th className="px-8 py-5 text-xs font-bold uppercase">Username</th>
              <th className="px-8 py-5 text-xs font-bold uppercase w-24">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50/50">
                <td className="px-8 py-5 text-sm text-gray-700">{user.id}</td>
                <td className="px-8 py-5 text-sm text-gray-700 font-medium">{user.name}</td>
                <td className={`px-8 py-5 text-sm ${user.role === "Admin" ? "text-pink-300" : "text-gray-600"}`}>
                  {user.role}
                </td>
                <td className="px-8 py-5 text-sm text-gray-600">{user.servicePoint}</td>
                <td className="px-8 py-5 text-sm text-gray-600">{user.branch}</td>
                <td className="px-8 py-5 text-sm text-gray-600">{user.username}</td>
                <td className="px-8 py-5 text-center relative">
  <button 
    onClick={() => setOpenMenuId(openMenuId === user.id ? null : user.id)}
    className="p-2 text-gray-400 hover:bg-gray-100 rounded-full relative z-30"
  >
    <FaEllipsisV size={14} />
  </button>

  {/* Dropdown Menu - ดีไซน์ตามไฟล์ material.jsx */}
  {openMenuId === user.id && (
    <div className="absolute right-10 top-12 bg-white border border-gray-100 shadow-2xl rounded-2xl p-1 z-30 min-w-[50px] flex flex-col items-center">
      <button 
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/admin/adduser`, { state: { editData: user } }); // ส่งข้อมูลไปหน้าแก้ไข
          setOpenMenuId(null);
        }}
        className="p-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors w-full flex justify-center"
      >
        <FaEdit size={16} />
      </button>
      
      <div className="h-[1px] bg-gray-100 w-8" />
      
      <button 
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteUser(user.id);
        }}
        className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors w-full flex justify-center"
      >
        <FaTrash size={16} />
      </button>
    </div>
  )}
</td>
              </tr>
            ))}
            {/* แถวว่างสำหรับเติมให้เต็มตารางตามรูป */}
            {[...Array(3)].map((_, i) => (
              <tr key={`empty-${i}`} className="h-16">
                <td colSpan="7" className="border-t border-gray-100"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}