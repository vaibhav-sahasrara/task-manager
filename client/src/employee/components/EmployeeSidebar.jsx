

// import {
//   FiHome,
//   FiClipboard,
//   FiUserCheck,
//   FiBarChart2,
//   FiUser,
//   FiHelpCircle,
// } from "react-icons/fi";
// import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
// import { Link, useLocation } from "react-router-dom";

// export default function EmployeeSidebar({ isOpen, toggleSidebar }) {
//   const location = useLocation();

//   const menuItems = [
//     { path: "/employee/dashboard", label: "Dashboard", icon: <FiHome /> },
//     { path: "/employee/tasks", label: "My Tasks", icon: <FiUserCheck /> },
//     { path: "/employee/projects", label: "My Projects", icon: <FiClipboard /> },
//     { path: "/employee/reports", label: "Reports", icon: <FiBarChart2 /> },
//     { path: "/employee/profile", label: "Profile", icon: <FiUser /> },
//     // { path: '/client/support', label: 'Support', icon: <FiHelpCircle /> },
//   ];

//   return (
//     <aside
//       className={`fixed top-0 left-0 h-screen bg-white shadow-xl border-r transition-all duration-300 flex flex-col overflow-hidden z-30 ${
//         isOpen ? "w-60" : "w-16"
//       }`}
//     >
//       {/* Sidebar Header */}
//       <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-indigo-100 to-purple-100">
//         <span className="text-base font-bold text-indigo-700 tracking-tight">
//           {isOpen ? "Sahasrara" : "S"}
//         </span>
//         <button
//           onClick={toggleSidebar}
//           className="text-indigo-600 hover:text-indigo-800 transition text-xl"
//         >
//           {isOpen ? <GoSidebarCollapse /> : <GoSidebarExpand />}
//         </button>
//       </div>

//       {/* Navigation Links */}
//       <nav className="flex flex-col gap-1 mt-4">
//         {menuItems.map((item) => {
//           const isActive = location.pathname === item.path;
//           return (
//             <Link
//               key={item.path}
//               to={item.path}
//               className={`relative flex items-center gap-2 px-4 py-2 mx-2 text-sm font-medium rounded-xl transition-all duration-200 group ${
//                 isActive
//                   ? "bg-indigo-100 text-indigo-700"
//                   : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-700"
//               }`}
//             >
//               {/* Active indicator bar */}
//               {isActive && (
//                 <span className="absolute left-0 h-5 w-1 rounded-r bg-indigo-600"></span>
//               )}

//               <span className="text-xl group-hover:scale-110 transition-transform">
//                 {item.icon}
//               </span>
//               {isOpen && <span>{item.label}</span>}
//             </Link>
//           );
//         })}
//       </nav>

//       {/* Sidebar Footer */}
//       <div className="mt-auto px-3 py-2 text-[11px] text-gray-400 text-center border-t">
//         {isOpen && "© 2025 Sahasrara"}
//       </div>
//     </aside>
//   );
// }



import {
  FiHome,
  FiClipboard,
  FiUserCheck,
  FiBarChart2,
  FiUser,
} from "react-icons/fi";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { Link, useLocation } from "react-router-dom";

export default function EmployeeSidebar({ isOpen, toggleSidebar }) {
  const location = useLocation();

  const menuItems = [
    { path: "/employee/dashboard", label: "Dashboard", icon: <FiHome /> },
    { path: "/employee/tasks", label: "My Tasks", icon: <FiUserCheck /> },
    { path: "/employee/projects", label: "My Projects", icon: <FiClipboard /> },
    { path: "/employee/reports", label: "Reports", icon: <FiBarChart2 /> },
    { path: "/employee/profile", label: "Profile", icon: <FiUser /> },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen shadow-xl border-r transition-all duration-300 flex flex-col overflow-hidden z-30
        ${isOpen ? "w-60" : "w-16"}
        bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700`}
    >
      {/* ── Header ───────────────────────────────────────── */}
      <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-gray-800 dark:to-gray-700 dark:border-gray-700">
        <span className="text-base font-bold tracking-tight text-indigo-700 dark:text-yellow-300">
          {isOpen ? "Sahasrara" : "S"}
        </span>
        <button
          onClick={toggleSidebar}
          className="text-xl text-indigo-600 hover:text-indigo-800 dark:text-yellow-300 dark:hover:text-yellow-400 transition"
        >
          {isOpen ? <GoSidebarCollapse /> : <GoSidebarExpand />}
        </button>
      </div>

      {/* ── Links ─────────────────────────────────────────── */}
      <nav className="flex flex-col gap-1 mt-4">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex items-center gap-2 mx-2 px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 group
                ${
                  isActive
                    ? "bg-indigo-100 text-indigo-700 dark:bg-gray-800 dark:text-yellow-300"
                    : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-yellow-300"
                }`}
            >
              {isActive && (
                <span className="absolute left-0 h-5 w-1 rounded-r bg-indigo-600 dark:bg-yellow-400" />
              )}

              <span className="text-xl group-hover:scale-110 transition-transform">
                {item.icon}
              </span>
              {isOpen && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* ── Footer ────────────────────────────────────────── */}
      <div className="mt-auto px-3 py-2 text-[11px] text-center border-t border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500">
        {isOpen && "© 2025 Sahasrara"}
      </div>
    </aside>
  );
}
