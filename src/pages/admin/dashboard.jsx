import { FaBox, FaArrowAltCircleUp, FaCheckCircle, FaExclamationTriangle, FaTimesCircle, FaLayerGroup } from "react-icons/fa";

export default function AdminDashboard() {
  const stats = [
    { label: "มูลค่าวัสดุคงเหลือทั้งหมด", value: "92,000 บาท", icon: <FaBox className="text-red-400" />, bg: "bg-white" },
    { label: "คำขอเบิกที่รออนุมัติ", value: "0 รายการ", icon: <FaArrowAltCircleUp className="text-purple-400" />, bg: "bg-white" },
    { label: "จำนวนเบิกสำเร็จในเดือนนี้", value: "0 รายการ", icon: <FaCheckCircle className="text-green-400" />, bg: "bg-white" },
    { label: "จำนวนพัสดุที่ใกล้หมด", value: "0 รายการ", icon: <FaExclamationTriangle className="text-orange-400" />, bg: "bg-white" },
    { label: "จำนวนคำขอที่ไม่ได้รับการอนุมัติ", value: "0 รายการ", icon: <FaTimesCircle className="text-yellow-400" />, bg: "bg-white" },
    { label: "จำนวนครุภัณฑ์ทั้งหมด", value: "0 รายการ", icon: <FaLayerGroup className="text-blue-400" />, bg: "bg-white" },
  ];

  
return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashbord</h1>
      
      {/* Stats Grid - การ์ดสรุปตัวเลข */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white py-3 px-6 rounded-2xl shadow-sm border border-gray-50 flex items-center gap-4">
            <div className="p-2.5 bg-gray-50 rounded-xl text-xl flex-shrink-0">{stat.icon}</div>
            <div>
              <p className="text-lg font-bold leading-tight">{stat.value}</p>
              <p className="text-[10px] text-gray-500 leading-tight">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Graph Section - พื้นที่กราฟ */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50 mb-8 min-h-[400px]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold">จำนวนการเบิก ( กราฟ )</h2>
          <div className="flex gap-2">
            <select className="border rounded-lg px-3 py-1 text-sm bg-gray-50"><option>เดือน</option></select>
            <select className="border rounded-lg px-3 py-1 text-sm bg-gray-50"><option>ปี</option></select>
            <button className="bg-black text-white px-4 py-1 rounded-lg text-sm">ดูข้อมูล</button>
          </div>
        </div>
        <div className="w-full h-64 bg-gray-50 rounded-xl border-dashed border-2 border-gray-200 flex items-center justify-center text-gray-400">
          พื้นที่แสดงกราฟ
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50">
        <h2 className="text-lg font-bold">วัสดุที่ถูกเบิกมากที่สุด (ตาราง)</h2>
        <div className="mt-4 h-32 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
          ไม่มีข้อมูลการเบิก
        </div>
      </div>
    </div>
  );
}