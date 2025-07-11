// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FiLogOut, FiChevronDown } from "react-icons/fi";
// import { motion, AnimatePresence } from "framer-motion";
// import { FiSun, FiMoon } from "react-icons/fi";
// import useDarkMode from "../../utils//useDarkMode";

// export default function EmployeeHeader() {
//   const [darkMode, setDarkMode] = useDarkMode();
//   const navigate = useNavigate();
//   const [showModal, setShowModal] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const user = JSON.parse(localStorage.getItem("user")) || {};
//   const role = localStorage.getItem("role") || "employee";

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     localStorage.removeItem("role");
//     navigate("/");
//   };

//   return (
//     <>
//       <header className="flex justify-between items-center px-4 h-16 bg-white border-b border-gray-200 shadow-sm">
//         <h1 className="text-lg font-bold text-indigo-700">
//           Employee Dashboard
//         </h1>

//         <div className="flex items-center gap-4">
//           <button
//             onClick={() => setDarkMode(!darkMode)}
//             className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
//           >
//             {darkMode ? (
//               <FiSun className="text-yellow-400" />
//             ) : (
//               <FiMoon className="text-indigo-500" />
//             )}
//           </button>

//           <button
//             onClick={() => setDropdownOpen((prev) => !prev)}
//             className="flex items-center gap-2 px-3 py-1.5 bg-indigo-100 hover:bg-indigo-200 rounded-full text-sm transition"
//           >
//             <div className="w-7 h-7 flex items-center justify-center rounded-full bg-indigo-600 text-white font-semibold text-xs uppercase">
//               {user.name?.[0] || "C"}
//             </div>
//             <span className="text-indigo-800 font-medium">
//               {user.name || "Client"}
//             </span>
//             <FiChevronDown className="text-indigo-600 text-sm" />
//           </button>

//           {/* Dropdown */}
//           <AnimatePresence>
//             {dropdownOpen && (
//               <motion.div
//                 initial={{ opacity: 0, y: -8 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -8 }}
//                 transition={{ duration: 0.15 }}
//                 className="absolute right-0 mt-1 w-44 bg-white border border-gray-200 rounded-xl shadow-md z-50"
//               >
//                 <div className="px-4 py-2 text-xs text-gray-600">
//                   Role: <span className="font-semibold">{role}</span>
//                 </div>
//                 <button
//                   onClick={() => setShowModal(true)}
//                   className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition"
//                 >
//                   <FiLogOut className="inline mr-2" />
//                   Logout
//                 </button>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </header>

//       {/* Logout Modal */}
//       <AnimatePresence>
//         {showModal && (
//           <motion.div
//             className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               initial={{ scale: 0.95, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.95, opacity: 0 }}
//               transition={{ duration: 0.2 }}
//               className="bg-white rounded-xl shadow-xl w-[90%] max-w-sm p-5 text-center"
//             >
//               <h2 className="text-lg font-semibold text-gray-800 mb-2">
//                 Confirm Logout
//               </h2>
//               <p className="text-sm text-gray-600 mb-4">
//                 Are you sure you want to logout?
//               </p>
//               <div className="flex justify-center gap-3">
//                 <button
//                   onClick={() => setShowModal(false)}
//                   className="px-4 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-full"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleLogout}
//                   className="px-5 py-1.5 text-sm bg-red-500 text-white hover:bg-red-600 rounded-full"
//                 >
//                   Yes, Logout
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiChevronDown, FiSun, FiMoon } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import useDarkMode from "../../utils/useDarkMode";

export default function EmployeeHeader() {
  const [darkMode, setDarkMode] = useDarkMode();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
            onClick={() => setDropdownOpen((prev) => !prev)}
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
            {dropdownOpen && (
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
