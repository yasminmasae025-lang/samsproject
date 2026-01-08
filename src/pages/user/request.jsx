import { useState } from "react";
import { FaFileAlt, FaEye } from "react-icons/fa";
import { useCart } from "../../context/cartcontext";
import { useNavigate } from "react-router-dom";


const STATUS_COLORS = {
  pending: "bg-purple-100 text-purple-700 border-purple-200",
  approved: "bg-green-100 text-green-700 border-green-200",
  processing: "bg-yellow-100 text-yellow-700 border-yellow-200",
  rejected: "bg-red-100 text-red-700 border-red-200",
  completed: "bg-green-100 text-green-700 border-green-200",
};

const STATUS_LABELS = {
  pending: "รอดำเนินการ",
  approved: "อนุมัติ",
  processing: "กำลังดำเนินการ",
  rejected: "ไม่อนุมัติ",
  completed: "สำเร็จ",
};

function RequestCard({ request }) {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
      {/* Header with Status */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs text-gray-500 mb-1">เลขคำขอ</p>
          <p className="text-lg font-bold text-gray-900">{request.id}</p>
        </div>
        <span
          className={`px-4 py-1.5 rounded-full text-xs font-semibold border ${
            STATUS_COLORS[request.status]
          }`}
        >
          {STATUS_LABELS[request.status]}
        </span>
      </div>

      {/* Details */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">ประเภท:</span>
          <span className="font-medium text-gray-900">{request.type}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">วันที่ขอ:</span>
          <span className="font-medium text-gray-900">{request.date}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">จำนวนรายการ:</span>
          <span className="font-medium text-gray-900">{request.itemsCount} รายการ</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">ผู้ขอ:</span>
          <span className="font-medium text-gray-900">{request.requester}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">ผู้อนุมัติ:</span>
          <span className="font-medium text-gray-900">{request.approver}</span>
        </div>
      </div>

      {/* Action Button */}
      <button 
        onClick={() => navigate(`/requests/${request.id}`)}
        className="w-full rounded-xl bg-black py-2.5 text-sm font-semibold text-white hover:bg-gray-800 transition-colors flex items-cent justify-center gap-2"
      >
        <FaEye size={16} />
        ดูรายละเอียด
      </button>
    </div>
  );
}

export default function RequestListPage() {
  const [filter, setFilter] = useState("all");
  const { requests } = useCart();

  
  const filterOptions = [
    { label: "ทั้งหมด", value: "all" },
    { label: "รอดำเนินการ", value: "pending" },
    { label: "กำลังดำเนินการ", value: "processing" },
    { label: "ไม่อนุมัติ", value: "rejected" },
    { label: "สำเร็จ", value: "completed" },
    { label: "ยกเลิก", value: "cancelled" },
  ];

  // กรองข้อมูลตามสถานะ
  const filteredRequests = filter === "all" 
    ? requests 
    : requests.filter(req => req.status === filter);

  // นับจำนวนแต่ละสถานะ
  const getCount = (value) => {
    if (value === "all") return requests.length;
    return requests.filter(req => req.status === value).length;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-gray-900 to-gray-900 text-white flex items-center justify-center shadow-md">
              <FaFileAlt size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">รายการคำขอ</h1>
              <p className="text-sm text-gray-500 mt-1">
                ตรวจสอบสถานะคำขอเบิกของคุณ ({requests.length} รายการ)
              </p>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          {filterOptions.map((option) => {
            const count = getCount(option.value);
            return (
              <button
                key={option.value}
                onClick={() => setFilter(option.value)}
                className={`flex-shrink-0 rounded-xl px-6 py-3 text-sm font-semibold transition-all ${
                  filter === option.value
                    ? "bg-black text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {option.label}
                {count > 0 && (
                  <span
                    className={`ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full text-xs ${
                      filter === option.label
                        ? "bg-white text-black"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Request Cards Grid */}
        {filteredRequests.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
            {filteredRequests.map((request) => (
              <RequestCard key={request.id} request={request} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
            <div className="text-6xl mb-4">📋</div>
            <p className="text-lg font-semibold text-gray-900">
              {filter === "all" ? "ยังไม่มีรายการคำขอ" : `ไม่มีรายการ${filter}`}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {filter === "all" 
                ? "คำขอเบิกของคุณจะแสดงที่นี่"
                : "คําขอจะอัปเดตตามสถานะ"
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}