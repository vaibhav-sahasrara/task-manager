// import React, { useState } from "react";
// import Select from "react-select";
// import {
//   FiUserPlus,
//   FiList,
//   FiCalendar,
//   FiPlus,
//   FiX,
//   FiEdit,
//   FiTrash2,
// } from "react-icons/fi";
// import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
// import axios from "axios";
// import { useEffect } from "react";

// const priorities = ["Low", "Medium", "High"];
// const statuses = ["To Do", "In Progress", "Done"];

// const TaskManager = () => {
//   const [taskList, setTaskList] = useState([]);
//   const [viewMode, setViewMode] = useState("kanban");
//   const [showModal, setShowModal] = useState(false);
//   const [editIndex, setEditIndex] = useState(null);
//   const [teamMembers, setTeamMembers] = useState([]);
//   const [filters, setFilters] = useState({ priority: "", status: "" });
//   const [task, setTask] = useState({
//     name: "",
//     description: "",
//     startDate: "",
//     deadline: "",
//     assignees: [],
//     priority: "Medium",
//     status: "To Do",
//     tags: [],
//   });
//   const token = localStorage.getItem("token");
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setTask((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSelect = (selectedOption) => {
//     setTask((prev) => ({ ...prev, assignee: selectedOption }));
//   };

//   const getPriorityBadge = (priority) => {
//     const base =
//       "inline-block text-xs font-semibold px-2 py-1 rounded-full shadow";
//     switch (priority) {
//       case "High":
//         return <span className={`${base} bg-red-100 text-red-700`}>High</span>;
//       case "Medium":
//         return (
//           <span className={`${base} bg-yellow-100 text-yellow-700`}>
//             Medium
//           </span>
//         );
//       case "Low":
//         return (
//           <span className={`${base} bg-green-100 text-green-700`}>Low</span>
//         );
//       default:
//         return null;
//     }
//   };

//   const getPriorityClass = (priority) => {
//     switch (priority) {
//       case "High":
//         return "bg-red-100 border-red-200";
//       case "Medium":
//         return "bg-yellow-100 border-yellow-200";
//       case "Low":
//         return "bg-green-100 border-green-200";
//       default:
//         return "bg-gray-100 border-gray-200";
//     }
//   };

//   const fetchTasks = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/tasks", config);
//       setTaskList(res.data);
//       // console.log("Task Assignees:", task.assignees);
//       // console.log("Team Members:", teamMembers);
//       // console.log("✅ Tasks fetched:", res.data);
//     } catch (err) {
//       console.error("Failed to fetch tasks", err);
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/users", config); // New endpoint
//       const options = res.data.map((user) => ({
//         label: user.name,
//         value: user._id, // ✅ direct User._id
//       }));
//       setTeamMembers(options);
//     } catch (err) {
//       console.error("❌ Failed to fetch users", err);
//     }
//   };

//   useEffect(() => {
//     const loadData = async () => {
//       await fetchUsers(); // ✅ wait for team to load
//       await fetchTasks(); // ✅ now fetch tasks
//     };
//     loadData();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = {
//       ...task,
//       assignees: (task.assignees || []).map((a) =>
//         typeof a === "object" && a.value ? a.value : a
//       ),
//       startDate: task.startDate ? new Date(task.startDate) : null,
//       deadline: task.deadline ? new Date(task.deadline) : null,
//     };

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/tasks",
//         payload,
//         config
//       );

//       // ✅ Map populated assignees to label/value format for Select
//       const newTask = {
//         ...res.data,
//         assignees: res.data.assignees.map((a) => ({
//           label: a.name,
//           value: a._id,
//         })),
//       };

//       setTaskList([...taskList, newTask]);
//       resetForm();
//     } catch (err) {
//       console.error("❌ Failed to save task", err);
//     }
//   };

//   const getAssigneeNames = (assignees) =>
//     (assignees || []).map((a) => a?.name || "Unknown").join(", ");

//   const resetForm = () => {
//     setTask({
//       name: "",
//       description: "",
//       assignees: [],
//       deadline: "",
//       priority: "Medium",
//       status: "To Do",
//       tags: [],
//     });

//     setEditIndex(null);
//     setShowModal(false);
//   };

//   const editTask = (index) => {
//     const t = taskList[index];
//     setTask({
//       ...t,
//       assignees: t.assignees.map((a) => {
//         if (typeof a === "string") {
//           return (
//             teamMembers.find((m) => m.value === a) || {
//               label: "Unknown",
//               value: a,
//             }
//           );
//         } else if (a._id) {
//           return { value: a._id, label: a.name };
//         } else {
//           return a;
//         }
//       }),
//     });
//     setEditIndex(index);
//     setShowModal(true);
//   };

//   const filteredTasks = taskList.filter(
//     (task) =>
//       (!filters.priority || task.priority === filters.priority) &&
//       (!filters.status || task.status === filters.status)
//   );

//   const groupedByStatus = statuses.reduce((acc, status) => {
//     acc[status] = filteredTasks.filter((task) => task.status === status);
//     return acc;
//   }, {});

//   const onDragEnd = async (result) => {
//     const { source, destination } = result;
//     if (!destination) return;

//     const draggedTask = groupedByStatus[source.droppableId][source.index];
//     if (!draggedTask) return;

//     // 🧼 Convert populated assignees to raw ObjectIds
//     const cleanAssignees = (draggedTask.assignees || [])
//       .map((a) => {
//         if (typeof a === "string") return a;
//         if (a._id) return a._id;
//         if (a.value) return a.value;
//         return null;
//       })
//       .filter(Boolean);

//     // 🧽 Clean the payload for backend
//     const updatedTask = {
//       name: draggedTask.name,
//       description: draggedTask.description,
//       startDate: draggedTask.startDate,
//       deadline: draggedTask.deadline,
//       status: destination.droppableId,
//       priority: draggedTask.priority,
//       tags: draggedTask.tags,
//       assignees: cleanAssignees,
//     };

//     // console.log("🛠 Payload sent to backend:", updatedTask);

//     try {
//       const res = await axios.put(
//         `http://localhost:5000/api/tasks/${draggedTask._id}`,
//         updatedTask,
//         config
//       );

//       const updated = res.data;
//       // console.log("✅ Updated task from drag:", updated);

//       const newList = taskList.map((t) =>
//         t._id === updated._id ? updated : t
//       );
//       setTaskList(newList);
//     } catch (err) {
//       console.error("❌ Failed to update task status", err);
//     }
//   };

//   const deleteTask = async (index) => {
//     const id = taskList[index]._id;
//     try {
//       await axios.delete(`http://localhost:5000/api/tasks/${id}`);
//       const updatedTasks = [...taskList];
//       updatedTasks.splice(index, 1);
//       setTaskList(updatedTasks);
//     } catch (err) {
//       console.error("Failed to delete task", err);
//     }
//   };

//   return (
//     <div className="space-y-8">
//       {/* Header Section */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-600">Task Manager</h1>
//           <p className="text-sm text-gray-500">
//             Manage your team's tasks efficiently
//           </p>
//         </div>

//         <div className="flex gap-3">
//           <button
//             onClick={() => setShowModal(true)}
//             className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-5 py-2.5 rounded-full shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-300"
//           >
//             <FiPlus className="text-lg" /> New Task
//           </button>
//         </div>
//       </div>

//       {/* View Toggle Buttons */}
//       <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
//         {/* Filters */}
//         <div className="flex gap-3">
//           <select
//             onChange={(e) =>
//               setFilters((f) => ({ ...f, priority: e.target.value }))
//             }
//             value={filters.priority}
//             className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-300 focus:outline-none bg-white text-sm text-gray-700"
//           >
//             <option value="">All Priorities</option>
//             {priorities.map((p) => (
//               <option key={p}>{p}</option>
//             ))}
//           </select>

//           <select
//             onChange={(e) =>
//               setFilters((f) => ({ ...f, status: e.target.value }))
//             }
//             value={filters.status}
//             className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-300 focus:outline-none bg-white text-sm text-gray-700"
//           >
//             <option value="">All Statuses</option>
//             {statuses.map((s) => (
//               <option key={s}>{s}</option>
//             ))}
//           </select>
//         </div>

//         {/* View Mode Buttons */}
//         <div className="flex gap-2">
//           <button
//             onClick={() => setViewMode("kanban")}
//             className={`px-4 py-2 text-sm rounded-full border transition-all duration-200 ${
//               viewMode === "kanban"
//                 ? "bg-indigo-600 text-white shadow"
//                 : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
//             }`}
//           >
//             Kanban View
//           </button>
//           <button
//             onClick={() => setViewMode("table")}
//             className={`px-4 py-2 text-sm rounded-full border transition-all duration-200 ${
//               viewMode === "table"
//                 ? "bg-indigo-600 text-white shadow"
//                 : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
//             }`}
//           >
//             Table View
//           </button>
//         </div>
//       </div>

//       {viewMode === "kanban" ? (
//         <DragDropContext onDragEnd={onDragEnd}>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {statuses.map((status) => (
//               <Droppable droppableId={status} key={status}>
//                 {(provided) => (
//                   <div
//                     ref={provided.innerRef}
//                     {...provided.droppableProps}
//                     className="bg-white rounded-2xl shadow border p-4 min-h-[300px]"
//                   >
//                     <h2 className="text-lg font-semibold text-indigo-600 mb-4">
//                       {status}
//                     </h2>
//                     {groupedByStatus[status].map((task, idx) => (
//                       <Draggable
//                         key={task._id}
//                         draggableId={task._id}
//                         index={idx}
//                       >
//                         {(provided) => (
//                           <div
//                             ref={provided.innerRef}
//                             {...provided.draggableProps}
//                             {...provided.dragHandleProps}
//                             className={`${getPriorityClass(
//                               task.priority
//                             )} rounded-xl p-4 mb-3 shadow-sm hover:shadow-md transition`}
//                           >
//                             <h3 className="font-bold text-indigo-800">
//                               {task.name}
//                             </h3>
//                             <p className="text-sm text-gray-600">
//                               {task.description}
//                             </p>
//                             <p className="text-sm text-gray-700">
//                               <strong>Deadline:</strong>{" "}
//                               {new Date(task.deadline).toLocaleDateString(
//                                 "en-GB"
//                               )}
//                             </p>
//                             {/* <p>
//                               <strong>Assignees:</strong>{" "}
//                               {getAssigneeNames(task.assignees)}
//                             </p> */}
//                             {task.assignees && task.assignees.length > 0 && (
//                               <p className="text-base text-gray-600">
//                                 Assigned to: {getAssigneeNames(task.assignees)}
//                               </p>
//                             )}

//                             <div className="flex justify-end gap-2 mt-2">
//                               <button
//                                 onClick={() => editTask(taskList.indexOf(task))}
//                                 className="text-blue-500 hover:text-blue-700"
//                               >
//                                 <FiEdit />
//                               </button>
//                               <button
//                                 onClick={() =>
//                                   deleteTask(taskList.indexOf(task))
//                                 }
//                                 className="text-red-500 hover:text-red-700"
//                               >
//                                 <FiTrash2 />
//                               </button>
//                             </div>
//                           </div>
//                         )}
//                       </Draggable>
//                     ))}
//                     {provided.placeholder}
//                   </div>
//                 )}
//               </Droppable>
//             ))}
//           </div>
//         </DragDropContext>
//       ) : (
//         <div className="bg-white rounded-3xl shadow-xl border px-8 py-6">
//           <h2 className="text-2xl font-bold text-indigo-700 mb-6 flex items-center gap-2">
//             <FiCalendar className="text-indigo-500 text-2xl" />
//             Tasks by Month
//           </h2>

//           {taskList.length === 0 ? (
//             <p className="text-gray-400 text-center">No tasks assigned yet.</p>
//           ) : (
//             Object.entries(
//               taskList.reduce((acc, task) => {
//                 const date = new Date(task.deadline);
//                 const monthKey = date.toLocaleString("default", {
//                   month: "long",
//                   year: "numeric",
//                 });
//                 if (!acc[monthKey]) acc[monthKey] = [];
//                 acc[monthKey].push(task);
//                 return acc;
//               }, {})
//             )
//               .sort(([a], [b]) => new Date(`1 ${a}`) - new Date(`1 ${b}`))
//               .map(([month, tasks]) => (
//                 <div key={month} className="mb-10">
//                   <h3 className="text-lg font-semibold text-indigo-600 mb-4 border-b pb-2 flex items-center gap-2">
//                     <FiCalendar /> {month}
//                   </h3>

//                   <div className="overflow-x-auto rounded-xl shadow-md">
//                     <table className="min-w-full divide-y divide-gray-200 text-sm">
//                       <thead className="bg-indigo-50 text-indigo-700">
//                         <tr>
//                           <th className="px-4 py-2 text-left">Task</th>
//                           <th className="px-4 py-2 text-left">Description</th>
//                           <th className="px-4 py-2 text-left">Priority</th>
//                           <th className="px-4 py-2 text-left">Status</th>
//                           <th className="px-4 py-2 text-left">Assignee</th>
//                           <th className="px-4 py-2 text-left">Deadline</th>
//                         </tr>
//                       </thead>
//                       <tbody className="divide-y divide-gray-100">
//                         {tasks.map((t, idx) => (
//                           <tr key={idx} className="hover:bg-gray-50 transition">
//                             <td className="px-4 py-3 font-medium text-gray-800">
//                               {t.name}
//                             </td>
//                             <td className="px-4 py-3 text-gray-600">
//                               {t.description}
//                             </td>
//                             <td className="px-4 py-3">
//                               {getPriorityBadge(t.priority)}
//                             </td>
//                             <td className="px-4 py-3 text-gray-700">
//                               {t.status}
//                             </td>
//                             <td>{getAssigneeNames(t.assignees)}</td>

//                             <td className="px-4 py-3 text-gray-600">
//                               {new Date(t.deadline).toLocaleDateString("en-IN")}
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               ))
//           )}
//         </div>
//       )}

//       {showModal && (
//         <div className="fixed inset-0 z-50  flex items-center justify-center p-4">
//           <div className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-2xl relative">
//             <button
//               onClick={resetForm}
//               className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-2xl"
//             >
//               <FiX />
//             </button>
//             <h2 className="text-xl font-bold text-indigo-700 mb-6 flex items-center gap-2">
//               <FiUserPlus className="text-indigo-500 text-3xl" />
//               {editIndex !== null ? "Edit Task" : "Assign New Task"}
//             </h2>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//                 <input
//                   name="name"
//                   value={task.name}
//                   onChange={handleChange}
//                   placeholder="Task Title"
//                   required
//                   className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-300 outline-none"
//                 />

//                 <input
//                   type="date"
//                   name="deadline"
//                   value={task.deadline}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-300 outline-none"
//                 />
//               </div>
//               <textarea
//                 name="description"
//                 rows={3}
//                 placeholder="Task Description"
//                 value={task.description}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-300 outline-none"
//               />
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
//                 <Select
//                   options={teamMembers} // now = users with real _id
//                   isMulti
//                   value={task.assignees}
//                   onChange={(selected) => {
//                     setTask((prev) => ({
//                       ...prev,
//                       assignees: selected, // array of { label, value }
//                     }));
//                   }}
//                 />

//                 <select
//                   name="priority"
//                   value={task.priority}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-300 outline-none"
//                 >
//                   {priorities.map((p) => (
//                     <option key={p}>{p}</option>
//                   ))}
//                 </select>
//                 <select
//                   name="status"
//                   value={task.status}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-300 outline-none"
//                 >
//                   {statuses.map((s) => (
//                     <option key={s}>{s}</option>
//                   ))}
//                 </select>
//               </div>
//               <div className="flex justify-end gap-2">
//                 <button
//                   type="button"
//                   onClick={resetForm}
//                   className="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-6 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 shadow"
//                 >
//                   {editIndex !== null ? "Update Task" : "Save Task"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TaskManager;
