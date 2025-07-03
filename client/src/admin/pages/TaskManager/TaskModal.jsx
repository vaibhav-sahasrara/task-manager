import React, { useEffect, useState } from "react";
import { FiX, FiUserPlus } from "react-icons/fi";
import Select from "react-select";
import { motion } from "framer-motion";
import axios from "../../../utils/axiosInstance";

const priorities = ["Low", "Medium", "High"];
const statuses = ["To Do", "In Progress", "Done"];

const TaskModal = ({ onClose, onSave, editTask, teamMembers }) => {
  const [task, setTask] = useState({
    name: "",
    description: "",
    assignees: [],
    priority: "Medium",
    status: "To Do",
    deadline: "",
  });

  useEffect(() => {
    if (editTask) {
      setTask({
        ...editTask,
        assignees: editTask.assignees || [],
      });
    }
  }, [editTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...task,
      assignees: task.assignees.map((a) => a.value),
    };

    try {
      if (editTask) {
        await axios.put(`/api/tasks/${editTask._id}`, payload);
      } else {
        await axios.post("/api/tasks", payload);
      }
      onSave();
      onClose();
    } catch (err) {
      console.error("❌ Error saving task", err.response?.data || err);
    }
  };

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 z-[100] flex justify-end">
      {/* Overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 "
      />

      {/* Drawer */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative h-full w-full max-w-xl bg-white shadow-2xl z-10 flex flex-col"
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b bg-white">
          <h2 className="text-lg font-semibold text-indigo-700 flex items-center gap-2">
            <FiUserPlus /> {editTask ? "Edit Task" : "Create Task"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-xl"
          >
            <FiX />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto flex-1 px-4 py-4 space-y-4"
        >
          {/* Title */}
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">
              Task Title
            </label>
            <input
              name="name"
              value={task.name}
              onChange={handleChange}
              placeholder="Enter title"
              className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={task.description}
              onChange={handleChange}
              rows={3}
              placeholder="Write description"
              className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Assignees, Priority, Status */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600 block mb-1">
                Assignees
              </label>
              <Select
                isMulti
                options={teamMembers}
                value={task.assignees}
                onChange={(selected) =>
                  setTask((prev) => ({ ...prev, assignees: selected }))
                }
                classNamePrefix="react-select"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-600 block mb-1">
                  Priority
                </label>
                <select
                  name="priority"
                  value={task.priority}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-xl"
                >
                  {priorities.map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600 block mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={task.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-xl"
                >
                  {statuses.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Deadline */}
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">
              Deadline
            </label>
            <input
              type="date"
              name="deadline"
              value={task.deadline}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl"
            />
          </div>
        </form>

        {/* Footer Actions */}
        <div className="border-t p-3 flex justify-end gap-3 bg-white">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full shadow"
          >
            {editTask ? "Update" : "Save"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default TaskModal;
