


// import { FiTrendingUp, FiFolder } from "react-icons/fi";
// import { motion } from "framer-motion";

// export default function ProjectProgress({ stats }) {
//   if (!stats || !stats.projectProgress?.length) {
//     return (
//       <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl text-center border border-dashed border-gray-300">
//         <h2 className="text-lg font-semibold text-gray-700 flex items-center justify-center gap-2">
//           <FiTrendingUp className="text-indigo-500 animate-pulse" />
//           Project Progress
//         </h2>
//         <p className="text-sm text-gray-500 mt-2">No projects available yet.</p>
//       </div>
//     );
//   }

//   const getProgressColor = (value) => {
//     if (value >= 75) return "bg-green-500";
//     if (value >= 40) return "bg-yellow-500";
//     return "bg-red-500";
//   };

//   return (
//     <div className="bg-white/80 backdrop-blur-md border border-gray-200 p-6 rounded-2xl ">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
//         <FiTrendingUp className="text-indigo-600" />
//         Project Progress
//       </h2>

//       <div className="space-y-5">
//         {stats.projectProgress.map((proj, idx) => (
//           <motion.div
//             key={idx}
//             initial={{ opacity: 0, y: 15 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: idx * 0.05 }}
//             className="bg-white p-4 rounded-xl border border-gray-100 shadow hover:shadow-md transition-shadow duration-200"
//           >
//             <div className="flex items-center justify-between mb-2">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-indigo-100 text-indigo-600 rounded-full">
//                   <FiFolder />
//                 </div>
//                 <div>
//                   <h3 className="text-sm font-semibold text-gray-800">{proj.name}</h3>
//                   <p className="text-xs text-gray-500">
//                     {proj.completed} of {proj.total} tasks
//                   </p>
//                 </div>
//               </div>
//               <span
//                 className={`text-xs font-bold ${
//                   proj.progress >= 75
//                     ? "text-green-600"
//                     : proj.progress >= 40
//                     ? "text-yellow-600"
//                     : "text-red-600"
//                 }`}
//               >
//                 {proj.progress}%
//               </span>
//             </div>

//             {/* Progress bar with animation */}
//             <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
//               <motion.div
//                 initial={{ width: 0 }}
//                 animate={{ width: `${proj.progress}%` }}
//                 transition={{ duration: 0.7 }}
//                 className={`h-full ${getProgressColor(proj.progress)} rounded-full`}
//               />
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }



import { FiTrendingUp, FiFolder } from "react-icons/fi";
import { motion } from "framer-motion";

export default function ProjectProgress({ stats }) {
  if (!stats || !stats.projectProgress?.length) {
    return (
      <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-xl text-center border border-dashed border-gray-300 dark:border-gray-600">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-100 flex items-center justify-center gap-2">
          <FiTrendingUp className="text-indigo-500 animate-pulse" />
          Project Progress
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          No projects available yet.
        </p>
      </div>
    );
  }

  const getProgressColor = (value) => {
    if (value >= 75) return "bg-green-500";
    if (value >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="bg-white dark:bg-[#0f172a]/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 p-6 rounded-2xl transition-colors duration-300">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-3">
        <FiTrendingUp className="text-indigo-400" />
        Project Progress
      </h2>

      <div className="space-y-5">
        {stats.projectProgress.map((proj, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white dark:bg-[#1e293b] p-4 rounded-xl border border-gray-100 dark:border-gray-600 shadow hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-full">
                  <FiFolder />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                    {proj.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {proj.completed} of {proj.total} tasks
                  </p>
                </div>
              </div>
              <span
                className={`text-xs font-bold ${
                  proj.progress >= 75
                    ? "text-green-600"
                    : proj.progress >= 40
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {proj.progress}%
              </span>
            </div>

            {/* Progress bar with animation */}
            <div className="relative w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${proj.progress}%` }}
                transition={{ duration: 0.7 }}
                className={`h-full ${getProgressColor(proj.progress)} rounded-full`}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
