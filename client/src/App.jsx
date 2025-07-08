import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminRoutes from "./admin/AdminRoutes";
import ClientRoutes from "./client/ClientRoutes";
import ProtectedRoute from "./pages/ProtectedRoute";
import EmployeeRoutes from "./employee/EmployeeRoutes";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

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
