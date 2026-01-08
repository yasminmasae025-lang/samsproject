import { Routes, Route, Navigate } from "react-router-dom";
import BorrowMaterialPage from "./pages/user/material";
import EquipmentPage from "./pages/user/equipment";
import CartPage from "./pages/user/cart";
import ReviewRequestPage from "./pages/user/review";
import RequestListPage from "./pages/user/request";
import RequestDetailPage from "./pages/user/requestdetail";
import HistoryPage from "./pages/user/history";
import ProfilePage from "./pages/user/profile";
import LoginPage from "./pages/auth/loginpage";
import AdminDashboard from "./pages/admin/dashboard";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/borrow-material" replace />} />
      <Route path="/borrow-material" element={<BorrowMaterialPage />} />
      <Route path="/equipment" element={<EquipmentPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/cart/review" element={<ReviewRequestPage />} />  
      <Route path="/requests" element={<RequestListPage />} />
      <Route path="/requests/:id" element={<RequestDetailPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/requests/:id" element={<RequestDetailPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin/dashboard" element={<AdminDashboard/>} />
      <Route path="/admin/manage-requests" element={<div>หน้าจัดการคําขอ</div>} />
    </Routes>
  );
}