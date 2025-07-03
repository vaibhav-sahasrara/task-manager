import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminRoutes from './admin/AdminRoutes';
import ClientRoutes from './client/ClientRoutes';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/client/*" element={<ClientRoutes />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
