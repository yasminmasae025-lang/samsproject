import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

function CartItem({ item, onQuantityChange, onRemove }) {
  // ตัด local useState(item.quantity) ออกเพื่อให้ข้อมูลซิงค์กับ Context 100%
  
  const handleDecrease = () => {
    if (item.quantity > 1) {
      onQuantityChange(item.id, item.quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (item.quantity < item.maxStock) {
      onQuantityChange(item.id, item.quantity + 1);
    }
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    const newQty = Math.min(Math.max(1, value), item.maxStock);
    onQuantityChange(item.id, newQty);
  };

  return (
    <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <input
        type="checkbox"
        className="h-5 w-5 rounded border-gray-300 cursor-pointer"
      />

      <div className="h-20 w-20 flex-shrink-0 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <span className="text-3xl">{item.image}</span>
      </div>

      <div className="flex-1">
        <h3 className="text-sm font-semibold text-gray-900">{item.name}</h3>
        <p className="text-xs text-gray-500 mt-1">
          {item.unit} · เหลือในสต็อก {item.maxStock} {item.unit}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handleDecrease}
          className="h-8 w-8 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center justify-center text-gray-600"
        >
          −
        </button>
        <input
          type="number"
          value={item.quantity}
          onChange={handleInputChange}
          className="h-8 w-16 rounded-lg border border-gray-300 text-center text-sm outline-none focus:border-black"
        />
        <button
          onClick={handleIncrease}
          className="h-8 w-8 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center justify-center text-gray-600"
        >
          +
        </button>
      </div>

      <button
        onClick={() => onRemove(item.id)}
        className="text-red-500 hover:text-red-700 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );
}

export default function CartPage() {
  const [selectAll, setSelectAll] = useState(false);
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-gray-800 to-gray-800 text-white flex items-center justify-center text-xl shadow-md">
              🛒
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">ตะกร้าเบิกของ</h1>
              <p className="text-sm text-gray-500 mt-1">
                สินค้าในตะกร้า {cartItems.length} รายการ
              </p>
            </div>
          </div>

          <button 
            onClick={() => navigate('/cart/review')}
            disabled={cartItems.length === 0}
            className="rounded-xl bg-green-500 px-6 py-3 text-sm font-semibold text-white hover:bg-green-600 transition-colors shadow-sm disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            ส่งคำขอเบิก
          </button>
        </div>

        <div className="mb-4 flex items-center gap-3 px-2">
          <input
            type="checkbox"
            checked={selectAll}
            onChange={handleSelectAll}
            className="h-5 w-5 rounded border-gray-300 cursor-pointer"
          />
          <span className="text-sm font-medium text-gray-700">สินค้า</span>
          <span className="ml-auto text-sm font-medium text-gray-700">จำนวน</span>
          <span className="text-sm font-medium text-gray-700 mr-14">แอคชั่น</span>
        </div>

        <div className="space-y-3">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onQuantityChange={updateQuantity}
                onRemove={removeFromCart}
              />
            ))
          ) : (
            <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-lg font-semibold text-gray-900">
                ตะกร้าว่างเปล่า
              </p>
              <p className="text-sm text-gray-500 mt-2">
                ยังไม่มีสินค้าในตะกร้า ลองเพิ่มสินค้าจากหน้าเบิกวัสดุหรือครุภัณฑ์
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}