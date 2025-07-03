import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FiCheckCircle,
  FiCalendar,
  FiUser,
  FiLoader,
  FiFlag,
  FiActivity,
} from "react-icons/fi";

const ClientTasks = () => {
  const [tasks, setTasks] = useState([]);
  const userId = "685fd114fe9bfd36ab1ec0cc"; // Replace with auth user ID if needed

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/tasks?assigneeId=${userId}`
        );
        setTasks(res.data);
      } catch (err) {
        console.error("Failed to fetch tasks", err);
      }
    };
    fetchTasks();
  }, []);

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${taskId}`, {
        status: newStatus,
      });

      setTasks((prev) =>
        prev.map((t) => (t._id === taskId ? { ...t, status: newStatus } : t))
      );
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const getPriorityTag = (priority) => {
    const colors = {
      High: "bg-red-500 text-white",
      Medium: "bg-yellow-400 text-gray-900",
      Low: "bg-green-400 text-gray-900",
    };
    return (
      <span
        className={`text-[11px] px-2 py-1 rounded-full font-medium ${
          colors[priority] || "bg-gray-300"
        }`}
      >
        {priority}
      </span>
    );
  };

  return (
    <div className="space-y-8 px-6 py-4">
      <h1 className="text-3xl font-bold text-indigo-700 flex items-center gap-3">
        <FiCheckCircle className="text-indigo-500" />
        Assigned Tasks
      </h1>

      {tasks.length === 0 ? (
        <div className="text-center text-gray-400 mt-20 text-lg animate-pulse flex flex-col items-center gap-2">
          <FiLoader className="text-3xl" />
          No tasks assigned yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task, index) => (
            <motion.div
              key={task._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 relative group overflow-hidden"
            >
              {/* Decorative Top Border */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

              <div className="p-5 space-y-3">
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h2 className="text-lg font-bold text-indigo-800 flex items-center gap-2">
                      {task.name}
                      {getPriorityTag(task.priority)}
                    </h2>

                    {/* Status Selector */}
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <FiActivity className="text-indigo-400" />
                      <select
                        value={task.status}
                        onChange={(e) =>
                          handleStatusChange(task._id, e.target.value)
                        }
                        className="bg-gray-100 border-none rounded-full text-xs px-3 py-1 hover:bg-gray-200 cursor-pointer focus:outline-none"
                      >
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 line-clamp-3">
                  {task.description}
                </p>

                {/* Footer Info */}
                <div className="text-sm text-gray-700 space-y-1 pt-3">
                  <div className="flex items-center gap-2">
                    <FiCalendar className="text-indigo-400" />
                    Deadline:{" "}
                    {new Date(task.deadline).toLocaleDateString("en-GB")}
                  </div>

                  <div className="flex items-center gap-2">
                    <FiUser className="text-indigo-400" />
                    {task.assignee?.label || "Unassigned"}
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
