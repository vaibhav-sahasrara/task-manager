import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminRoutes from "./admin/AdminRoutes";
import ClientRoutes from "./client/ClientRoutes";
import ProtectedRoute from "./pages/ProtectedRoute";
import EmployeeRoutes from "./employee/EmployeeRoutes";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/forget-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      {/* ✅ Protected Admin Routes */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminRoutes />
          </ProtectedRoute>
        }
      />

      {/* ✅ Protected Client Routes */}
      <Route
        path="/employee/*"
        element={
          <ProtectedRoute allowedRoles={["employee"]}>
            <EmployeeRoutes />
          </ProtectedRoute>
        }
      />

      {/* ✅ Client Routes */}
      <Route
        path="/client/*"
        element={
          <ProtectedRoute allowedRoles={["client"]}>
            <ClientRoutes />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
