// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FiLogOut, FiChevronDown } from "react-icons/fi";
// import { motion, AnimatePresence } from "framer-motion";

// const ClientHeader = () => {
//   const navigate = useNavigate();
//   const [showModal, setShowModal] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const user = JSON.parse(localStorage.getItem("user")) || {};
//   const role = localStorage.getItem("role") || "client";

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     localStorage.removeItem("role");
//     navigate("/");
//   };

//   return (
//     <>
//       <header className="flex justify-between items-center px-4 h-16 bg-white border-b border-gray-200 shadow-sm">
//         <h1 className="text-xl font-bold text-indigo-700 tracking-wide">
//           Client Dashboard
//         </h1>

//         <div className="relative">
//           <button
//             onClick={() => setDropdownOpen((prev) => !prev)}
//             className="flex items-center gap-2 px-3 py-2 bg-indigo-100 hover:bg-indigo-200 rounded-full text-sm transition shadow-sm"
//           >
//             <div className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-sm uppercase">
//               {user.name?.[0] || "C"}
//             </div>
//             <span className="text-indigo-800 font-semibold capitalize">
//               {user.name || "Client"}
//             </span>
//             <FiChevronDown className="text-indigo-600 text-base" />
//           </button>

//           <AnimatePresence>
//             {dropdownOpen && (
//               <motion.div
//                 initial={{ opacity: 0, y: -8 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -8 }}
//                 transition={{ duration: 0.15 }}
//                 className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-50"
//               >
//                 <div className="px-4 py-2 text-xs text-gray-500 border-b">
//                   Role: <span className="font-medium capitalize">{role}</span>
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
//               className="bg-white rounded-xl shadow-xl w-[90%] max-w-sm p-6 text-center"
//             >
//               <h2 className="text-xl font-semibold text-gray-800 mb-2">
//                 Confirm Logout
//               </h2>
//               <p className="text-sm text-gray-500 mb-4">
//                 Are you sure you want to logout from your account?
//               </p>
//               <div className="flex justify-center gap-4">
//                 <button
//                   onClick={() => setShowModal(false)}
//                   className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-full"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleLogout}
//                   className="px-5 py-2 text-sm bg-red-500 text-white hover:bg-red-600 rounded-full"
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
// };

// export default ClientHeader;



import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiChevronDown } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const ClientHeader = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const role = localStorage.getItem("role") || "client";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <header className="flex justify-between items-center px-6 h-16 bg-white border-b shadow-sm">
        <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-fuchsia-600 tracking-wide">
          Client Dashboard
        </h1>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white rounded-full text-sm shadow-lg hover:shadow-xl transition-all"
          >
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-indigo-700 font-bold shadow-inner">
              {user.name?.[0] || "C"}
            </div>
            <span className="font-medium capitalize">{user.name || "Client"}</span>
            <FiChevronDown />
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-50"
              >
                <div className="px-4 py-2 text-xs text-gray-500 border-b">
                  Role: <span className="font-medium capitalize">{role}</span>
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
              className="bg-white rounded-xl shadow-2xl w-[90%] max-w-sm p-6 text-center"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Confirm Logout
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                Are you sure you want to logout?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-full"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="px-5 py-2 text-sm bg-red-500 text-white hover:bg-red-600 rounded-full"
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
};

export default ClientHeader;
