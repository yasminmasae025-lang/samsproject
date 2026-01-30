import { useParams, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function MaterialDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [material, setMaterial] = useState(null);
  
  useEffect(() => {
  loadDetail();
}, []);

const loadDetail = async () => {
    try {
      const res = await api.get(`/materials/${id}`);
      setMaterial(res.data);
    } catch (err) {
      console.error("โหลดรายละเอียดไม่สำเร็จ", err);
    }
  };
  
  if (!material) {
    return <div className="p-10 text-center">ไม่พบข้อมูลพัสดุ</div>;
  }

  console.log("DETAIL =", JSON.stringify(material, null, 2))

  return (
    <div className="p-10 bg-gray-100 min-h-screen flex justify-center items-start">
      <div className="bg-white rounded-[2rem] shadow-sm p-12 w-full max-w-4xl relative">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <div className="bg-black p-3 rounded-xl text-white">
            <FaHome size={24} />
          </div>
          <h1 className="text-xl font-bold text-gray-800">รายละเอียดวัสดุสำนักงาน</h1>
        </div>

        {/* Content Box ตามรูป image_517abe.png */}
        <div className="bg-[#f8fbff] rounded-3xl p-16 grid grid-cols-2 gap-y-10 gap-x-20">
          <div>
            <p className="text-gray-400 text-sm mb-1">รหัสวัสดุ</p>
            <p className="text-lg font-bold text-gray-800">{material.mat_code}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">หน่วย</p>
            <p className="text-lg font-bold text-gray-800">{material.unit_pack }</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">ชื่อวัสดุ</p>
            <p className="text-lg font-bold text-gray-800">{material.mat_name}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">หน่วยละ</p>
            <p className="text-lg font-bold text-gray-800">{material.qty_per_pack}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">ประเภทวัสดุ</p>
            <p className="text-lg font-bold text-gray-800">{material.mat_type}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">หน่วยนับ</p>
            <p className="text-lg font-bold text-gray-800">{material.unit_sub}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">วันที่นำเข้า</p>
            <p className="text-lg font-bold text-gray-800">{material.import_date}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">ราคาหน่วยละ</p>
            <p className="text-lg font-bold text-gray-800">{material.price_per_pack }</p>
          </div>
          <div className="col-start-2">
            <p className="text-gray-400 text-sm mb-1">จำนวนที่นำเข้า</p>
            <p className="text-lg font-bold text-gray-800">{material.import_qty}</p>
          </div>
        </div>

        <div className="flex justify-center mt-10">
        <button 
          onClick={() => navigate(-1)}
          className="bg-black text-white px-12 py-3 rounded-xl font-bold text-sm shadow-md active:scale-95 transition-all"
        >
          กลับหน้าหลัก
              </button>
              </div>
      </div>
    </div>
  );
}