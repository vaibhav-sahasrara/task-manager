// import React, { useEffect, useState } from "react";
// import axios from "../../utils/axiosInstance";

// const EmployeeHome = () => {
//   const [projects, setProjects] = useState([]);
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const user = JSON.parse(localStorage.getItem("user"));
//   const userId = user?.id;
//   const memberId = user?.linkedMember?._id;

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!userId || !memberId) return;

//       try {
//         const taskRes = await axios.get(
//           `/api/tasks/client-tasks/${userId}`
//         );
//         setTasks(taskRes.data.tasks || []);

//         const projectRes = await axios.get(
//           `/api/projects/user/${memberId}`
//         );
//         setProjects(projectRes.data || []);
//       } catch (err) {
//         console.error("Error loading client dashboard:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [userId, memberId]);

//   const completedCount = tasks.filter(
//     (task) => task.status.toLowerCase() === "done"
//   ).length;
//   const pendingCount = tasks.filter(
//     (task) => task.status.toLowerCase() !== "done"
//   ).length;

//   if (loading) {
//     return (
//       <div className="p-6 text-center text-gray-500 animate-pulse">
//         Loading dashboard...
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="bg-white p-6 rounded-xl shadow">
//         <h1 className="text-xl font-semibold text-gray-800">
//           Welcome, {user?.name || "Client"} 👋
//         </h1>
//         <p className="text-sm text-gray-600 mt-1">
//           Here’s your current work overview.
//         </p>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid gap-6 md:grid-cols-3">
//         <SummaryCard
//           icon="📁"
//           label="Active Projects"
//           value={projects.length}
//           color="blue"
//         />
//         <SummaryCard
//           icon="✅"
//           label="Tasks Completed"
//           value={completedCount}
//           color="green"
//         />
//         <SummaryCard
//           icon="⏳"
//           label="Pending Tasks"
//           value={pendingCount}
//           color="yellow"
//         />
//       </div>

//       {/* Recent Updates */}
//       <div className="bg-white p-6 rounded-xl shadow">
//         <h2 className="text-lg font-semibold text-gray-800 mb-4">
//           Your Recent Updates
//         </h2>
//         <ul className="space-y-3 text-sm text-gray-700">
//           {tasks.slice(0, 3).map((task) => (
//             <li key={task._id} className="flex items-center gap-2">
//               <span className="text-indigo-500">📝</span>
//               <span>
//                 Task <strong>{task.name}</strong> on project{" "}
//                 <strong>{task.project?.name}</strong> is currently{" "}
//                 <span className="capitalize">{task.status}</span>
//               </span>
//             </li>
//           ))}
//           {tasks.length === 0 && (
//             <li className="text-gray-400">No recent task activity found.</li>
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// };

// const SummaryCard = ({ icon, label, value, color }) => {
//   const colorMap = {
//     blue: "bg-blue-100 text-blue-600",
//     green: "bg-green-100 text-green-600",
//     yellow: "bg-yellow-100 text-yellow-600",
//   };

//   return (
//     <div
//       className={`flex items-center gap-4 p-4 bg-white rounded-xl shadow hover:shadow-md transition`}
//     >
//       <div className={`${colorMap[color]} p-3 rounded-full text-lg`}>
//         {icon}
//       </div>
//       <div>
//         <div className="text-sm text-gray-500">{label}</div>
//         <div className="text-xl font-semibold text-gray-800">{value}</div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeHome;



import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";

export default function EmployeeHome() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;
  const memberId = user?.linkedMember?._id;

  useEffect(() => {
    const fetchData = async () => {
      if (!userId || !memberId) return;

      try {
        const { data: taskData } = await axios.get(
          `/api/tasks/client-tasks/${userId}`
        );
        setTasks(taskData.tasks || []);

        const { data: projectData } = await axios.get(
          `/api/projects/user/${memberId}`
        );
        setProjects(projectData || []);
      } catch (err) {
        console.error("Error loading employee dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, memberId]);

  const completedCount = tasks.filter(
    (t) => t.status.toLowerCase() === "done"
  ).length;
  const pendingCount = tasks.length - completedCount;

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500 dark:text-gray-400 animate-pulse">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome box */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow dark:shadow-lg">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-yellow-300">
          Welcome, {user?.name || "Employee"} 👋
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Here’s your current work overview.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <SummaryCard
          icon="📁"
          label="Active Projects"
          value={projects.length}
          color="blue"
        />
        <SummaryCard
          icon="✅"
          label="Tasks Completed"
          value={completedCount}
          color="green"
        />
        <SummaryCard
          icon="⏳"
          label="Pending Tasks"
          value={pendingCount}
          color="yellow"
        />
      </div>

      {/* Recent updates */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow dark:shadow-lg">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-yellow-300 mb-4">
          Your Recent Updates
        </h2>
        <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
          {tasks.slice(0, 3).map((task) => (
            <li key={task._id} className="flex items-center gap-2">
              <span className="text-indigo-500 dark:text-yellow-400">📝</span>
              <span>
                Task <strong>{task.name}</strong> in{" "}
                <strong>{task.project?.name}</strong> is{" "}
                <span className="capitalize">{task.status}</span>
              </span>
            </li>
          ))}
          {tasks.length === 0 && (
            <li className="text-gray-400 dark:text-gray-500">
              No recent task activity found.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

const SummaryCard = ({ icon, label, value, color }) => {
  const shades = {
    blue: {
      light: "bg-blue-100 text-blue-600",
      dark: "dark:bg-blue-950/40 dark:text-blue-300",
    },
    green: {
      light: "bg-green-100 text-green-600",
      dark: "dark:bg-green-950/40 dark:text-green-300",
    },
    yellow: {
      light: "bg-yellow-100 text-yellow-600",
      dark: "dark:bg-yellow-900/40 dark:text-yellow-300",
    },
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl shadow hover:shadow-md dark:hover:shadow-lg transition">
      <div className={`${shades[color].light} ${shades[color].dark} p-3 rounded-full text-lg`}>
        {icon}
      </div>
      <div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {label}
        </div>
        <div className="text-xl font-semibold text-gray-800 dark:text-yellow-300">
          {value}
        </div>
      </div>
    </div>
  );
};
