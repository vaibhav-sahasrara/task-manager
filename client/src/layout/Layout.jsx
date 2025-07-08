// import { useEffect, useState } from 'react';
// import { Outlet, useNavigate, useLocation } from 'react-router-dom';
// import AdminSidebar from '../admin/components/AdminSidebar';
// import ClientSidebar from '../employee/components/EmployeeSidebar';
// import AdminHeader from '../admin/components/AdminHeader';
// import ClientHeader from '../employee/components/EmployeeHeader';

// export default function Layout() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const token = localStorage.getItem('token');
//   const role = localStorage.getItem('role');

//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   useEffect(() => {
//     if (!token) {
//       navigate('/');
//     } else {
//       // If trying to access wrong area, redirect
//       if (role === 'admin' && !location.pathname.startsWith('/admin')) {
//         navigate('/admin/dashboard');
//       } else if (role === 'client' && !location.pathname.startsWith('/client')) {
//         navigate('/client/dashboard');
//       }
//     }
//   }, [navigate, token, location.pathname, role]);

//   const Sidebar = role === 'admin' ? AdminSidebar : ClientSidebar;
//   const Header = role === 'admin' ? AdminHeader : ClientHeader;

//   return (
//     <div className="flex">
//       <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
//       <div className={`flex-1 min-h-screen bg-gray-100 transition-all duration-300 ${isSidebarOpen ? 'ml-60' : 'ml-16'}`}>
//         <Header />
//         <main className="p-4">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

import AdminSidebar from "../admin/components/AdminSidebar";
import EmployeeSidebar from "../employee/components/EmployeeSidebar";
import ClientSidebar from "../client/components/ClientSidebar"; // ✅ Fixed
import AdminHeader from "../admin/components/AdminHeader";
import EmployeeHeader from "../employee/components/EmployeeHeader";
import ClientHeader from "../client/components/ClientHeader"; // ✅ Fixed
import useDarkMode from "../utils/useDarkMode";

export default function Layout() {
  const [darkMode] = useDarkMode();
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      // If trying to access wrong area, redirect to their dashboard
      if (role === "admin" && !location.pathname.startsWith("/admin")) {
        navigate("/admin/dashboard");
      } else if (
        role === "employee" &&
        !location.pathname.startsWith("/employee")
      ) {
        navigate("/employee/dashboard");
      } else if (
        role === "client" &&
        !location.pathname.startsWith("/client")
      ) {
        navigate("/client/dashboard");
      }
    }
  }, [navigate, token, location.pathname, role]);

  // Dynamically assign sidebar and header
  let Sidebar, Header;

  if (role === "admin") {
    Sidebar = AdminSidebar;
    Header = AdminHeader;
  } else if (role === "employee") {
    Sidebar = EmployeeSidebar;
    Header = EmployeeHeader;
  } else if (role === "client") {
    Sidebar = ClientSidebar;
    Header = ClientHeader;
  }

  return (
    // <div className={darkMode ? "dark" : ""}>
    <div className="flex bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {Sidebar && (
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      )}

      <div
        className={`flex-1 min-h-screen bg-gray-100 transition-all duration-300 ${
          isSidebarOpen ? "ml-60" : "ml-16"
        }`}
      >
        {Header && <Header />}
        <main className="p-4 bg-gray-100 dark:bg-gray-800 min-h-[calc(100vh-4rem)]">
          <Outlet />
        </main>
      </div>
    </div>
    // </div>
  );
}
