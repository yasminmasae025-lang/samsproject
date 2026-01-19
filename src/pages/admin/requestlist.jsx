import { useNavigate } from "react-router-dom";
import { FaFileAlt, FaCalendarAlt, FaSearch } from "react-icons/fa";

export default function RequestListPage() {
  const navigate = useNavigate();
    
  const branches = ["001 หาดใหญ่", "002 สงขลา", "ส่วนกลาง"];
  const statuses = ["รออนุมัติ", "อนุมัติแล้ว", "ไม่อนุมัติ"];
  // ข้อมูลสมมติตามภาพ image_f6710c.png
  const requests = [
    { 
      id: "REQ-25-012", 
      date: "22/14/35", 
      requester: "วาสนา จิตใจ", 
      branch: "001 หาดใหญ่",  
      count: 3, 
      status: "รออนุมัติ" 
    },
  ];

  return (
    <div className="p-5 bg-gray-100 min-h-screen text-left">
      
      {/* 1. ส่วนหัว (Header Section) */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-3 flex items-center gap-4">
        <div className="bg-black p-3 rounded-xl text-white">
          <FaFileAlt size={24} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-800">รายการคำขอเบิก</h1>
          <p className="text-gray-400 text-xs">ตรวจสอบและอนุมัติคำขอเบิกจากผู้ใช้งานทุกสาขา</p>
        </div>
      </div>

      {/* 2. ส่วนตัวกรองการค้นหา (Search Filters) */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-3 flex flex-wrap gap-3 items-center">
        <input 
          type="text" 
          placeholder="ค้นหารหัสคำขอ" 
          className="border border-gray-200 px-4 py-2 rounded-xl text-sm outline-none w-40"
        />
        <input 
          type="text" 
          placeholder="ค้นหาชื่อผู้ขอ" 
          className="border border-gray-200 px-4 py-2 rounded-xl text-sm outline-none w-40"
        />
        <div className="relative">
  <input 
    type="date" 
    className="border border-gray-200 px-4 py-2 rounded-xl text-sm outline-none w-40 pr-2 text-gray-500 appearance-none"
    style={{ colorScheme: 'light' }} // ช่วยให้ไอคอนปฏิทินของเบราว์เซอร์ดูสะอาดตา
  />
  {/* เราจะเอา FaCalendarAlt ออก หรือวางไว้แบบเดิมก็ได้ แต่ type="date" ปกติจะมีไอคอนของมันเองอยู่แล้วครับ */}
  <FaCalendarAlt className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={14} />
</div>
        
        
        <select className="border border-gray-200 px-4 py-2 rounded-xl text-sm text-gray-500 outline-none bg-white min-w-[120px]">
        <option value="">สาขาทั้งหมด</option>
            {branches.map((branch, index) => (
        <option key={index} value={branch}>{branch}</option>
        ))}
        </select>

        <select className="border border-gray-200 px-4 py-2 rounded-xl text-sm text-gray-500 outline-none bg-white min-w-[120px]">
        <option value="">สถานะทั้งหมด</option>
            {statuses.map((status, index) => (
        <option key={index} value={status}>{status}</option>
        ))}
        </select>
        <button className="bg-black text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-gray-800 transition-all">
          ค้นหา
        </button>
      </div>

      {/* 3. ตารางรายการคำขอ (Request Table) */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-center">
          <thead>
            <tr className="text-xs font-bold text-gray-800 border-b border-gray-100">
              <th className="px-6 py-5">รหัสคำขอ</th>
              <th className="px-6 py-5">วันที่ขอ</th>
              <th className="px-6 py-5">ผู้ขอ</th>
              <th className="px-6 py-5">สาขา</th>
              <th className="px-6 py-5">จำนวนรายการ</th>
              <th className="px-6 py-5">สถานะ</th>
              <th className="px-6 py-5">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {requests.map((req, index) => (
              <tr key={index} className="hover:bg-gray-50/50">
                <td className="px-6 py-5 text-sm font-medium">{req.id}</td>
                <td className="px-6 py-5 text-sm text-gray-600">{req.date}</td>
                <td className="px-6 py-5 text-sm text-gray-600">{req.requester}</td>
                <td className="px-6 py-5 text-sm text-gray-600">{req.branch}</td>
                <td className="px-6 py-5 text-sm text-gray-800 font-bold">{req.count}</td>
                <td className="px-6 py-5 text-sm">
                  <span className="bg-purple-100 text-purple-500 px-4 py-1.5 rounded-full text-xs font-bold">
                    {req.status}
                  </span>
                </td>
                <td className="px-6 py-5 text-sm">
                  <button 
                    onClick={() => navigate(`/admin/requests/${req.id}`)}
                    className="text-blue-400 hover:underline"
                  >
                    ดูรายละเอียด
                  </button>
                </td>
              </tr>
            ))}
            {/* แถวว่างสำหรับดีไซน์ */}
            {[...Array(3)].map((_, i) => (
              <tr key={i} className="h-16">
                <td colSpan="8" className="border-t border-gray-100"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}