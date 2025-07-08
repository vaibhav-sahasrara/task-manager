// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "../../../utils/axiosInstance";
// import {
//   FaArrowLeft,
//   FaUserFriends,
//   FaTags,
//   FaCalendarAlt,
//   FaHourglassEnd,
//   FaTasks,
// } from "react-icons/fa";

// const TaskDetailPage = () => {
//   const { id } = useParams();
//   const [task, setTask] = useState(null);

//   useEffect(() => {
//     const fetchTask = async () => {
//       try {
//         const res = await axios.get(`/api/tasks/${id}`);
//         setTask(res.data);
//       } catch (err) {
//         console.error("Failed to fetch task:", err);
//       }
//     };
//     fetchTask();
//   }, [id]);

//   if (!task) return <div className="p-10 text-center">Loading task...</div>;

//   const formatDate = (d) => new Date(d).toLocaleDateString("en-GB");

//   const getPriorityBadge = (priority) => {
//     switch (priority) {
//       case "High":
//         return "bg-red-500 text-white";
//       case "Medium":
//         return "bg-yellow-400 text-black";
//       case "Low":
//         return "bg-green-500 text-white";
//       default:
//         return "bg-gray-400 text-white";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 px-2">
//       <div className="max-w-6xl mx-auto space-y-6">
//         {/* Back Link */}
//         <Link
//           to="/admin/tasks"
//           className="inline-flex items-center gap-2 text-indigo-600 hover:underline"
//         >
//           <FaArrowLeft /> <span>Back to Tasks</span>
//         </Link>

//         {/* Card Container */}
//         <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
//           {/* Header */}
//           <div className="flex justify-between items-start flex-wrap gap-4">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-800">{task.name}</h1>
//               <p className="text-sm text-gray-500 mt-1">
//                 Created: {formatDate(task.createdAt)}
//               </p>
//             </div>

//             <span
//               className={`text-xs font-semibold px-4 py-1 rounded-full shadow ${getPriorityBadge(
//                 task.priority
//               )}`}
//             >
//               Priority: {task.priority}
//             </span>
//           </div>

//           {/* Description */}
//           <p className="text-gray-600 leading-relaxed text-base">
//             {task.description || "No description available."}
//           </p>

//           {/* Grid Info */}
//           <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
//             <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg border">
//               <FaCalendarAlt className="text-indigo-500 mt-1" />
//               <div>
//                 <p className="font-semibold">Start Date</p>
//                 <p>{formatDate(task.startDate)}</p>
//               </div>
//             </div>

//             <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg border">
//               <FaHourglassEnd className="text-red-500 mt-1" />
//               <div>
//                 <p className="font-semibold">Deadline</p>
//                 <p>{formatDate(task.deadline)}</p>
//               </div>
//             </div>

//             <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg border">
//               <FaUserFriends className="text-green-600 mt-1" />
//               <div>
//                 <p className="font-semibold">Assignees</p>
//                 <p>
//                   {(task.assignees || [])
//                     .map((a) => a.name || a.label)
//                     .join(", ") || "None"}
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg border">
//               <FaTags className="text-pink-500 mt-1" />
//               <div>
//                 <p className="font-semibold">Tags</p>
//                 <p>{(task.tags || []).join(", ") || "No tags"}</p>
//               </div>
//             </div>
//           </div>

//           {/* Progress */}
//           <div className="mt-6">
//             <p className="text-sm font-semibold text-gray-700 mb-2">Progress</p>
//             <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
//               <div
//                 className="h-full bg-gradient-to-r from-indigo-400 to-indigo-600 transition-all duration-500"
//                 style={{ width: `${task.progress || 0}%` }}
//               />
//             </div>
//             <p className="text-sm text-right text-gray-500 mt-1">
//               {task.progress || 0}% complete
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TaskDetailPage;



import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../../../utils/axiosInstance";
import {
  FaArrowLeft,
  FaUserFriends,
  FaTags,
  FaCalendarAlt,
  FaHourglassEnd,
} from "react-icons/fa";

const TaskDetailPage = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(`/api/tasks/${id}`);
        setTask(res.data);
      } catch (err) {
        console.error("Failed to fetch task:", err);
      }
    };
    fetchTask();
  }, [id]);

  if (!task)
    return <div className="p-10 text-center dark:text-gray-300">Loading task...</div>;

  const formatDate = (d) => new Date(d).toLocaleDateString("en-GB");

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-500 text-white";
      case "Medium":
        return "bg-yellow-400 text-black";
      case "Low":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 px-2 py-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Back Link */}
        <Link
          to="/admin/tasks"
          className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          <FaArrowLeft /> <span>Back to Tasks</span>
        </Link>

        {/* Card Container */}
        <div className="bg-white dark:bg-gray-900 dark:border dark:border-gray-700 rounded-2xl shadow-xl p-8 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                {task.name}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Created: {formatDate(task.createdAt)}
              </p>
            </div>
            <span
              className={`text-xs font-semibold px-4 py-1 rounded-full shadow ${getPriorityBadge(
                task.priority
              )}`}
            >
              Priority: {task.priority}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
            {task.description || "No description available."}
          </p>

          {/* Grid Info */}
          <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex items-start gap-3 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700">
              <FaCalendarAlt className="text-indigo-500 mt-1" />
              <div>
                <p className="font-semibold">Start Date</p>
                <p>{formatDate(task.startDate)}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700">
              <FaHourglassEnd className="text-red-500 mt-1" />
              <div>
                <p className="font-semibold">Deadline</p>
                <p>{formatDate(task.deadline)}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700">
              <FaUserFriends className="text-green-600 mt-1" />
              <div>
                <p className="font-semibold">Assignees</p>
                <p>
                  {(task.assignees || [])
                    .map((a) => a.name || a.label)
                    .join(", ") || "None"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700">
              <FaTags className="text-pink-500 mt-1" />
              <div>
                <p className="font-semibold">Tags</p>
                <p>{(task.tags || []).join(", ") || "No tags"}</p>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-6">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Progress
            </p>
            <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-400 to-indigo-600 transition-all duration-500"
                style={{ width: `${task.progress || 0}%` }}
              />
            </div>
            <p className="text-sm text-right text-gray-500 dark:text-gray-400 mt-1">
              {task.progress || 0}% complete
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailPage;
