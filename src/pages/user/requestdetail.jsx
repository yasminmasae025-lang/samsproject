import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaDownload } from "react-icons/fa";
import { useCart } from "../../context/CartContext";

const STATUS_COLORS = {
  pending: "bg-purple-100 text-purple-700",
  approved: "bg-green-100 text-green-700",
  processing: "bg-yellow-100 text-yellow-700",
  rejected: "bg-red-100 text-red-700",
  completed: "bg-green-100 text-green-700",
};

const STATUS_LABELS = {
  pending: "รอดำเนินการ",
  approved: "อนุมัติ",
  processing: "กำลังดำเนินการ",
  rejected: "ไม่อนุมัติ",
  completed: "สำเร็จ",
};

export default function RequestDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { requests } = useCart();

  // หาคำขอที่ตรงกับ id
  const request = requests.find((req) => req.id === id);

  if (!request) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
            <p className="text-lg font-semibold text-gray-900">ไม่พบข้อมูลคำขอ</p>
            <button
              onClick={() => navigate('/requests')}
              className="mt-4 text-sm text-blue-600 hover:underline"
            >
              กลับไปหน้ารายการคำขอ
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
  <div className="mx-auto max-w-6xl">
    <div className="mb-6 flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/requests')} 
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-gray-100 shadow-sm hover:bg-gray-50 transition-colors"
        >
          <FaArrowLeft size={18} className="text-gray-600" />
         </button>

         <div>
          <h1 className="text-xl font-bold text-gray-900">รายละเอียดรายการคำขอ</h1>
        </div>             
      </div>

      <div className="flex items-center">
        <span className="px-6 py-2 rounded-xl bg-purple-100 text-purple-700 text-sm font-semibold border border-purple-200 shadow-sm">
          รอดำเนินการ
        </span>
      </div>
    </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Request Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* การ์ดข้อมูลคำขอพัสดุ */}
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-6">ข้อมูลคำขอพัสดุ</h2>

              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <span className="text-sm text-gray-500">เลขคำขอ:</span>
                  <span className="text-sm font-semibold text-gray-900">{request.id}</span>
                </div>

                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <span className="text-sm text-gray-500">วันที่ขอ:</span>
                  <span className="text-sm font-semibold text-gray-900">{request.date}</span>
                </div>

                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <span className="text-sm text-gray-500">จำนวนรายการ:</span>
                  <span className="text-sm font-semibold text-gray-900">{request.itemsCount} รายการ</span>
                </div>

                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <span className="text-sm text-gray-500">สาขา/หน่วยงาน:</span>
                  <span className="text-sm font-semibold text-gray-900">{request.branch || "001 ศาลหญ้า"}</span>
                </div>

                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <span className="text-sm text-gray-500">ผู้อนุมัติ:</span>
                  <span className="text-sm font-semibold text-gray-900">{request.approver}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">ผู้ขอ:</span>
                  <span className="text-sm font-semibold text-gray-900">{request.requester}</span>
                </div>
              </div>
            </div>

            {/* การ์ดรายการ */}
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-6">รายการ</h2>
              
              {request.items && request.items.length > 0 ? (
                <div className="space-y-4">
                  {request.items.map((item, index) => (
                    <div key={index} className="space-y-3">
                      <p className="text-sm font-semibold text-gray-900">วัสดุ</p>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <p className="text-sm text-gray-900 mb-1">{item.name}</p>
                            <p className="text-xs text-gray-500">({item.unit})</p>
                          </div>
                          <p className="text-sm font-semibold text-gray-900">{item.quantity} {item.unit}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // ส่วนนี้จะแสดงเมื่อยังไม่มีข้อมูล (เพื่อให้เห็นตัวอย่าง)
                <div className="space-y-4">
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-gray-900">วัสดุ</p>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <p className="text-sm text-gray-900 mb-1">ใบรับฝากเงิน</p>
                          <p className="text-xs text-gray-500">(สลิปฝาก-ถอน)</p>
                        </div>
                        <p className="text-sm font-semibold text-gray-900">3 แผ่น</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">ครุภัณฑ์</p>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <p className="text-sm text-gray-900 mb-1">
                            ใบสำคัญจ่ายเงิน (สลิปฝาก-ถอน)
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-gray-900">20 แผ่น</p>
                      </div>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="text-sm text-gray-900 mb-1">
                            ใบสำคัญจ่ายเงิน (สลิปฝาก-ถอน)
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-gray-900">20 แผ่น</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mt-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="text-sm text-gray-900 mb-1">เช็คสาหรับไป</p>
                        </div>
                        <p className="text-sm font-semibold text-gray-900">3 แผ่น</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Status */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl bg-white p-6 shadow-sm sticky top-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6">สถานะ</h2>

              {/* Status Options */}
              <div className="space-y-3 mb-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    checked={request.status === "pending"}
                    readOnly
                    className="h-4 w-4"
                  />
                  <span className="text-sm text-gray-700">รอดำเนินการ</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    checked={request.status === "approved"}
                    readOnly
                    className="h-4 w-4"
                  />
                  <span className="text-sm text-gray-700">อนุมัติแล้ว</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    checked={request.status === "rejected"}
                    readOnly
                    className="h-4 w-4"
                  />
                  <span className="text-sm text-gray-700">ไม่อนุมัติ</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    checked={request.status === "completed"}
                    readOnly
                    className="h-4 w-4"
                  />
                  <span className="text-sm text-gray-700">เบิกเสร็จ</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    checked={request.status === "cancelled"}
                    readOnly
                    className="h-4 w-4"
                  />
                  <span className="text-sm text-gray-700">ยกเลิก</span>
                </label>
              </div>

              {/* Status Badge */}
              <div
                className={`mb-6 rounded-xl px-4 py-3 text-center ${
                  STATUS_COLORS[request.status]
                }`}
              >
                <p className="text-sm font-semibold">
                  {STATUS_LABELS[request.status]}
                </p>
              </div>

              {/* Download Button */}
              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-sm font-bold text-gray-900 mb-3">
                  พิมพ์เบิกวัสดุสูตสามกําถ่อน
                </h3>
                <button className="w-full rounded-xl bg-cyan-400 py-3 text-sm font-semibold text-white hover:bg-cyan-500 transition-colors flex items-center justify-center gap-2">
                  <FaDownload size={16} />
                  ดาวน์โหลด
                </button>
                <button className="mt-2 w-full text-sm text-cyan-500 hover:text-cyan-600 transition-colors">
                  ในเปิด PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}