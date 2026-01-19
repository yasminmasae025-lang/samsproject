import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { HiChevronDown } from "react-icons/hi";

export default function AddMaterial() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    id: "", name: "", type: "", unit: "", unitPrice: "",
    countUnit: "", pricePerUnit: "", amount: "", date: "", details: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 1. ดึงข้อมูลวัสดุที่มีอยู่แล้วจาก localStorage (ถ้าไม่มีให้เป็น Array ว่าง)
    const existingMaterials = JSON.parse(localStorage.getItem("admin_materials") || "[]");

    // 2. สร้างก้อนข้อมูลใหม่
    const newEntry = {
      ...formData,
      amount: Number(formData.amount) // แปลงเป็นตัวเลขเพื่อให้คำนวณง่ายในอนาคต
    };

    // 3. เพิ่มข้อมูลใหม่ลงไปในรายการเดิม
    const updatedMaterials = [newEntry, ...existingMaterials];

    // 4. บันทึกกลับลง localStorage
    localStorage.setItem("admin_materials", JSON.stringify(updatedMaterials));

    // 5. แจ้งเตือนและกลับไปหน้ารายการ
    alert("บันทึกข้อมูลสำเร็จ");
    navigate("/admin/materials"); // กลับไปหน้ารายการวัสดุ
  };

  return (
    /* เปลี่ยนจาก h-full เป็น min-h-screen และเอา overflow-hidden ออกเพื่อให้เลื่อนได้ */
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      
      {/* Container สำหรับการ์ดสีขาวที่รวมทุกอย่างไว้ข้างในตามรูป */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 max-w-[95%] mx-auto">
        
        {/* Header ส่วนหัว - ย้ายเข้ามาอยู่ในการ์ดสีขาวแล้ว */}
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-black p-3 rounded-xl text-white shadow-lg">
            <FaHome size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 leading-tight">เพิ่มรายการวัสดุสำนักงาน</h1>
            <p className="text-sm text-gray-500">เพิ่มและแก้ไขข้อมูลวัสดุสำนักงาน</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* แถว: รหัสวัสดุ */}
          <div className="max-w-4xl">
            <label className="block text-[14px] font-bold text-gray-900 mb-2 ml-1">รหัสวัสดุ</label>
            <input
              type="text"
              name="id"
              placeholder="กรอกรหัสวัสดุ"
              onChange={handleChange}
              className="w-full p-3 px-5 rounded-2xl bg-gray-50/50 border border-gray-100 focus:bg-white focus:border-blue-400 outline-none transition-all text-sm placeholder:text-gray-300"
            />
          </div>

          {/* แถว: ชื่อวัสดุ */}
          <div className="max-w-4xl">
            <label className="block text-[14px] font-bold text-gray-900 mb-2 ml-1">ชื่อวัสดุ</label>
            <input
              type="text"
              name="name"
              placeholder="กรอกชื่อวัสดุ"
              onChange={handleChange}
              className="w-full p-3 px-5 rounded-2xl bg-gray-50/50 border border-gray-100 focus:bg-white focus:border-blue-400 outline-none transition-all text-sm placeholder:text-gray-300"
            />
          </div>

          {/* แถว: ประเภทวัสดุ */}
          <div className="relative max-w-4xl">
            <label className="block text-[14px] font-bold text-gray-900 mb-2 ml-1">ประเภทวัสดุ</label>
            <div className="relative">
              <select
                name="type"
                onChange={handleChange}
                required
                className="w-full p-3 px-5 rounded-2xl bg-gray-50/50 border border-gray-100 focus:bg-white focus:border-blue-400 outline-none appearance-none cursor-pointer transition-all text-sm text-gray-400"
              >
                <option value="">เลือกประเภท</option>
                              <option value="สลิปฝาก-ถอน">สลิปฝาก-ถอน</option>
                              <option value="สมุดเงินฝาก">สมุดเงินฝาก</option>
              </select>
              <HiChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
            </div>
          </div>

          {/* แถว 3 ช่อง: หน่วย, หน่วยละ, หน่วยนับ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
            <div>
              <label className="block text-[14px] font-bold text-gray-900 mb-2 ml-1">หน่วย</label>
              <input
                type="text"
                name="unit"
                placeholder="กรอกหน่วย"
                onChange={handleChange}
                className="w-full p-3 px-5 rounded-2xl bg-gray-50/50 border border-gray-100 focus:bg-white focus:border-blue-400 outline-none transition-all text-sm placeholder:text-gray-300"
              />
            </div>
            <div>
              <label className="block text-[14px] font-bold text-gray-900 mb-2 ml-1">หน่วยละ</label>
              <input
                type="text"
                name="unitPrice"
                placeholder="กรอกหน่วยละ"
                onChange={handleChange}
                className="w-full p-3 px-5 rounded-2xl bg-gray-50/50 border border-gray-100 focus:bg-white focus:border-blue-400 outline-none transition-all text-sm placeholder:text-gray-300"
              />
            </div>
            <div>
              <label className="block text-[14px] font-bold text-gray-900 mb-2 ml-1">หน่วยนับ</label>
              <input
                type="text"
                name="countUnit"
                placeholder="กรอกหน่วยนับ"
                onChange={handleChange}
                className="w-full p-3 px-5 rounded-2xl bg-gray-50/50 border border-gray-100 focus:bg-white focus:border-blue-400 outline-none transition-all text-sm placeholder:text-gray-300"
              />
            </div>
          </div>

          {/* แถว 2 ช่อง: ราคาหน่วยละ, จำนวนที่นำเข้า */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            <div>
              <label className="block text-[14px] font-bold text-gray-900 mb-2 ml-1">ราคาหน่วยละ</label>
              <input
                type="text"
                name="pricePerUnit"
                placeholder="กรอกราคาหน่วยละ"
                onChange={handleChange}
                className="w-full p-3 px-5 rounded-2xl bg-gray-50/50 border border-gray-100 focus:bg-white focus:border-blue-400 outline-none transition-all text-sm placeholder:text-gray-300"
              />
            </div>
            <div>
              <label className="block text-[14px] font-bold text-gray-900 mb-2 ml-1">จำนวนที่นำเข้า</label>
              <input
                type="number"
                name="amount"
                placeholder="กรอกจำนวนที่นำเข้า"
                onChange={handleChange}
                className="w-full p-3 px-5 rounded-2xl bg-gray-50/50 border border-gray-100 focus:bg-white focus:border-blue-400 outline-none transition-all text-sm placeholder:text-gray-300"
              />
            </div>
          </div>

          {/* แถว: วันที่นำเข้า */}
          <div className="max-w-4xl">
            <label className="block text-[14px] font-bold text-gray-900 mb-2 ml-1">วันที่นำเข้า</label>
            <input
              type="text"
              name="date"
              placeholder="กรอกวันที่นำเข้า"
              onChange={handleChange}
              className="w-full p-3 px-5 rounded-2xl bg-gray-50/50 border border-gray-100 focus:bg-white focus:border-blue-400 outline-none transition-all text-sm placeholder:text-gray-300"
            />
          </div>
          
          {/* ปุ่มกดยืนยัน */}
          <div className="flex items-center gap-4 pt-6">
            <button
              type="submit"
              className="px-10 py-3 bg-black text-white rounded-xl font-bold text-sm hover:bg-gray-800 transition-all shadow-md active:scale-95"
            >
              บันทึกข้อมูล
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-10 py-3 bg-white text-gray-900 border border-gray-200 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all active:scale-95"
            >
              ย้อนกลับ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}