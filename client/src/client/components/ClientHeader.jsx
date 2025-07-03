// import { useNavigate } from 'react-router-dom';

// export default function ClientHeader() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     localStorage.removeItem('role');
//     navigate('/');
//   };

//   const user = JSON.parse(localStorage.getItem('user'));

//   return (
//     <header className="flex justify-between items-center p-2 md:p-3 bg-white border-b shadow-sm">
//       <h1 className="text-lg md:text-xl font-semibold text-gray-800">Client Dashboard</h1>
//       <div className="flex items-center gap-3 text-sm text-gray-600">
//         <span>
//           Welcome, <span className="font-medium">{user?.name || 'User'}</span>
//         </span>
//         <button
//           onClick={handleLogout}
//           className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-xs md:text-sm"
//         >
//           Logout
//         </button>
//       </div>
//     </header>
//   );
// }
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLogOut, FiChevronDown } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function ClientHeader() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem('user')) || {};
  const role = localStorage.getItem('role') || 'Client';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <>
      <header className="flex justify-between items-center px-4 h-16 bg-white border-b border-gray-200 shadow-sm">
        <h1 className="text-lg font-bold text-indigo-700">Client Dashboard</h1>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 px-3 py-1.5 bg-indigo-100 hover:bg-indigo-200 rounded-full text-sm transition"
          >
            <div className="w-7 h-7 flex items-center justify-center rounded-full bg-indigo-600 text-white font-semibold text-xs uppercase">
              {user.name?.[0] || 'C'}
            </div>
            <span className="text-indigo-800 font-medium">{user.name || 'Client'}</span>
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
                className="absolute right-0 mt-1 w-44 bg-white border border-gray-200 rounded-xl shadow-md z-50"
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
              className="bg-white rounded-xl shadow-xl w-[90%] max-w-sm p-5 text-center"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Confirm Logout</h2>
              <p className="text-sm text-gray-600 mb-4">Are you sure you want to logout?</p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-full"
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
