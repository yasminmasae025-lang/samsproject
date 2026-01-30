import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaHome, FaPlus, FaEllipsisV, FaChevronDown, FaTrash, FaEdit } from "react-icons/fa";
import api from "../../services/api";

export default function AdminMaterials() {
  const navigate = useNavigate();
  const [materialTypes, setMaterialTypes] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [selectedType, setSelectedType] = useState("");

  const handleDelete = async (id) => {
  if (window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้?")) {

    await api.delete(`/materials/${id}`);
    await loadMaterials(); // โหลดข้อมูลใหม่

    alert("ลบรายการสำเร็จแล้ว");
  }
};

  useEffect(() => {
      loadMaterialTypes();
  }, []);
  
  useEffect(() => {
  loadMaterials();
  }, [selectedType]);

    const loadMaterials = async () => {
  try {
    let url = "/materials";

    if (selectedType) {
      url += `?mat_type_id=${selectedType}`;
    }

    const res = await api.get(url);
    setMaterials(res.data);

  } catch (err) {
    console.error("โหลดวัสดุไม่สำเร็จ", err);
  }
};

  
  const loadMaterialTypes = async () => {
  try {
    const res = await api.get("/material-type");
    setMaterialTypes(res.data);
  } catch (err) {
    console.error("โหลดประเภทวัสดุไม่สำเร็จ", err);
  }
  };

  const handleTypeChange = (typeId) => {
  setSelectedType(typeId);
};


  return (
    <div className="p-5 bg-gray-100 min-h-screen text-left relative">
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
          <select
              value={selectedType}
              onChange={(e) => handleTypeChange(e.target.value)}
              className="appearance-none border-2 border-[#157282] text-[#157282] py-2 px-6 pr-12 rounded-xl font-bold text-sm outline-none cursor-pointer"
            >
              <option value="">ประเภททั้งหมด</option>

              {materialTypes.map((type) => (
                <option key={type.mat_type_id} value={type.mat_type_id}>
                  {type.mat_type_name}
                </option>
              ))}
            </select>

          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#157282]"><FaChevronDown size={14} /></div>
        </div>
      </div>

      {/* ตารางข้อมูล - สำคัญ: ต้องเอา overflow-hidden ออก */}
      <div className="bg-white rounded-[1rem] shadow-sm border border-gray-100 relative overflow-hidden">
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
            {materials.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-10 text-gray-400 font-medium"
                >
                  ไม่พบข้อมูลในประเภทนี้
                </td>
              </tr>
            ) : (
              materials.map((m) => (
                <tr key={m.mat_id} className="hover:bg-gray-50/50">
                  <td className="px-8 py-5 text-sm text-gray-700">{m.mat_code}</td>
                  <td className="px-8 py-5 text-sm text-gray-700 font-medium">{m.mat_name}</td>
                  <td className="px-8 py-5 text-sm text-gray-600">{m.mat_type}</td>
                  <td className="px-8 py-5 text-sm text-gray-800 font-bold text-center">{m.import_qty}</td>
                  <td className="px-8 py-5 text-sm text-gray-600">{m.import_date
                    ? new Date(m.import_date).toLocaleDateString("th-TH")
                    : "-"}</td>
                  <td className="px-8 py-5 text-center text-blue-400 cursor-pointer hover:underline" onClick={() => navigate(`/admin/materials/${m.mat_id}`)}>
                    ดูรายละเอียด
                  </td>
                  <td className="px-8 py-5 text-center">
                      <div className="flex justify-center gap-3">

                        {/* EDIT */}
                        <button
                          onClick={() => navigate(`/admin/material/add/${m.mat_id}`)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition"
                          title="แก้ไข"
                        >
                          <FaEdit size={16} />
                        </button>

                        {/* DELETE */}
                        <button
                          onClick={() => handleDelete(m.mat_id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition"
                          title="ลบ"
                        >
                          <FaTrash size={16} />
                        </button>

                      </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}