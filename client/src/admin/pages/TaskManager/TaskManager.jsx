// import React, { useEffect, useState } from "react";
// // import axios from "axios";
// import { DragDropContext } from "@hello-pangea/dnd";
// import { FiPlus } from "react-icons/fi";
// import KanbanView from "./KanbanView";
// import TableView from "./TableView";
// import TaskModal from "./TaskModal";
// import Filters from "./Filters";
// import { groupTasksByStatus, normalizeAssignees } from "./utils";
// import axios from "../../../utils/axiosInstance";
// import { useSocket } from "../../../context/SocketContext";
// import ConfirmModal from "../../components/common/ConfirmModal";

// const TaskManager = () => {
//   const { socket } = useSocket();
//   const [taskList, setTaskList] = useState([]);
//   const [teamMembers, setTeamMembers] = useState([]);
//   const [filters, setFilters] = useState({ priority: "", status: "" });
//   const [showModal, setShowModal] = useState(false);
//   const [editTaskData, setEditTaskData] = useState(null);
//   const [viewMode, setViewMode] = useState("kanban");

//   const [showConfirm, setShowConfirm] = useState(false);
// const [taskToDelete, setTaskToDelete] = useState(null);


//   const token = localStorage.getItem("token");
//   const config = { headers: { Authorization: `Bearer ${token}` } };

//   useEffect(() => {
//     if (!socket) return;

//     const handleTaskCreated = (task) => {
//       const normalized = {
//         ...task,
//         assignees: normalizeAssignees(task.assignees, teamMembers),
//       };
//       setTaskList((prev) => [normalized, ...prev]);
//     };

//     const handleTaskUpdated = (task) => {
//       const normalized = {
//         ...task,
//         assignees: normalizeAssignees(task.assignees, teamMembers),
//       };
//       setTaskList((prev) =>
//         prev.map((t) => (t._id === task._id ? normalized : t))
//       );
//     };

//     const handleTaskDeleted = ({ taskId }) => {
//       setTaskList((prev) => prev.filter((t) => t._id !== taskId));
//     };

//     socket.on("taskCreated", handleTaskCreated);
//     socket.on("taskUpdated", handleTaskUpdated);
//     socket.on("taskDeleted", handleTaskDeleted);

//     return () => {
//       socket.off("taskCreated", handleTaskCreated);
//       socket.off("taskUpdated", handleTaskUpdated);
//       socket.off("taskDeleted", handleTaskDeleted);
//     };
//   }, [socket, teamMembers]);

//   const fetchTeamMembers = async () => {
//     try {
//       const res = await axios.get("/api/team", config);
//       const options = res.data.map((user) => ({
//         label: user.name,
//         value: user._id,
//       }));
//       setTeamMembers(options);
//     } catch (err) {
//       console.error("❌ Failed to fetch team members", err);
//     }
//   };

//   const fetchTasks = async () => {
//     try {
//       const res = await axios.get("/api/tasks", config);
//       const tasks = res.data.map((task) => ({
//         ...task,
//         assignees: normalizeAssignees(task.assignees, teamMembers),
//       }));
//       setTaskList(tasks);
//     } catch (err) {
//       console.error("❌ Failed to fetch tasks", err);
//     }
//   };

//   useEffect(() => {
//     const load = async () => {
//       await fetchTeamMembers();
//       await fetchTasks();
//     };
//     load();
//   }, []);

//   const filteredTasks = taskList.filter(
//     (t) =>
//       (!filters.priority || t.priority === filters.priority) &&
//       (!filters.status || t.status === filters.status)
//   );

//   const groupedByStatus = groupTasksByStatus(filteredTasks, [
//     "To Do",
//     "In Progress",
//     "Done",
//   ]);

//   const handleDragEnd = async ({ source, destination }) => {
//     if (!destination) return;
//     const draggedTask = groupedByStatus[source.droppableId][source.index];
//     if (!draggedTask) return;

//     const payload = {
//       ...draggedTask,
//       status: destination.droppableId,
//       assignees: draggedTask.assignees.map((a) => a.value),
//     };

//     try {
//       const res = await axios.put(
//         `/api/tasks/${draggedTask._id}`,
//         payload,
//         config
//       );
//       const updated = {
//         ...res.data,
//         assignees: normalizeAssignees(res.data.assignees, teamMembers),
//       };
//       const updatedList = taskList.map((t) =>
//         t._id === updated._id ? updated : t
//       );
//       setTaskList(updatedList);
//     } catch (err) {
//       console.error("Failed to update task status", err);
//     }
//   };

//   const deleteTask = async (id) => {
//     try {
//       await axios.delete(`/api/tasks/${id}`, config);
//       setTaskList(taskList.filter((t) => t._id !== id));
//     } catch (err) {
//       console.error("Failed to delete task", err);
//     }
//   };

//   const onEditWithTeam = async (task) => {
//     if (teamMembers.length === 0) {
//       await fetchTeamMembers(); // refetch team members if not loaded
//     }

//     const normalized = normalizeAssignees(task.assignees, teamMembers);

//     setEditTaskData({
//       ...task,
//       assignees: normalized,
//     });

//     setShowModal(true);
//   };

//   return (
//     <div className="space-y-8">
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-700">Task Manager</h1>
//           <p className="text-sm text-gray-500">Manage all your team’s tasks</p>
//         </div>
//         {/* <button
//           onClick={() => setShowModal(true)}
//           className="bg-indigo-600 text-white px-5 py-2.5 rounded-full flex items-center gap-2 shadow hover:scale-105"
//         >
//           <FiPlus /> New Task
//         </button> */}

