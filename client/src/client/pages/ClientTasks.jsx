import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import { motion } from "framer-motion";
import {
  FiCheckCircle,
  FiCalendar,
  FiUser,
  FiLoader,
  FiActivity,
  FiFlag,
} from "react-icons/fi";

const ClientTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [assignedTo, setAssignedTo] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const memberId = user?.linkedMember?._id;

  useEffect(() => {
    const fetchTasks = async () => {
      if (!memberId) return;
      try {
        const res = await axios.get(
          `/api/tasks?assigneeId=${memberId}`
        );
        setTasks(res.data);
        setAssignedTo(user.name);
      } catch (err) {
        console.error("Failed to fetch tasks", err);
      }
    };
    fetchTasks();
  }, [memberId]);

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await axios.put(`/api/tasks/${taskId}`, {
        status: newStatus,
      });

      setTasks((prev) =>
        prev.map((t) => (t._id === taskId ? { ...t, status: newStatus } : t))
      );
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const getPriorityColor = (priority) => {
    return {
      High: "bg-red-500 text-white",
      Medium: "bg-yellow-300 text-gray-800",
      Low: "bg-green-400 text-white",
    }[priority] || "bg-gray-300";
  };

  return (
    <div className=" space-y-6">
      <h1 className="text-2xl font-bold text-indigo-700 mb-8 flex items-center gap-3">
       
        Tasks Assigned  
      </h1>

      {tasks.length === 0 ? (
        <div className="text-center text-gray-400 mt-20 text-lg animate-pulse flex flex-col items-center gap-2">
          <FiLoader className="text-3xl" />
          No tasks assigned yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tasks.map((task, index) => (
            <motion.div
              key={task._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="relative p-5 bg-white bg-opacity-80 backdrop-blur-md border border-white/20 shadow-2xl rounded-3xl overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
            >
              {/* Gradient top bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

              <div className="space-y-3">
                <h2 className="text-xl font-semibold text-indigo-800 flex items-center gap-2">
                  {task.name}
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-bold ${getPriorityColor(
                      task.priority
                    )}`}
                  >
                    {task.priority}
                  </span>
                </h2>

                <p className="text-gray-700 text-sm line-clamp-3">
                  {task.description || "No description provided."}
                </p>

                <div className="space-y-2 text-sm pt-2 text-gray-700">
                  <div className="flex items-center gap-2">
                    <FiCalendar className="text-indigo-400" />
                    Deadline:{" "}
                    <span className="font-medium">
                      {new Date(task.deadline).toLocaleDateString("en-GB")}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <FiUser className="text-indigo-400" />
                    Assignees:{" "}
                    {task.assignees?.map((a) => a.name).join(", ") ||
                      "Unassigned"}
                  </div>

                  <div className="flex items-center gap-2">
                    <FiActivity className="text-indigo-400" />
                    Status:
                    <select
                      value={task.status}
                      onChange={(e) =>
                        handleStatusChange(task._id, e.target.value)
                      }
                      className="ml-2 bg-white/70 px-3 py-1 text-sm rounded-full border border-gray-300 shadow-sm hover:bg-white transition"
                    >
                      <option>To Do</option>
                      <option>In Progress</option>
                      <option>Done</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientTasks;
