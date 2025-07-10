import { FiHome, FiClipboard, FiUsers, FiUserCheck } from "react-icons/fi";
import { GoSidebarExpand, GoSidebarCollapse } from "react-icons/go";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
// import { FiUsers } from "react-icons/fi";


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

    {
      path: "/admin/all-users",
      label: "All Users",
      icon: <FiUsers />,
    },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 backdrop-blur-md border-r dark:border-gray-700 shadow-md z-40 transition-all duration-300 flex flex-col ${
        isOpen ? "w-60" : "w-16"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-16 border-b border-gray-200 dark:border-gray-700">
        <span className="text-lg font-bold text-indigo-700 dark:text-yellow-300 tracking-tight whitespace-nowrap">
          {isOpen ? "Sahasrara Metatech" : ""}
        </span>
        <button
          onClick={toggleSidebar}
          className="text-indigo-600 hover:text-indigo-800 dark:text-yellow-300 transition text-xl"
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
                  ? "bg-indigo-100 dark:bg-gray-800 text-indigo-700 dark:text-yellow-300 font-semibold"
                  : "text-gray-600 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:text-indigo-700 dark:hover:text-yellow-300"
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
