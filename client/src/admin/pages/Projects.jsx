// import React, { useEffect, useState } from "react";
// import { FiPlus, FiUsers, FiCalendar } from "react-icons/fi";
// import axios from "axios";
// import Select from "react-select";

// const statusClasses = {
//   Completed: "bg-emerald-200 text-emerald-900",
//   "In Progress": "bg-yellow-200 text-yellow-900",
//   Pending: "bg-gray-200 text-gray-800",
//   "On Hold": "bg-blue-200 text-blue-900",
//   Cancelled: "bg-red-200 text-red-900",
// };

// const priorityClasses = {
//   Low: "bg-gray-100 text-gray-700",
//   Medium: "bg-yellow-100 text-yellow-800",
//   High: "bg-orange-100 text-orange-800",
//   Critical: "bg-red-100 text-red-800",
// };

// const initialForm = {
//   name: "",
//   description: "",
//   deadline: "",
//   status: "In Progress",
//   priority: "Medium",
//   owner: "",
//   team: [],
// };

// const Projects = () => {
//   const [projects, setProjects] = useState([]);
//   const [teamList, setTeamList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [formData, setFormData] = useState(initialForm);
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   const teamOptions = teamList.map((member) => ({
//     value: member._id,
//     label: member.name,
//   }));

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/projects")
//       .then((res) => setProjects(res.data))
//       .catch(console.error);

//     axios
//       .get("http://localhost:5000/api/team", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       })
//       .then((res) => setTeamList(res.data))
//       .catch(console.error)
//       .finally(() => setLoading(false));
//   }, []);

//   const handleInput = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleTeamSelect = (e) => {
//     const selected = Array.from(e.target.selectedOptions).map(
//       (opt) => opt.value
//     );
//     setFormData((prev) => ({ ...prev, team: selected }));
//   };

//   const submitProject = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5000/api/projects", formData);
//       const updated = await axios.get("http://localhost:5000/api/projects");
//       setProjects(updated.data);
//       setFormData(initialForm);
//       setShowAddForm(false);
//     } catch (err) {
//       console.error("Error adding project:", err);
//     }
//   };

//   const openModal = (project) => {
//     setSelectedProject(project);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setSelectedProject(null);
//     setShowModal(false);
//   };

//   return (
//     <div className="space-y-8">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold text-gray-600">Projects</h1>
//         <button
//           onClick={() => setShowAddForm(true)}
//           className="px-5 py-2 flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium shadow-lg"
//         >
//           <FiPlus /> New Project
//         </button>
//       </div>

//       {showAddForm && (
//         <div className="fixed inset-0 z-50  flex items-center justify-center p-4">
//           <form
//             onSubmit={submitProject}
//             className="bg-white rounded-2xl p-6 shadow-xl w-full max-w-2xl space-y-4"
//           >
//             <h2 className="text-xl font-bold text-gray-800">Add New Project</h2>

//             {/* Grid layout for inputs */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <input
//                 name="name"
//                 placeholder="Project Name"
//                 value={formData.name}
//                 onChange={handleInput}
//                 className="w-full border rounded p-2"
//                 required
//               />
//               <input
//                 type="date"
//                 name="deadline"
//                 value={formData.deadline}
//                 onChange={handleInput}
//                 className="w-full border rounded p-2"
//                 required
//               />
//               <select
//                 name="status"
//                 value={formData.status}
//                 onChange={handleInput}
//                 className="w-full border rounded p-2"
//               >
//                 <option>In Progress</option>
//                 <option>Completed</option>
//                 <option>Pending</option>
//                 <option>On Hold</option>
//                 <option>Cancelled</option>
//               </select>
//               <select
//                 name="priority"
//                 value={formData.priority}
//                 onChange={handleInput}
//                 className="w-full border rounded p-2"
//               >
//                 <option>Low</option>
//                 <option>Medium</option>
//                 <option>High</option>
//                 <option>Critical</option>
//               </select>

//               <Select
//                 name="owner"
//                 options={teamOptions}
//                 value={teamOptions.find((opt) => opt.value === formData.owner)}
//                 onChange={(selectedOption) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     owner: selectedOption?.value || "",
//                   }))
//                 }
//                 placeholder="Select Owner"
//                 className="w-full"
//               />

//               <Select
//                 isMulti
//                 name="team"
//                 options={teamOptions}
//                 value={teamOptions.filter((opt) =>
//                   formData.team.includes(opt.value)
//                 )}
//                 onChange={(selectedOptions) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     team: selectedOptions.map((opt) => opt.value),
//                   }))
//                 }
//                 placeholder="Select Team Members"
//                 className="w-full"
//               />
//             </div>

//             {/* Full width description below grid */}
//             <textarea
//               name="description"
//               placeholder="Description"
//               value={formData.description}
//               onChange={handleInput}
//               className="w-full border rounded p-2"
//             />

//             {/* Action Buttons */}
//             <div className="flex justify-end gap-3 pt-2">
//               <button
//                 type="button"
//                 onClick={() => {
//                   setShowAddForm(false);
//                   setFormData(initialForm);
//                 }}
//                 className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
//               >
//                 Save
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* Project Cards */}
//       {loading ? (
//         <div className="text-center text-gray-400">Loading projects...</div>
//       ) : projects.length === 0 ? (
//         <div className="text-center text-gray-400">No projects found.</div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
//           {projects.map((project) => (
//             <div
//               key={project._id}
//               onClick={() => openModal(project)}
//               className="relative p-6 rounded-3xl bg-white/80 shadow-2xl border border-white backdrop-blur-lg hover:shadow-indigo-200 transition-shadow duration-300 cursor-pointer"
//             >
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-bold text-gray-800">
//                   {project.name}
//                 </h2>
//                 <div
//                   className={`px-3 py-1 text-xs font-bold rounded-full ${
//                     statusClasses[project.status]
//                   }`}
//                 >
//                   {project.status}
//                 </div>
//               </div>
//               {/* <p className="text-sm text-gray-600 mb-3 line-clamp-2">
//                 {project.description || 'No description provided.'}
//               </p> */}
//               <div className="flex items-center text-sm text-gray-500 mb-2">
//                 <FiCalendar className="mr-2" />
//                 {new Date(project.deadline).toLocaleDateString("en-GB")}
//               </div>
//               <div
//                 className={`inline-block px-3 py-1 text-xs rounded-full font-semibold ${
//                   priorityClasses[project.priority]
//                 } mb-4`}
//               >
//                 Priority: {project.priority}
//               </div>
//               <div className="flex items-center gap-2">
//                 <FiUsers className="text-gray-500" />
//                 <div className="flex -space-x-3">
//                   {project.team.map((member) => (
//                     <img
//                       key={member._id}
//                       src={member.avatar}
//                       alt={member.name}
//                       title={member.name}
//                       className="w-8 h-8 rounded-full border-2 border-white shadow-md"
//                     />
//                   ))}
//                 </div>
//               </div>
//               <div className="absolute -top-4 -right-4 w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center border-4 border-indigo-200">
//                 <div className="text-sm font-bold text-indigo-700">
//                   {project.progress}%
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Modal View */}
//       {showModal && selectedProject && (
//         <div className="fixed inset-0 z-50  flex items-center justify-center p-4">
//           <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg relative animate-fadeIn">
//             <button
//               onClick={closeModal}
//               className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-xl font-bold"
//             >
//               ×
//             </button>
//             <h2 className="text-2xl font-bold mb-3">{selectedProject.name}</h2>
//             <p className="text-sm text-gray-600 mb-4">
//               {selectedProject.description || "No description provided."}
//             </p>
//             <div className="mb-4 space-y-1 text-sm text-gray-700">
//               <p>
//                 <strong>Status:</strong> {selectedProject.status}
//               </p>
//               <p>
//                 <strong>Priority:</strong> {selectedProject.priority}
//               </p>
//               <p>
//                 <strong>Deadline:</strong>{" "}
//                 {new Date(selectedProject.deadline).toLocaleDateString("en-GB")}
//               </p>
//               <p>
//                 <strong>Progress:</strong> {selectedProject.progress}%
//               </p>
//             </div>
//             <div className="mb-4">
//               <strong className="text-gray-500">Owner:</strong>{" "}
//               {selectedProject.owner ? (
//                 <span className="flex items-center mt-1 gap-2">
//                   <img
//                     src={selectedProject.owner.avatar}
//                     className="w-8 h-8 rounded-full"
//                     alt="owner"
//                   />
//                   <span>{selectedProject.owner.name}</span>
//                 </span>
//               ) : (
//                 "Not assigned"
//               )}
//             </div>
//             <div className="mb-2">
//               <strong className="text-gray-500">Team Members:</strong>

//               {selectedProject.team.length === 0 ? (
//                 <p className="text-sm text-gray-500 mt-1">
//                   No team members assigned.
//                 </p>
//               ) : (
//                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
//                   {selectedProject.team.map((member) => (
//                     <div
//                       key={member._id}
//                       className="flex flex-col items-center text-center"
//                     >
//                       <img
//                         src={member.avatar}
//                         alt={member.name}
//                         className="w-10 h-10 rounded-full border border-white shadow"
//                       />
//                       <span className="text-xs text-gray-700 mt-1">
//                         {member.name}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Projects;
