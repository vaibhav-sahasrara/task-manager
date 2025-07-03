import { FiHome, FiClipboard, FiUsers, FiUserCheck } from "react-icons/fi";
import { GoSidebarExpand, GoSidebarCollapse } from "react-icons/go";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminSidebar({ isOpen, toggleSidebar }) {
  const location = useLocation();

  const menuItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: <FiHome /> },
    { path: "/admin/projects", label: "Projects", icon: <FiClipboard /> },
    { path: "/admin/team", label: "Team", icon: <FiUsers /> },
    {
      path: "/admin/tasks",
      label: "Task Manager",
      icon: <FiClipboard />,
    },
    {
      path: "/admin/pending-users",
      label: "User Approvals",
      icon: <FiUserCheck />,
    },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-white/90 backdrop-blur-md border-r shadow-md z-40 transition-all duration-300 flex flex-col ${
        isOpen ? "w-60" : "w-16"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-16 border-b border-gray-200">
        <span className="text-lg font-bold text-indigo-700 tracking-tight whitespace-nowrap">
          {isOpen ? "Sahasrara Metatech" : "S"}
        </span>
        <button
          onClick={toggleSidebar}
          className="text-indigo-600 hover:text-indigo-800 transition text-xl"
        >
          {isOpen ? <GoSidebarCollapse /> : <GoSidebarExpand />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 mt-2 overflow-y-auto px-1 custom-scroll">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-all duration-150 group mx-1
              ${
                isActive
                  ? "bg-indigo-100 text-indigo-700 font-semibold"
                  : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-700"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <AnimatePresence>
                {isOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto text-center py-3 px-2 text-[10px] text-gray-400">
        {isOpen && <span>© 2025 Sahasrara</span>}
      </div>
    </aside>
  );
}
