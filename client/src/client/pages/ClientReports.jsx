import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FiFileText,
  FiBarChart2,
  FiClock,
  FiTrendingUp,
  FiCheckCircle,
  FiFolder,
} from "react-icons/fi";

const ClientReports = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const memberId = user?.linkedMember?._id;
  const userId = user?.id;

  useEffect(() => {
    if (!userId || !memberId) return;

    const fetchReports = async () => {
      try {
        const [tasksRes, projectsRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/tasks/client-tasks/${userId}`),
          axios.get(`http://localhost:5000/api/projects/user/${memberId}`),
        ]);

        setTasks(tasksRes.data.tasks || []);
        setProjects(projectsRes.data || []);
      } catch (err) {
        console.error("Failed to fetch client reports", err);
      }
    };

    fetchReports();
  }, [userId, memberId]);

  const getPriorityBadge = (priority) => {
    const colorMap = {
      High: "bg-red-100 text-red-600",
      Medium: "bg-yellow-100 text-yellow-600",
      Low: "bg-green-100 text-green-600",
    };
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          colorMap[priority] || "bg-gray-200 text-gray-700"
        }`}
      >
        {priority}
      </span>
    );
  };

  return (
    <div className="space-y-8 ">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-indigo-700 flex items-center gap-2">
          Client Reports
        </h1>
        <span className="text-sm text-gray-500">
          Generated for {user?.name}
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          icon={<FiCheckCircle />}
          label="Completed Tasks"
          value={tasks.filter((t) => t.status === "Done").length}
          color="green"
        />
        <StatCard
          icon={<FiClock />}
          label="Pending Tasks"
          value={tasks.filter((t) => t.status !== "Done").length}
          color="yellow"
        />
        <StatCard
          icon={<FiFolder />}
          label="Active Projects"
          value={projects.length}
          color="blue"
        />
      </div>

      {/* Task Report */}
      <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FiBarChart2 className="text-indigo-500" /> Task Breakdown
        </h2>
        <table className="min-w-full text-sm text-left border-t">
          <thead>
            <tr className="text-gray-600 bg-gray-50">
              <th className="py-2 px-3">Task</th>
              <th className="py-2 px-3">Project</th>
              <th className="py-2 px-3">Status</th>
              <th className="py-2 px-3">Progress</th>
              <th className="py-2 px-3">Priority</th>
              <th className="py-2 px-3">Deadline</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="py-2 px-3 font-medium">{task.name}</td>
                <td className="py-2 px-3">{task.project?.name || "-"}</td>
                <td className="py-2 px-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      task.status === "Done"
                        ? "bg-green-100 text-green-600"
                        : task.status === "In Progress"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {task.status}
                  </span>
                </td>
                <td className="py-2 px-3 w-48">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${
                        task.progress >= 100
                          ? "bg-green-500"
                          : task.progress > 0
                          ? "bg-blue-500"
                          : "bg-gray-400"
                      }`}
                      style={{ width: `${task.progress}%` }}
                    ></div>
                  </div>
                </td>
                <td className="py-2 px-3">{getPriorityBadge(task.priority)}</td>
                <td className="py-2 px-3 text-gray-500">
                  {new Date(task.deadline).toLocaleDateString("en-GB")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, color }) => {
  const colorMap = {
    green: "bg-green-100 text-green-600",
    yellow: "bg-yellow-100 text-yellow-600",
    blue: "bg-blue-100 text-blue-600",
  };
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow hover:shadow-md transition">
      <div className={`${colorMap[color]} p-3 rounded-full text-xl`}>
        {icon}
      </div>
      <div>
        <div className="text-sm text-gray-500">{label}</div>
        <div className="text-xl font-bold text-gray-800">{value}</div>
      </div>
    </div>
  );
};

export default ClientReports;
