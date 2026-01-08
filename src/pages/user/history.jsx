import { useState } from "react";
import { FaHistory, FaCalendarAlt, FaChevronDown } from "react-icons/fa";
import { useCart } from "../../context/cartcontext";
import { useNavigate } from "react-router-dom";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import th from "date-fns/locale/th"; 
registerLocale("th", th);

export default function HistoryPage() {
  const { requests } = useCart(); 
  const [activeCategory, setActiveCategory] = useState("วัสดุ");
  const [startDate, setStartDate] = useState(null);
  const navigate = useNavigate();

  // ✅ แก้ไข: ให้แสดงข้อมูลทั้งหมด (ไม่ Filter ออก) เพื่อให้เห็นสถานะล่าสุดของทุกรายการ
  const historyData = requests; 

  const BRANCHES = [
    { id: "all", label: "รวมสาขา" },
    { id: "001", label: "001 หาดใหญ่" },
    { id: "002", label: "002 สงขลา" },
    { id: "003", label: "003 รัตภูมิ" },
    { id: "004", label: "004 คลองแงะ" },
    { id: "005", label: "005 สิงหนคร" },
  ];

  // ฟังก์ชันช่วยเลือกสี Badge ตามสถานะ
  const getStatusStyle = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700 border-green-200"; // เขียว
      case "pending":
        return "bg-purple-100 text-purple-700 border-purple-200"; // ม่วง
      case "rejected":
        return "bg-red-100 text-red-700 border-red-200"; // แดง
      case "approved":
        return "bg-blue-100 text-blue-700 border-blue-200"; // ฟ้า
      case "processing":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"; // เหลือง
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  // ฟังก์ชันช่วยแสดงชื่อสถานะเป็นภาษาไทย
  const getStatusLabel = (status) => {
    const labels = {
      pending: "รอดำเนินการ",
      approved: "อนุมัติแล้ว",
      processing: "กำลังดำเนินการ",
      rejected: "ไม่อนุมัติ",
      completed: "เบิกสำเร็จ",
      cancelled: "ยกเลิก",
    };
    return labels[status] || status;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 text-left">
      <div className="mx-auto max-w-7xl">
        
        {/* --- Header Section --- */}
        <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-xl bg-black text-white flex items-center justify-center shadow-lg">
              <FaHistory size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">ประวัติการเบิก</h1>
              <p className="text-sm text-gray-500 mt-1">ตรวจสอบประวัติการเบิก พร้อมรายละเอียดและสถานะของคำขอในอดีต</p>
            </div>
          </div>

          <div className="flex bg-gray-100 p-1 rounded-xl">
            <button 
              onClick={() => setActiveCategory("วัสดุ")}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeCategory === "วัสดุ" ? "bg-[#72C1D1] text-white shadow-sm" : "text-gray-500"}`}
            >
              วัสดุ
            </button>
            <button 
              onClick={() => setActiveCategory("ครุภัณฑ์")}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeCategory === "ครุภัณฑ์" ? "bg-gray-500 text-white shadow-sm" : "text-gray-500"}`}
            >
              ครุภัณฑ์
            </button>
          </div>
        </div>

        {/* --- Filter Search Section --- */}
        <div className="mb-6 rounded-2xl bg-white p-4 shadow-sm border border-gray-100 flex flex-wrap gap-3">
          <input 
            type="text" 
            placeholder="ค้นหารหัสคำขอ" 
            className="flex-1 min-w-[150px] border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#72C1D1]"
          />
          <input 
            type="text" 
            placeholder="ค้นหาชื่อสินค้า" 
            className="flex-1 min-w-[150px] border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#72C1D1]"
          />
          <div className="relative flex-1 min-w-[150px]">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              locale="th"
              dateFormat="dd/MM/yyyy"
              placeholderText="วว/ดด/ปปปป"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#72C1D1] bg-white cursor-pointer"
            />
            <FaCalendarAlt className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          
          <div className="relative flex-1 min-w-[120px]">
            <select className="w-full appearance-none border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#72C1D1] bg-white cursor-pointer">
              {BRANCHES.map((branch) => (
                <option key={branch.id} value={branch.id}>{branch.label}</option>
              ))}
            </select>
            <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none" />
          </div>
          
          <div className="relative flex-1 min-w-[120px]">
            <select className="w-full appearance-none border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#72C1D1] bg-white cursor-pointer">
              <option value="all">รวมสถานะ</option>
              <option value="pending">รอดำเนินการ</option>
              <option value="completed">เบิกสำเร็จ</option>
              <option value="rejected">ไม่อนุมัติ</option>
            </select>
            <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none" />
          </div>
          
          <button className="bg-black text-white px-8 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-800 transition-all">
            ค้นหา
          </button>
        </div>

        {/* --- History Table Section --- */}
        <div className="rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 text-center">
                <th className="px-6 py-5 text-sm font-bold text-gray-900">รหัสคำขอ</th>
                <th className="px-6 py-5 text-sm font-bold text-gray-900">วันที่เบิก</th>
                <th className="px-6 py-5 text-sm font-bold text-gray-900">จำนวนรายการ</th>
                <th className="px-6 py-5 text-sm font-bold text-gray-900">สาขา</th>
                <th className="px-6 py-5 text-sm font-bold text-gray-900">สถานะล่าสุด</th>
                <th className="px-6 py-5 text-sm font-bold text-gray-900">การดำเนินงาน</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {historyData.map((item) => (
                <tr key={item.id} className="text-center hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-5 text-sm text-gray-600">{item.id}</td>
                  <td className="px-6 py-5 text-sm text-gray-600">{item.date}</td>
                  <td className="px-6 py-5 text-sm text-gray-600 font-bold">{item.itemsCount}</td>
                  <td className="px-6 py-5 text-sm text-gray-600">{item.branch}</td>
                  
                  <td className="px-6 py-5">
                    <span className={`px-6 py-1.5 rounded-full text-xs font-bold border ${getStatusStyle(item.status)}`}>
                      {getStatusLabel(item.status)}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <button 
                      onClick={() => navigate(`/requests/${item.id}`)} 
                      className="text-[#72C1D1] text-xs font-bold hover:underline"
                    >
                      ดูรายละเอียด
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}