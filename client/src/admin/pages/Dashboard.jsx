// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   FiUsers,
//   FiClipboard,
//   FiCheckCircle,
//   FiClock,
//   FiArrowRightCircle,
//   FiAlertTriangle,
// } from "react-icons/fi";

// export default function Dashboard() {
//   const [projects, setProjects] = useState([]);
//   const [tasks, setTasks] = useState([]);
//   const [team, setTeam] = useState([]);
//   const [stats, setStats] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem("token"); // 👈 Get your JWT token here

//         const authHeader = {
//           headers: {
//             Authorization: `Bearer ${token}`, // 👈 Pass token in Authorization header
//           },
//         };

//         const [projectRes, taskRes, teamRes, statsRes] = await Promise.all([
//           axios.get("http://localhost:5000/api/projects", authHeader),
//           axios.get("http://localhost:5000/api/tasks", authHeader),
//           axios.get("http://localhost:5000/api/team", authHeader), // 🔥 this one was failing
//           axios.get("http://localhost:5000/api/tasks/stats", authHeader),
//         ]);

//         setProjects(projectRes.data);
//         setTasks(taskRes.data);
//         setTeam(teamRes.data);
//         setStats(statsRes.data);
//       } catch (error) {
//         console.error("Error fetching dashboard data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const completedTasks = tasks.filter((t) =>
//     ["Done", "Completed"].includes(t.status)
//   );
//   const upcomingTasks = tasks
//     .filter((t) => new Date(t.deadline) > new Date())
//     .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
//     .slice(0, 5);
//   const recentActivities = tasks.slice(0, 5);

//   const getPriorityBadge = (priority) => {
//     const baseClass =
//       "text-xs font-semibold px-2 py-1 rounded-full shadow-sm tracking-wide";
//     switch (priority) {
//       case "High":
//         return (
//           <span className={`${baseClass} bg-red-100 text-red-700`}>High</span>
//         );
//       case "Medium":
//         return (
//           <span className={`${baseClass} bg-yellow-100 text-yellow-700`}>
//             Medium
//           </span>
//         );
//       case "Low":
//         return (
//           <span className={`${baseClass} bg-green-100 text-green-700`}>
//             Low
//           </span>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Top Stats */}
//       <div className="grid gap-6 md:grid-cols-4">
//         <div className="flex items-center gap-4 p-5 bg-white rounded-xl shadow hover:shadow-md transition">
//           <div className="bg-indigo-100 text-indigo-600 p-3 rounded-full text-xl">
//             <FiClipboard />
//           </div>
//           <div>
//             <div className="text-sm text-gray-500">Total Projects</div>
//             <div className="text-2xl font-bold text-gray-800">
//               {projects.length}
//             </div>
//           </div>
//         </div>

//         <div className="flex items-center gap-4 p-5 bg-white rounded-xl shadow hover:shadow-md transition">
//           <div className="bg-green-100 text-green-600 p-3 rounded-full text-xl">
//             <FiCheckCircle />
//           </div>
//           <div>
//             <div className="text-sm text-gray-500">Tasks Completed</div>
//             <div className="text-2xl font-bold text-gray-800">
//               {completedTasks.length}
//             </div>
//           </div>
//         </div>

//         <div className="flex items-center gap-4 p-5 bg-white rounded-xl shadow hover:shadow-md transition">
//           <div className="bg-yellow-100 text-yellow-600 p-3 rounded-full text-xl">
//             <FiUsers />
//           </div>
//           <div>
//             <div className="text-sm text-gray-500">Team Members</div>
//             <div className="text-2xl font-bold text-gray-800">
//               {team.length}
//             </div>
//           </div>
//         </div>

//         {stats && (
//           <div className="bg-indigo-100 p-5 rounded-xl shadow">
//             <div className="flex items-center gap-3 text-indigo-700 font-semibold mb-2">
//               <FiCheckCircle /> Completion Rate
//             </div>
//             <div className="w-full bg-white rounded-full h-4 overflow-hidden">
//               <div
//                 className="bg-indigo-500 h-full transition-all duration-500"
//                 style={{ width: `${stats.completionRate}%` }}
//               ></div>
//             </div>
//             <p className="text-sm text-gray-600 mt-2">
//               {stats.completionRate}% of tasks completed
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Project Progress */}
//       {stats?.projectProgress?.length > 0 && (
//         <div className="bg-white p-6 rounded-xl shadow space-y-4">
//           <h2 className="text-md font-semibold text-gray-700 mb-2">
//             📁 Project Progress
//           </h2>
//           {stats.projectProgress.map((proj) => (
//             <div key={proj.value}>
//               <div className="flex justify-between text-sm text-gray-600">
//                 <span>{proj.label}</span>
//                 <span>{proj.progress}%</span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
//                 <div
//                   className="bg-green-500 h-full transition-all duration-300"
//                   style={{ width: `${proj.progress}%` }}
//                 ></div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Overdue Tasks */}
//       {stats?.overdueTasks?.length > 0 && (
//         <div className="bg-red-50 p-6 rounded-xl shadow">
//           <h2 className="text-md font-semibold text-red-700 flex items-center gap-2 mb-2">
//             <FiAlertTriangle /> Overdue Tasks
//           </h2>
//           <ul className="text-sm text-red-800 space-y-2">
//             {stats.overdueTasks.map((task) => (
//               <li key={task._id} className="border-b pb-2">
//                 <p className="font-semibold">{task.name}</p>
//                 <p className="text-xs">
//                   Assigned to: {task.assignee?.label || "Unassigned"}
//                   <span className="ml-2 text-gray-500">
//                     (Due {new Date(task.deadline).toLocaleDateString("en-IN")})
//                   </span>
//                 </p>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Upcoming Deadlines */}
//       <div className="bg-white p-6 rounded-xl shadow">
//         <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
//           <FiClock /> Upcoming Deadlines
//         </h2>
//         <ul className="space-y-3 text-sm text-gray-700">
//           {stats?.upcomingDeadlines.length === 0 ? (
//             <li className="text-gray-400">No upcoming tasks</li>
//           ) : (
//             stats?.upcomingDeadlines.map((task) => (
//               <li
//                 key={task._id}
//                 className="flex justify-between items-center border-b pb-2"
//               >
//                 <div className="flex flex-col gap-1">
//                   <div className="font-semibold text-gray-800">{task.name}</div>
//                   <div className="text-xs text-gray-500">
//                     Assigned to: {task.assignee?.label || "Unassigned"}
//                   </div>
//                   {getPriorityBadge(task.priority)}
//                 </div>
//                 <div className="text-right text-sm text-gray-600">
//                   {new Date(task.deadline).toLocaleDateString("en-IN", {
//                     day: "2-digit",
//                     month: "2-digit",
//                     year: "numeric",
//                   })}
//                 </div>
//               </li>
//             ))
//           )}
//         </ul>
//       </div>

//       {/* Recent Activity */}
//       <div className="bg-white p-6 rounded-xl shadow">
//         <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
//           <FiArrowRightCircle /> Recent Activity
//         </h2>
//         <ul className="space-y-3 text-sm text-gray-700">
//           {recentActivities.length === 0 ? (
//             <li className="text-gray-400">No recent tasks</li>
//           ) : (
//             recentActivities.map((task) => (
//               <li key={task._id} className="flex items-center gap-2">
//                 <span className="text-blue-500">🆕</span>
//                 Task <strong>{task.name}</strong> was added / updated
//               </li>
//             ))
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// }
