// import React from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const ProfileModal = ({ selectedMember, setSelectedMember, onEdit, onDelete }) => {
//   if (!selectedMember) return null;

//   return (
//     <AnimatePresence>
//       {selectedMember && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black bg-opacity-30"
//         >
//           <motion.div
//             initial={{ y: 40, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             exit={{ y: 40, opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
//           >
//             {/* Header with Avatar */}
//             <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 h-32 relative">
//               <button
//                 onClick={() => setSelectedMember(null)}
//                 className="absolute top-3 right-4 text-white text-2xl hover:text-red-300"
//               >
//                 &times;
//               </button>
//               <div className="absolute left-1/2 -bottom-12 transform -translate-x-1/2">
//                 <img
//                   src={selectedMember.avatar}
//                   alt={selectedMember.name}
//                   className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
//                 />
//               </div>
//             </div>

//             {/* Content */}
//             <div className="pt-16 px-6 pb-6 text-center">
//               <h3 className="text-xl font-semibold text-gray-800">
//                 {selectedMember.name}
//               </h3>
//               <p className="text-sm text-indigo-600">{selectedMember.role}</p>
//               <p className="text-xs text-gray-500">{selectedMember.email}</p>
//               <p className="text-xs text-gray-500 mb-4">
//                 {selectedMember.phone}
//               </p>

//               {/* Expertise */}
//               <div className="text-left mb-4">
//                 <p className="text-sm font-medium text-gray-600 mb-1">
//                   Expertise:
//                 </p>
//                 <div className="flex flex-wrap gap-2">
//                   {selectedMember.expertise.map((skill, i) => (
//                     <span
//                       key={i}
//                       className="bg-indigo-100 text-indigo-700 px-2 py-1 text-xs rounded-full"
//                     >
//                       {skill}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               {/* Past Projects */}
//               <div className="text-left mb-4">
//                 <p className="text-sm font-medium text-gray-600 mb-1">
//                   Past Projects:
//                 </p>
//                 <div className="flex flex-wrap gap-2">
//                   {selectedMember.pastProjects.map((proj, i) => (
//                     <span
//                       key={i}
//                       className="bg-pink-100 text-pink-700 px-2 py-1 text-xs rounded-full"
//                     >
//                       {proj}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               {/* Status */}
//               <div className="text-left">
//                 <p className="text-sm font-medium text-gray-600">Status:</p>
//                 <span
//                   className={`text-sm font-semibold ${
//                     selectedMember.isActive ? "text-green-600" : "text-red-500"
//                   }`}
//                 >
//                   {selectedMember.isActive ? "Working" : "Inactive"}
//                 </span>
//               </div>

//               {/* Actions */}
//               <div className="mt-4 flex justify-center gap-4">
//                 <button
//                   onClick={() => onEdit(selectedMember)}
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-full text-sm"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => onDelete(selectedMember._id)}
//                   className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-full text-sm"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default ProfileModal;



import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const ProfileModal = ({ selectedMember, setSelectedMember, onEdit, onDelete }) => {
  if (!selectedMember) return null;

  return (
    <AnimatePresence>
      {selectedMember && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black bg-opacity-30"
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden transition-colors"
          >
            {/* Header with Avatar */}
            <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 h-32 relative">
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-3 right-4 text-white text-2xl hover:text-red-300"
              >
                &times;
              </button>
              <div className="absolute left-1/2 -bottom-12 transform -translate-x-1/2">
                <img
                  src={selectedMember.avatar}
                  alt={selectedMember.name}
                  className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                />
              </div>
            </div>

            {/* Content */}
            <div className="pt-16 px-6 pb-6 text-center text-gray-800 dark:text-gray-100">
              <h3 className="text-xl font-semibold">{selectedMember.name}</h3>
              <p className="text-sm text-indigo-600 dark:text-indigo-400">
                {selectedMember.role}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {selectedMember.email}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                {selectedMember.phone}
              </p>

              {/* Expertise */}
              <div className="text-left mb-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  Expertise:
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedMember.expertise.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-200 px-2 py-1 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Past Projects */}
              <div className="text-left mb-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  Past Projects:
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedMember.pastProjects.map((proj, i) => (
                    <span
                      key={i}
                      className="bg-pink-100 dark:bg-pink-800 text-pink-700 dark:text-pink-200 px-2 py-1 text-xs rounded-full"
                    >
                      {proj}
                    </span>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div className="text-left">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Status:</p>
                <span
                  className={`text-sm font-semibold ${
                    selectedMember.isActive
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-500 dark:text-red-400"
                  }`}
                >
                  {selectedMember.isActive ? "Working" : "Inactive"}
                </span>
              </div>

              {/* Actions */}
              <div className="mt-4 flex justify-center gap-4">
                <button
                  onClick={() => onEdit(selectedMember)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-full text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(selectedMember._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-full text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProfileModal;
