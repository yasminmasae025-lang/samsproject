import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaHome, FaPlus, FaEllipsisV, FaChevronDown, FaTrash, FaEdit } from "react-icons/fa";

export default function AdminMaterials() {
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState("ประเภท");
  const [materials, setMaterials] = useState(() => 
    JSON.parse(localStorage.getItem("admin_materials") || "[]")
  ); 
  const [openMenuId, setOpenMenuId] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้?")) {
      const currentData = JSON.parse(localStorage.getItem("admin_materials") || "[]");
      const updatedData = currentData.filter(item => String(item.id) !== String(id));
      localStorage.setItem("admin_materials", JSON.stringify(updatedData));
      setMaterials(updatedData);
      setOpenMenuId(null);
      alert("ลบรายการสำเร็จแล้ว");
    }
  };

  const filteredMaterials = materials.filter((item) => {
    if (filterType === "ประเภท") return true;
    return item.type === filterType || (filterType === "สลิปฝาก-ถอน" && item.type === "slip");
  });

  return (
    <div className="p-5 bg-gray-100 min-h-screen text-left relative">
      
      {/* 1. Overlay (แผ่นใส) - ต้องไม่มี z-index หรือมีแค่ z-10 */}
      {openMenuId !== null && (
        <div 
          className="fixed inset-0 z-20 bg-transparent" 
          onClick={() => setOpenMenuId(null)} 
        />
      )}

      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-3">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="bg-black p-3 rounded-xl text-white shadow-lg"><FaHome size={24} /></div>
            <h1 className="text-xl font-bold text-gray-800">รายการวัสดุสำนักงาน</h1>
          </div>
          <button onClick={() => navigate("/admin/material/add")}
            className="bg-black text-white px-5 py-3 rounded-xl flex items-center gap-2 font-bold text-sm shadow-md active:scale-95 transition-all">
           <FaPlus size={14} /> เพิ่มรายการวัสดุ
          </button>
        </div>

        <div className="relative inline-block">
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="appearance-none border-2 border-[#157282] text-[#157282] py-2 px-6 pr-12 rounded-xl font-bold text-sm outline-none cursor-pointer">
            <option value="ประเภท">ประเภททั้งหมด</option>
            <option value="สลิปฝาก-ถอน">สลิปฝาก-ถอน</option>
            <option value="สมุดเงินฝาก">สมุดเงินฝาก</option>
          </select>
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#157282]"><FaChevronDown size={14} /></div>
        </div>
      </div>

      {/* ตารางข้อมูล - สำคัญ: ต้องเอา overflow-hidden ออก */}
      <div className="bg-white rounded-[1rem] shadow-sm border border-gray-100 relative overflow-visible">
        <table className="w-full text-left">
          <thead className="bg-white border-b border-gray-100">
            <tr>
              <th className="px-8 py-5 text-xs font-bold uppercase">รหัสวัสดุ</th>
              <th className="px-8 py-5 text-xs font-bold uppercase">ชื่อวัสดุ</th>
              <th className="px-8 py-5 text-xs font-bold uppercase">ประเภทวัสดุ</th>
              <th className="px-8 py-5 text-xs font-bold uppercase text-center">จำนวนที่นำเข้า</th>
              <th className="px-8 py-5 text-xs font-bold uppercase">วันที่นำเข้า</th>
              <th className="px-8 py-5 text-xs font-bold uppercase text-center">รายละเอียด</th>           
              <th className="px-8 py-5 text-xs font-bold uppercase text-center">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredMaterials.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50">
                <td className="px-8 py-5 text-sm text-gray-700">{item.id}</td>
                <td className="px-8 py-5 text-sm text-gray-700 font-medium">{item.name}</td>
                <td className="px-8 py-5 text-sm text-gray-600">{item.type}</td>
                <td className="px-8 py-5 text-sm text-gray-800 font-bold text-center">{item.amount}</td>
                <td className="px-8 py-5 text-sm text-gray-600">{item.date}</td>
                <td className="px-8 py-5 text-center text-blue-400 cursor-pointer hover:underline" onClick={() => navigate(`/admin/materials/${item.id}`)}>
                  ดูรายละเอียด
                </td>   
               <td className="px-8 py-5 text-center">
            {/* คอนเทนเนอร์สำหรับจัดกลุ่มปุ่มให้อยู่แนวนอนและอยู่ตรงกลาง */}
            <div className="flex justify-center items-center gap-2">
    
            {/* ปุ่มแก้ไข */}
            <button 
              onClick={() => navigate(`/admin/material/add`, { state: { editData: item }})}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
              title="แก้ไข"
          >
              <FaEdit size={18} />
            </button>

            {/* เส้นคั่นบางๆ (ใส่หรือไม่ใส่ก็ได้ครับ) */}
            <div className="w-[1px] h-4 bg-gray-200" />

            {/* ปุ่มลบ */}
            <button 
              onClick={() => handleDelete(item.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
              title="ลบ"
            >
              <FaTrash size={17} />
            </button>
    
          </div>
        </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}