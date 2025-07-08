// import React from "react";
// import { FiCalendar } from "react-icons/fi";

// const TableView = ({ tasks }) => {
//   const grouped = tasks.reduce((acc, t) => {
//     const key = new Date(t.deadline).toLocaleString("default", {
//       month: "long",
//       year: "numeric",
//     });
//     acc[key] = acc[key] || [];
//     acc[key].push(t);
//     return acc;
//   }, {});

//   const getPriorityColor = (priority) => {
//     switch (priority) {
//       case "High":
//         return "bg-red-100 text-red-600";
//       case "Medium":
//         return "bg-yellow-100 text-yellow-600";
//       case "Low":
//         return "bg-green-100 text-green-600";
//       default:
//         return "bg-gray-100 text-gray-600";
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "To Do":
//         return "bg-gray-100 text-gray-700";
//       case "In Progress":
//         return "bg-blue-100 text-blue-600";
//       case "Done":
//         return "bg-emerald-100 text-emerald-600";
//       default:
//         return "bg-gray-100 text-gray-600";
//     }
//   };

//   return (
//     <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
//       <h2 className="text-xl font-bold text-indigo-700 mb-6 flex items-center gap-2">
//         <FiCalendar /> Tasks by Deadline
//       </h2>

//       {Object.entries(grouped).map(([month, tasks]) => (
//         <div key={month} className="mb-10">
//           <h3 className="text-lg font-semibold text-indigo-600 mb-3 border-b pb-1">
//             {month}
//           </h3>

//           <table className="w-full text-sm border-collapse">
//             <thead className="bg-indigo-50 text-indigo-700 sticky top-0 z-10">
//               <tr>
//                 <th className="text-left px-3 py-2">#</th>
//                 <th className="text-left px-3 py-2">Task</th>
//                 <th className="text-left px-3 py-2">Project</th>
//                 <th className="text-left px-3 py-2">Description</th>
//                 <th className="text-left px-3 py-2">Priority</th>
//                 <th className="text-left px-3 py-2">Status</th>
//                 <th className="text-left px-3 py-2">Assignees</th>
//                 <th className="text-left px-3 py-2">Deadline</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y text-gray-700">
//               {tasks.map((t, idx) => (
//                 <tr
//                   key={t._id}
//                   className="hover:bg-gray-50 transition duration-200"
//                 >
//                   <td className="px-3 py-2">{idx + 1}</td>
//                   <td className="px-3 py-2 font-medium text-indigo-700">
//                     {t.name}
//                   </td>
//                   <td className="px-3 py-2 font-medium text-indigo-700">
//                     {t.name}
//                   </td>

//                   <td className="px-3 py-2 text-gray-600">{t.description}</td>
//                   <td className="px-3 py-2">
//                     <span
//                       className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
//                         t.priority
//                       )}`}
//                     >
//                       {t.priority}
//                     </span>
//                   </td>
//                   <td className="px-3 py-2">
//                     <span
//                       className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
//                         t.status
//                       )}`}
//                     >
//                       {t.status}
//                     </span>
//                   </td>
//                   <td className="px-3 py-2">
//                     {t.assignees?.map((a) => a.label).join(", ") || "-"}
//                   </td>
//                   <td className="px-3 py-2">
//                     {new Date(t.deadline).toLocaleDateString("en-GB")}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TableView;



import React from "react";
import { FiCalendar } from "react-icons/fi";

const TableView = ({ tasks }) => {
  const grouped = tasks.reduce((acc, t) => {
    const key = new Date(t.deadline).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    acc[key] = acc[key] || [];
    acc[key].push(t);
    return acc;
  }, {});

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-600 dark:bg-red-200 dark:text-red-900";
      case "Medium":
        return "bg-yellow-100 text-yellow-600 dark:bg-yellow-200 dark:text-yellow-900";
      case "Low":
        return "bg-green-100 text-green-600 dark:bg-green-200 dark:text-green-900";
      default:
        return "bg-gray-100 text-gray-600 dark:bg-gray-300 dark:text-gray-900";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "To Do":
        return "bg-gray-100 text-gray-700 dark:bg-gray-300 dark:text-gray-900";
      case "In Progress":
        return "bg-blue-100 text-blue-600 dark:bg-blue-200 dark:text-blue-900";
      case "Done":
        return "bg-emerald-100 text-emerald-600 dark:bg-emerald-200 dark:text-emerald-900";
      default:
        return "bg-gray-100 text-gray-600 dark:bg-gray-300 dark:text-gray-900";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 overflow-x-auto transition-colors duration-300">
      <h2 className="text-xl font-bold text-indigo-700 dark:text-indigo-300 mb-6 flex items-center gap-2">
        <FiCalendar /> Tasks by Deadline
      </h2>

      {Object.entries(grouped).map(([month, tasks]) => (
        <div key={month} className="mb-10">
          <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-300 mb-3 border-b border-gray-200 dark:border-gray-700 pb-1">
            {month}
          </h3>

          <table className="w-full text-sm border-collapse">
            <thead className="bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 sticky top-0 z-10">
              <tr>
                <th className="text-left px-3 py-2">#</th>
                <th className="text-left px-3 py-2">Task</th>
                <th className="text-left px-3 py-2">Project</th>
                <th className="text-left px-3 py-2">Description</th>
                <th className="text-left px-3 py-2">Priority</th>
                <th className="text-left px-3 py-2">Status</th>
                <th className="text-left px-3 py-2">Assignees</th>
                <th className="text-left px-3 py-2">Deadline</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-gray-700 dark:text-gray-300">
              {tasks.map((t, idx) => (
                <tr
                  key={t._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-200"
                >
                  <td className="px-3 py-2">{idx + 1}</td>
                  <td className="px-3 py-2 font-medium text-indigo-700 dark:text-indigo-300">
                    {t.name}
                  </td>
                  <td className="px-3 py-2 font-medium text-indigo-700 dark:text-indigo-300">
                    {t.project?.name || "-"}
                  </td>
                  <td className="px-3 py-2 text-gray-600 dark:text-gray-400">
                    {t.description}
                  </td>
                  <td className="px-3 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                        t.priority
                      )}`}
                    >
                      {t.priority}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        t.status
                      )}`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    {t.assignees?.map((a) => a.label).join(", ") || "-"}
                  </td>
                  <td className="px-3 py-2">
                    {new Date(t.deadline).toLocaleDateString("en-GB")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default TableView;
