// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import StatsCards from "./StatsCards";
// import ProjectProgress from "./ProjectProgress";
// import OverdueTasks from "./OverdueTasks";
// import UpcomingDeadlines from "./UpcomingDeadlines";
// import RecentActivity from "./RecentActivity";

// export default function Dashboard() {
//   const [projects, setProjects] = useState([]);
//   const [tasks, setTasks] = useState([]);
//   const [team, setTeam] = useState([]);
//   const [stats, setStats] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         const authHeader = {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         };

//         const [projectRes, taskRes, teamRes, statsRes] = await Promise.all([
//           axios.get("http://localhost:5000/api/projects", authHeader),
//           axios.get("http://localhost:5000/api/tasks", authHeader),
//           axios.get("http://localhost:5000/api/team", authHeader),
//           axios.get("http://localhost:5000/api/tasks/stats", authHeader),
//         ]);
//         console.log("Stats data:", statsRes.data);

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
//       <StatsCards projects={projects} tasks={tasks} team={team} stats={stats} />
//       <ProjectProgress stats={stats} />
//       <OverdueTasks stats={stats} />
//       <UpcomingDeadlines stats={stats} getPriorityBadge={getPriorityBadge} />
//       <RecentActivity recentActivities={tasks.slice(0, 5)} />
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import StatsCards from "./StatsCards";
import ProjectProgress from "./ProjectProgress";
import OverdueTasks from "./OverdueTasks";
import UpcomingDeadlines from "./UpcomingDeadlines";
import RecentActivity from "./RecentActivity";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [team, setTeam] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const authHeader = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const [projectRes, taskRes, teamRes, statsRes] = await Promise.all([
          axios.get("http://localhost:5000/api/projects", authHeader),
          axios.get("http://localhost:5000/api/tasks", authHeader),
          axios.get("http://localhost:5000/api/team", authHeader),
          axios.get("http://localhost:5000/api/tasks/stats", authHeader),
        ]);
        console.log("Stats data:", statsRes.data);

        setProjects(projectRes.data);
        setTasks(taskRes.data);
        setTeam(teamRes.data);
        setStats(statsRes.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  const getPriorityBadge = (priority) => {
    const baseClass =
      "text-xs font-semibold px-2 py-1 rounded-full shadow-sm tracking-wide";
    switch (priority) {
      case "High":
        return (
          <span className={`${baseClass} bg-red-100 text-red-700`}>High</span>
        );
      case "Medium":
        return (
          <span className={`${baseClass} bg-yellow-100 text-yellow-700`}>
            Medium
          </span>
        );
      case "Low":
        return (
          <span className={`${baseClass} bg-green-100 text-green-700`}>
            Low
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <StatsCards projects={projects} tasks={tasks} team={team} stats={stats} />
      <ProjectProgress stats={stats} />
      <OverdueTasks stats={stats} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UpcomingDeadlines stats={stats} getPriorityBadge={getPriorityBadge} />
        <RecentActivity recentActivities={tasks.slice(0, 5)} />
      </div>
    </div>
  );
}
