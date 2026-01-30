import { useMemo, useState } from "react";
import { useCart } from "../../context/CartContext";
import Toast from "../../components/toast";
import { FaTimes } from "react-icons/fa";

const CATEGORY_OPTIONS = [
  { value: "all", label: "ประเภททั้งหมด" },
  { value: "slip", label: "สลิป-ฝากถอน" },
  { value: "book", label: "สมุดเงินฝาก" },
];

const MOCK_SECTIONS = [
  {
    title: "สลิป-ฝากถอน",
    items: [
      { id: 1, name: "ใบรับฝากเงิน", unit: "แผ่น", stock: 80 },
      { id: 2, name: "ใบสำคัญจ่ายเงิน", unit: "เล่ม", stock: 150 },
      { id: 3, name: "ใบคำขอถอนเงิน", unit: "แผ่น", stock: 450 },
    ],
  },
  {
    title: "สมุดเงินฝาก",
    items: [
      { id: 4, name: "สมุดบันทึกการชําระเงิน", unit: "เล่ม", stock: 100 },
      { id: 5, name: "สมุดเงินฝากกองทุนฮัจย์", unit: "เล่ม", stock: 100 },
      { id: 6, name: "สมุดเงินฝากออมทรัพย์วาดีอะห์", unit: "เล่ม", stock: 100 },
      { id: 7, name: "สมุดชําระค่าหุ้นสมาชิกสหกรณ์", unit: "เล่ม", stock: 100 },
    ],
  },
];

// --- คอมโพเนนต์แถวข้อมูลใน Modal ---
function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between items-center py-1 text-sm">
      <span className="text-gray-500 font-medium">{label} :</span>
      <span className="text-gray-900 font-semibold">{value || "-"}</span>
    </div>
  );
}

function ProductCard({ item, onAddToCart, onShowDetail }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
      {/* รูปสินค้า (placeholder) */}
      <div className="h-32 w-full rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <span className="text-4xl">📦</span>
      </div>

      <div className="mt-3">
        <p className="text-sm font-semibold text-gray-900">{item.name}</p>

        <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
          <span>เหลืออีก {item.stock} {item.unit}</span>
          <button 
          onClick={() => onShowDetail(item)} 
          className="text-blue-600 hover:underline"
        >
          ดูรายละเอียด
        </button>
        </div>

        
        <button 
          onClick={() => onAddToCart(item)}
          className="mt-3 w-full rounded-xl bg-black py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
        >
          เพิ่มลงตะกร้า
        </button>
      </div>
    </div>
  );
}

export default function BorrowMaterialPage() {
  const [category, setCategory] = useState("all");
  const [showToast, setShowToast] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { addToCart } = useCart();

  const sections = useMemo(() => {
    if (category === "all") return MOCK_SECTIONS;
    if (category === "slip") return MOCK_SECTIONS.filter((s) => s.title === "สลิป-ฝากถอน");
    if (category === "book") return MOCK_SECTIONS.filter((s) => s.title === "สมุดเงินฝาก");
    return MOCK_SECTIONS;
  }, [category]);

  const handleAddToCart = (item) => {
    addToCart({
      ...item,
      maxStock: item.stock,
      image: "📦",
    });
    setShowToast(true);
  };

  return (
    <div className="min-h-screen bg-gray-200 p-6">
      {/* Container หลักพื้นหลังสีขาว */}
      <div className="mx-auto max-w-7xl rounded-2xl bg-white p-8 shadow-sm">
        
        {/* Header ของหน้า */}
        <div className="flex items-start gap-3">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-gray-800 to-black text-white flex items-center justify-center text-xl shadow-md">
            📦
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">เบิกพัสดุ</h1>
            <p className="text-sm text-gray-500 mt-1">เลือกประเภทและรายการพัสดุที่ต้องการเบิก</p>
          </div>
        </div>

        {/* Dropdown สีเหลือง */}
        <div className="mt-8">
          <div className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-6 py-3 shadow-sm hover:bg-yellow-500 transition-colors">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-transparent text-sm font-semibold text-gray-900 outline-none cursor-pointer"
            >
              {CATEGORY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <span className="text-sm">▾</span>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-8 mb-6 border-t border-gray-100"></div>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((sec) => (
            <section key={sec.title}>
              <h2 className="mb-5 text-base font-bold text-gray-900 flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-yellow-400"></span>
                {sec.title}
              </h2>

              {/* Grid การ์ด */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {sec.items.map((item) => (
                  <ProductCard 
                    key={item.id} 
                    item={item}
                    onAddToCart={handleAddToCart}
                    onShowDetail={(it) => setSelectedItem(it)} // ✅ ส่งตัวสินค้าไปเก็บใน State
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* --- ✅ ป๊อปอัปรายละเอียด (Detail Modal) --- */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity">
          <div className="relative w-full max-w-md bg-white rounded-[2.5rem] p-8 shadow-2xl animate-in fade-in zoom-in duration-300">
            {/* ปุ่มปิด */}
            <button 
              onClick={() => setSelectedItem(null)}
              className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FaTimes size={25} />
            </button>

            {/* หัวข้อ */}
            <h2 className="text-2xl font-bold text-gray-900 text-left mb-6">รายละเอียด</h2>

            {/* การ์ดข้อมูลภายใน (สีเทาอ่อน) */}
            <div className="bg-gray-50/80 rounded-[2rem] p-8 space-y-2 border border-gray-100">
              <InfoRow label="รหัสวัสดุ" value={selectedItem.code} />
              <InfoRow label="ชื่อวัสดุ" value={selectedItem.name} />
              <InfoRow label="ประเภทวัสดุ" value={selectedItem.type || "สลิปฝากถอน"} />
              <InfoRow label="วันที่นำเข้า" value={selectedItem.importDate || "13/09/67"} />
              <InfoRow label="หน่วย" value={selectedItem.packUnit || "แพ็ค"} />
              <InfoRow label="หน่วยละ" value={selectedItem.packSize || "500"} />
              <InfoRow label="หน่วยนับ" value={selectedItem.unit} />
              <InfoRow label="ราคาหน่วยละ" value={selectedItem.price || "286"} />
              <InfoRow label="จำนวนที่นำเข้า" value={selectedItem.importQty || "100"} />
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      <Toast
        message="คุณได้ทำการเพิ่มสินค้าในตะกร้าเป็นแล้ว"
        show={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}