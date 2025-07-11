// import { useState } from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiChevronDown, FiSun, FiMoon } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import useDarkMode from "../../utils/useDarkMode"; // adjust path as needed
import useNotifications from "../../hooks/useNotifications";
import { useContext } from "react";
import NotificationDropdown from "./common/NotificationDropdown"; // adjust the path

import { toast } from "react-toastify";

export default function AdminHeader() {
  const notifications = useNotifications();
  // const { notifications } = useContext(NotificationContext);
  // const seen = useRef(new Set());
  const [darkMode, setDarkMode] = useDarkMode();

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [notifOpen, setNotifOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const role = localStorage.getItem("role") || "Admin";

  const { unread, read, all, markNotificationAsRead } = useNotifications();
  // const [notifOpen, setNotifOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/");
  };

  /* ---------- toast only for NEW items ---------- */
  const seen = useRef(new Set());
  useEffect(() => {
    unread.forEach((n) => {
      if (!seen.current.has(n._id)) {
        toast.info(n.message);
        seen.current.add(n._id);
      }
    });
  }, [unread]);

  return (
    <>
      <header className="flex justify-between items-center px-4 h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors">
        <h1 className="text-lg font-bold text-indigo-700 dark:text-yellow-300">
          Admin Panel
        </h1>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setNotifOpen((p) => !p)}
              className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <svg
                className="w-6 h-6 text-gray-600 dark:text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159
                         c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              {unread.length > 0 && (
                <span
                  className="absolute -top-1 -right-1 bg-red-500 text-white
                                 text-xs px-1.5 rounded-full"
                >
                  {unread.length}
                </span>
              )}
            </button>

            {/* ▾ Notification Dropdown ▾ */}
            <NotificationDropdown
              notifOpen={notifOpen}
              unread={unread}
              read={read}
              all={all}
              markNotificationAsRead={markNotificationAsRead}
              onViewAll={() => {
                setNotifOpen(false); // close dropdown
                navigate("/admin/notifications");
              }}
            />
          </div>

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

          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 px-3 py-1.5 bg-indigo-100 hover:bg-indigo-200 rounded-full text-sm transition"
          >
            <div className="w-7 h-7 flex items-center justify-center rounded-full bg-indigo-600 text-white font-semibold text-xs uppercase">
              {user.name?.[0] || "A"}
            </div>
            <span className="text-indigo-800 font-medium">
              {user.name || "Admin"}
            </span>
            <FiChevronDown className="text-indigo-600 text-sm" />
          </button>

          {/* Dropdown */}
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-32 w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md z-50"
              >
                <div className="px-4 py-2 text-xs text-gray-600">
                  Role: <span className="font-semibold">{role}</span>
                </div>
                <button
                  onClick={() => setShowModal(true)}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition"
                >
                  <FiLogOut className="inline mr-2" />
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50  bg-black/40 backdrop-blur-sm flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl  shadow-xl w-[90%] max-w-sm p-5 text-center"
            >
              <h2 className="text-lg font-semibold dark:text-gray-300 text-gray-800 mb-2">
                Confirm Logout
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Are you sure you want to logout?
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full"
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
