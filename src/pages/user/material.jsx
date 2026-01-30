import { useMemo, useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import Toast from "../../components/toast";
import { FaTimes } from "react-icons/fa";
import api from "../../services/api";

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between text-sm mb-1">
      <span className="text-gray-500">{label}</span>
      <span className="font-semibold">{value || "-"}</span>
    </div>
  );
}

export default function BorrowMaterialPage() {
  const { addToCart } = useCart();

  const [materials, setMaterials] = useState([]);
  const [materialTypes, setMaterialTypes] = useState([]);
  const [category, setCategory] = useState("all");

  const [selectedItem, setSelectedItem] = useState(null);
  const [showToast, setShowToast] = useState(false);

useEffect(() => {
  loadMaterialTypes();
}, []);

const loadMaterialTypes = async () => {
  try {
    const res = await api.get("/material-type");
    setMaterialTypes(res.data);
  } catch (err) {
    console.error("โหลดประเภทวัสดุไม่สำเร็จ", err);
  }
  };
  

const fetchMaterials = async () => {
  try {
    let url = "/materials/user";

    if (category !== "all") {
      url += `?mat_type=${category}`;
    }

    const res = await api.get(url);
    setMaterials(res.data);
  } catch (err) {
    console.error("โหลดวัสดุไม่สำเร็จ", err);
  }
};

function ProductCard({ item, onAddToCart, onShowDetail }) {
  return (
    <div className="border rounded-xl p-4 bg-white">
      <div className="h-24 bg-gray-100 flex items-center justify-center text-3xl">📦</div>

      <p className="mt-2 font-semibold">{item.name}</p>
      <p className="text-xs text-gray-500">
        เหลือ {item.stock} {item.unit}
      </p>

      <button
        onClick={() => onShowDetail(item)}
        className="mt-1 text-xs text-blue-600 underline"
      >
        ดูรายละเอียด
      </button>

      <button
        disabled={item.stock <= 0}
        onClick={() => onAddToCart(item)}
        className={`mt-3 w-full rounded-xl py-2 text-sm font-medium text-white
          ${item.stock <= 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-black hover:bg-gray-800"}
        `}
      >
        {item.stock <= 0 ? "สินค้าหมด" : "เพิ่มลงตะกร้า"}
      </button>
    </div>
  );
}

  const sections = useMemo(() => {
  const grouped = {};

  materials.forEach((m) => {
    if (!grouped[m.type]) grouped[m.type] = [];
    grouped[m.type].push(m);
  });

  return Object.keys(grouped).map((k) => ({
    title: k,
    items: grouped[k],
  }));
}, [materials]);


  const handleAddToCart = (item) => {
    addToCart(item);
    setShowToast(true);
  };

  useEffect(() => {
  fetchMaterials();
}, [category]);


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">เบิกพัสดุ</h1>

      {sections.map((sec) => (
        <div key={sec.title} className="mb-6">
          <h2 className="font-bold mb-2">{sec.title}</h2>
          <div className="grid grid-cols-2 gap-4">
            {sec.items.map((item) => (
              <ProductCard
                key={item.id}
                item={item}
                onAddToCart={handleAddToCart}
                onShowDetail={setSelectedItem}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-80 relative">
            <button
              className="absolute top-3 right-3"
              onClick={() => setSelectedItem(null)}
            >
              <FaTimes />
            </button>

            <h2 className="font-bold mb-4">รายละเอียด</h2>
            <InfoRow label="รหัส" value={selectedItem.code} />
            <InfoRow label="ชื่อ" value={selectedItem.name} />
            <InfoRow label="คงเหลือ" value={selectedItem.stock} />
          </div>
        </div>
      )}

      <Toast
        show={showToast}
        message="เพิ่มลงตะกร้าแล้ว"
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}
