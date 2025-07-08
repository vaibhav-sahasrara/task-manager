// import { FiArrowRightCircle } from "react-icons/fi";

// export default function RecentActivity({ recentActivities }) {
//   return (
//     <div className="bg-white p-6 rounded-xl shadow">
//       <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
//         <FiArrowRightCircle /> Recent Activity
//       </h2>
//       <ul className="space-y-3 text-sm text-gray-700">
//         {recentActivities.length === 0 ? (
//           <li className="text-gray-400">No recent tasks</li>
//         ) : (
//           recentActivities.map((task) => (
//             <li key={task._id} className="flex items-center gap-2">
//               <span className="text-blue-500">🆕</span>
//               Task <strong>{task.name}</strong> was added / updated
//             </li>
//           ))
//         )}
//       </ul>
//     </div>
//   );
// }


import { FiArrowRightCircle } from "react-icons/fi";

export default function RecentActivity({ recentActivities }) {
  return (
    <div className="bg-white dark:bg-[#1e293b] p-6 rounded-xl shadow transition-colors duration-300">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
        <FiArrowRightCircle className="text-indigo-500" />
        Recent Activity
      </h2>
      <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-200">
        {recentActivities.length === 0 ? (
          <li className="text-gray-400 dark:text-gray-500">No recent tasks</li>
        ) : (
          recentActivities.map((task) => (
            <li key={task._id} className="flex items-center gap-2">
              <span className="text-blue-500 dark:text-blue-400">🆕</span>
              Task <strong className="font-medium">{task.name}</strong> was added / updated
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
