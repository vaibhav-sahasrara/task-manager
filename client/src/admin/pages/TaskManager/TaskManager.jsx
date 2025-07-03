import React, { useEffect, useState } from "react";
// import axios from "axios";
import { DragDropContext } from "@hello-pangea/dnd";
import { FiPlus } from "react-icons/fi";
import KanbanView from "./KanbanView";
import TableView from "./TableView";
import TaskModal from "./TaskModal";
import Filters from "./Filters";
import { groupTasksByStatus, normalizeAssignees } from "./utils";
import axios from "../../../utils/axiosInstance"; // use relative path

const TaskManager = () => {
  const [taskList, setTaskList] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [filters, setFilters] = useState({ priority: "", status: "" });
  const [showModal, setShowModal] = useState(false);
  const [editTaskData, setEditTaskData] = useState(null);
  const [viewMode, setViewMode] = useState("kanban");

  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const fetchTeamMembers = async () => {
    try {
      const res = await axios.get("/api/users", config);
      const options = res.data.map((user) => ({
        label: user.name,
        value: user._id,
      }));
      setTeamMembers(options);
    } catch (err) {
      console.error("❌ Failed to fetch team members", err);
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await axios.get("/api/tasks", config);
      const tasks = res.data.map((task) => ({
        ...task,
        assignees: normalizeAssignees(task.assignees, teamMembers),
      }));
      setTaskList(tasks);
    } catch (err) {
      console.error("❌ Failed to fetch tasks", err);
    }
  };

  useEffect(() => {
    const load = async () => {
      await fetchTeamMembers();
      await fetchTasks();
    };
    load();
  }, []);

  const filteredTasks = taskList.filter(
    (t) =>
      (!filters.priority || t.priority === filters.priority) &&
      (!filters.status || t.status === filters.status)
  );

  const groupedByStatus = groupTasksByStatus(filteredTasks, [
    "To Do",
    "In Progress",
    "Done",
  ]);

  const handleDragEnd = async ({ source, destination }) => {
    if (!destination) return;
    const draggedTask = groupedByStatus[source.droppableId][source.index];
    if (!draggedTask) return;

    const payload = {
      ...draggedTask,
      status: destination.droppableId,
      assignees: draggedTask.assignees.map((a) => a.value),
    };

    try {
      const res = await axios.put(
        `/api/tasks/${draggedTask._id}`,
        payload,
        config
      );
      const updated = {
        ...res.data,
        assignees: normalizeAssignees(res.data.assignees, teamMembers),
      };
      const updatedList = taskList.map((t) =>
        t._id === updated._id ? updated : t
      );
      setTaskList(updatedList);
    } catch (err) {
      console.error("Failed to update task status", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`, config);
      setTaskList(taskList.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Failed to delete task", err);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-700">Task Manager</h1>
          <p className="text-sm text-gray-500">Manage all your team’s tasks</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 text-white px-5 py-2.5 rounded-full flex items-center gap-2 shadow hover:scale-105"
        >
          <FiPlus /> New Task
        </button>
      </div>

      <Filters
        filters={filters}
        setFilters={setFilters}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      <DragDropContext onDragEnd={handleDragEnd}>
        {viewMode === "kanban" ? (
          <KanbanView
            groupedTasks={groupedByStatus}
            onEdit={setEditTaskData}
            onDelete={deleteTask}
            openModal={() => setShowModal(true)}
          />
        ) : (
          <TableView tasks={filteredTasks} />
        )}
      </DragDropContext>

      {showModal && (
        <TaskModal
          onClose={() => {
            setShowModal(false);
            setEditTaskData(null);
          }}
          onSave={fetchTasks}
          editTask={editTaskData}
          teamMembers={teamMembers}
        />
      )}
    </div>
  );
};

export default TaskManager;