//         <button
//           onClick={async () => {
//             if (teamMembers.length === 0) {
//               await fetchTeamMembers();
//             }
//             setEditTaskData(null); // ensure it's a new task
//             setShowModal(true);
//           }}
//           className="bg-indigo-600 text-white px-5 py-2.5 rounded-full flex items-center gap-2 shadow hover:scale-105"
//         >
//           <FiPlus /> New Task
//         </button>
//       </div>

//       <Filters
//         filters={filters}
//         setFilters={setFilters}
//         viewMode={viewMode}
//         setViewMode={setViewMode}
//       />

//       <DragDropContext onDragEnd={handleDragEnd}>
//         {viewMode === "kanban" ? (
//           <KanbanView
//             groupedTasks={groupedByStatus}
//             onEdit={onEditWithTeam}
//             // onEdit={setEditTaskData}
//             // onDelete={deleteTask}
//             onDelete={(id) => {
//   setTaskToDelete(id);
//   setShowConfirm(true);
// }}

//             openModal={() => setShowModal(true)}
//           />
//         ) : (
//           <TableView tasks={filteredTasks} />
//         )}
//       </DragDropContext>

//       {showModal && (
//         <TaskModal
//           onClose={() => {
//             setShowModal(false);
//             setEditTaskData(null);
//           }}
//           onSave={fetchTasks}
//           editTask={editTaskData}
//           teamMembers={teamMembers}
//         />
//       )}

//       {showConfirm && (
//   <ConfirmModal
//     isOpen={showConfirm}
//     onClose={() => {
//       setShowConfirm(false);
//       setTaskToDelete(null);
//     }}
//     onConfirm={() => {
//       if (taskToDelete) deleteTask(taskToDelete);
//     }}
//     title="Delete Task"
//     message="Are you sure you want to delete this task? This action cannot be undone."
//   />
// )}

//     </div>
//   );
// };

// export default TaskManager;



import React, { useEffect, useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import { FiPlus } from "react-icons/fi";
import KanbanView from "./KanbanView";
import TableView from "./TableView";
import TaskModal from "./TaskModal";
import Filters from "./Filters";
import { groupTasksByStatus, normalizeAssignees } from "./utils";
import axios from "../../../utils/axiosInstance";
import { useSocket } from "../../../context/SocketContext";
import ConfirmModal from "../../components/common/ConfirmModal";

const TaskManager = () => {
  const { socket } = useSocket();
  const [taskList, setTaskList] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [filters, setFilters] = useState({ priority: "", status: "" });
  const [showModal, setShowModal] = useState(false);
  const [editTaskData, setEditTaskData] = useState(null);
  const [viewMode, setViewMode] = useState("kanban");
  const [showConfirm, setShowConfirm] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    if (!socket) return;

    const handleTaskCreated = (task) => {
      const normalized = {
        ...task,
        assignees: normalizeAssignees(task.assignees, teamMembers),
      };
      setTaskList((prev) => [normalized, ...prev]);
    };

    const handleTaskUpdated = (task) => {
      const normalized = {
        ...task,
        assignees: normalizeAssignees(task.assignees, teamMembers),
      };
      setTaskList((prev) =>
        prev.map((t) => (t._id === task._id ? normalized : t))
      );
    };

    const handleTaskDeleted = ({ taskId }) => {
      setTaskList((prev) => prev.filter((t) => t._id !== taskId));
    };

    socket.on("taskCreated", handleTaskCreated);
    socket.on("taskUpdated", handleTaskUpdated);
    socket.on("taskDeleted", handleTaskDeleted);

    return () => {
      socket.off("taskCreated", handleTaskCreated);
      socket.off("taskUpdated", handleTaskUpdated);
      socket.off("taskDeleted", handleTaskDeleted);
    };
  }, [socket, teamMembers]);

  const fetchTeamMembers = async () => {
    try {
      const res = await axios.get("/api/team", config);
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

  const onEditWithTeam = async (task) => {
    if (teamMembers.length === 0) {
      await fetchTeamMembers();
    }

    const normalized = normalizeAssignees(task.assignees, teamMembers);

    setEditTaskData({
      ...task,
      assignees: normalized,
    });

    setShowModal(true);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
            Task Manager
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage all your team’s tasks
          </p>
        </div>
        <button
          onClick={async () => {
            if (teamMembers.length === 0) {
              await fetchTeamMembers();
            }
            setEditTaskData(null);
            setShowModal(true);
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-full flex items-center gap-2 shadow hover:scale-105 transition"
        >
          <FiPlus /> New Task
        </button>
      </div>

      {/* Filters */}
      <Filters
        filters={filters}
        setFilters={setFilters}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {/* Task Views */}
      <DragDropContext onDragEnd={handleDragEnd}>
        {viewMode === "kanban" ? (
          <KanbanView
            groupedTasks={groupedByStatus}
            onEdit={onEditWithTeam}
            onDelete={(id) => {
              setTaskToDelete(id);
              setShowConfirm(true);
            }}
            openModal={() => setShowModal(true)}
          />
        ) : (
          <TableView tasks={filteredTasks} />
        )}
      </DragDropContext>

      {/* Task Modal */}
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

      {/* Confirm Delete */}
      {showConfirm && (
        <ConfirmModal
          isOpen={showConfirm}
          onClose={() => {
            setShowConfirm(false);
            setTaskToDelete(null);
          }}
          onConfirm={() => {
            if (taskToDelete) deleteTask(taskToDelete);
          }}
          title="Delete Task"
          message="Are you sure you want to delete this task? This action cannot be undone."
        />
      )}
    </div>
  );
};

export default TaskManager;
