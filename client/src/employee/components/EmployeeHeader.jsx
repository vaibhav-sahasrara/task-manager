import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiChevronDown, FiSun, FiMoon } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import useDarkMode from "../../utils/useDarkMode";
import useNotifications from "../../hooks/useNotifications"; // adjust path

export default function EmployeeHeader() {
  const [darkMode, setDarkMode] = useDarkMode();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { unread, read, all, markNotificationAsRead } = useNotifications(10000);

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const role = localStorage.getItem("role") || "employee";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <>
      <header className="flex justify-between items-center px-4 h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors">
        <h1 className="text-lg font-bold text-indigo-700 dark:text-yellow-300">
          Employee Dashboard
        </h1>

        <div className="flex items-center gap-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() =>
                setDropdownOpen((prev) => (prev === "notif" ? false : "notif"))
              }
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-indigo-600 dark:text-yellow-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              {unread.length > 0 && (
                <span
                  className="absolute -top-1 -right-1 inline-flex h-4 w-4 items-center justify-center
                       rounded-full bg-red-500 text-[10px] font-semibold text-white"
                >
                  {unread.length}
                </span>
              )}
            </button>

            {/* Notifications dropdown */}
            <AnimatePresence>
              {dropdownOpen === "notif" && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-72 max-h-80 overflow-y-auto
                   rounded-xl border border-gray-200 bg-white p-2 shadow-lg
                   dark:border-gray-700 dark:bg-gray-800 z-50"
                >
                  {all.length === 0 && (
                    <p className="py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                      No notifications
                    </p>
                  )}

                  {all.map((n) => (
                    <button
                      key={n._id}
                      onClick={() => markNotificationAsRead(n._id)}
                      className={`block w-full rounded-md px-3 py-2 text-left text-sm
                       ${
                         n.isRead
                           ? "text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700"
                           : "bg-indigo-50 text-gray-800 hover:bg-indigo-100 dark:bg-indigo-700/30"
                       }
                       dark:text-gray-200`}
                    >
                      {n.message}
                      {!n.isRead && (
                        <span className="ml-2 inline-block h-2 w-2 rounded-full bg-indigo-500" />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
          >
            {darkMode ? (
              <FiSun className="text-yellow-400" />
            ) : (
              <FiMoon className="text-indigo-500" />
            )}
          </button>

          {/* User Button */}
          <button
            onClick={() =>
              setDropdownOpen((prev) => (prev === "user" ? false : "user"))
            }
            className="flex items-center gap-2 px-3 py-1.5 bg-indigo-100 hover:bg-indigo-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full text-sm transition"
          >
            <div className="w-7 h-7 flex items-center justify-center rounded-full bg-indigo-600 text-white font-semibold text-xs uppercase">
              {user.name?.[0] || "E"}
            </div>
            <span className="text-indigo-800 dark:text-yellow-300 font-medium">
              {user.name || "Employee"}
            </span>
            <FiChevronDown className="text-indigo-600 dark:text-yellow-300 text-sm" />
          </button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {dropdownOpen === "user" && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
                className="absolute right-4 mt-32 w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md z-50"
              >
                <div className="px-4 py-2 text-xs text-gray-600 dark:text-gray-300">
                  Role: <span className="font-semibold">{role}</span>
                </div>
                <button
                  onClick={() => setShowModal(true)}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-gray-700 hover:text-red-700 transition"
                >
                  <FiLogOut className="inline mr-2" />
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Logout Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-[90%] max-w-sm p-5 text-center"
            >
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Confirm Logout
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Are you sure you want to logout?
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-full"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="px-5 py-1.5 text-sm bg-red-500 text-white hover:bg-red-600 rounded-full"
                >
                  Yes, Logout
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
