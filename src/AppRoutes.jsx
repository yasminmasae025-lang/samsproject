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
import AdminMaterials from "./pages/admin/material";
import AddMaterials from "./pages/admin/addmaterial";
import MaterialDetail from "./pages/admin/materialdetail";
import AdminUserManagement from "./pages/admin/usermanagement";
import AdminRequestListPage from "./pages/admin/requestlist";
import AdminRequestDetailPage from "./pages/admin/requestdetail";

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
      <Route path="/admin/materials" element={<AdminMaterials />} />
      <Route path="/admin/material/add" element={<AddMaterials />} />
      <Route path="/admin/materials/:id" element={<MaterialDetail />} />
      <Route path="/admin/material/add/:id" element={<AddMaterials />} />
      <Route path="/admin/users" element={<AdminUserManagement />} />
      <Route path="/admin/requests" element={<AdminRequestListPage />} />
      <Route path="/admin/request-detail/:id" element={<AdminRequestDetailPage />} />
    </Routes>
  );
}