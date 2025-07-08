

// import { FiTrendingUp } from "react-icons/fi";

// export default function ProjectProgress({ stats }) {
//   if (!stats || !stats.projectProgress?.length) {
//     return (
//       <div className="bg-white p-6 rounded-2xl shadow text-center border border-dashed border-gray-200">
//         <h2 className="text-lg font-semibold text-gray-700 flex items-center justify-center gap-2">
//           <FiTrendingUp /> Project Progress
//         </h2>
//         <p className="text-sm text-gray-500 mt-2">No projects available yet.</p>
//       </div>
//     );
//   }
//   // console.log(stats.projectProgress);

//   const getProgressColor = (value) => {
//     if (value >= 75) return "from-green-400 to-green-600";
//     if (value >= 40) return "from-yellow-300 to-yellow-500";
//     return "from-red-400 to-red-600";
//   };

//   return (
//     <div className="bg-white p-6 rounded-2xl shadow border border-gray-100">
//       <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
//         <FiTrendingUp className="text-indigo-500" /> Project Progress
//       </h2>

//       <div className="space-y-6">
//         {stats.projectProgress.map((proj, idx) => (
//           <div key={idx} className="space-y-2">
//             {/* 🔹 Project Name */}
//             <div className="flex items-center justify-between">
//               <h3 className="text-base font-semibold text-indigo-700 truncate">
//                 {proj.name}
//               </h3>

//               <span
//                 className={`text-xs font-semibold ${
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

//             {/* Progress Bar */}
//             <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
//               <div
//                 className={`h-full bg-gradient-to-r ${getProgressColor(
//                   proj.progress
//                 )} transition-all duration-500`}
//                 style={{ width: `${proj.progress}%` }}
//               ></div>
//             </div>

//             <p className="text-xs text-gray-500">
//               {proj.completed} of {proj.total} tasks completed
//             </p>
//           </div>
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
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl text-center border border-dashed border-gray-300">
        <h2 className="text-lg font-semibold text-gray-700 flex items-center justify-center gap-2">
          <FiTrendingUp className="text-indigo-500 animate-pulse" />
          Project Progress
        </h2>
        <p className="text-sm text-gray-500 mt-2">No projects available yet.</p>
      </div>
    );
  }

  const getProgressColor = (value) => {
    if (value >= 75) return "bg-green-500";
    if (value >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="bg-white/80 backdrop-blur-md border border-gray-200 p-6 rounded-2xl ">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
        <FiTrendingUp className="text-indigo-600" />
        Project Progress
      </h2>

      <div className="space-y-5">
        {stats.projectProgress.map((proj, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white p-4 rounded-xl border border-gray-100 shadow hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 text-indigo-600 rounded-full">
                  <FiFolder />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-800">{proj.name}</h3>
                  <p className="text-xs text-gray-500">
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
            <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
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
