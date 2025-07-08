// import React from "react";
// import { FiCalendar, FiUsers } from "react-icons/fi";

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

// const ProjectCard = ({ project, onClick }) => {
//   return (
//     <div
//       onClick={() => onClick(project)}
//       className="relative p-6 rounded-3xl bg-white/80 shadow-2xl border border-white backdrop-blur-lg hover:shadow-indigo-200 transition-shadow duration-300 cursor-pointer"
//     >
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold text-gray-800">{project.name}</h2>

//         <div
//           className={`px-3 py-1 text-xs font-bold rounded-full ${
//             statusClasses[project.status]
//           }`}
//         >
//           {project.status}
//         </div>
//       </div>
//       <div className="relative group">
//         <p className="text-sm text-gray-700 font-medium bg-indigo-50 px-3 py-1 rounded-full w-fit shadow transition duration-300">
//           {project.description.length > 10
//             ? `${project.description.slice(0, 10)}...`
//             : project.description}
//         </p>
//         <span className="absolute hidden group-hover:flex z-10 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg top-full left-0 mt-1 w-max max-w-xs">
//           {project.description}
//         </span>
//       </div>

//       <div className="flex items-center text-sm text-gray-500 mt-3 mb-2">
//         <FiCalendar className="mr-2" />
//         {new Date(project.deadline).toLocaleDateString("en-GB")}
//       </div>

//       <div
//         className={`inline-block px-3 py-1 text-xs rounded-full font-semibold ${
//           priorityClasses[project.priority]
//         } mb-4`}
//       >
//         Priority: {project.priority}
//       </div>

//       <div className="flex items-center gap-2">
//         <FiUsers className="text-gray-500" />
//         <div className="flex -space-x-3">
//           {project.team.map((member) => (
//             <img
//               key={member._id}
//               src={member.avatar}
//               alt={member.name}
//               title={member.name}
//               className="w-8 h-8 rounded-full border-2 border-gray-500 shadow-md"
//             />
//           ))}
//         </div>
//       </div>

//       <div className="absolute -top-4 -right-4 w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center border-4 border-indigo-200">
//         <div className="text-sm font-bold text-indigo-700">
//           {project.progress}%
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectCard;


import React from "react";
import { FiCalendar, FiUsers } from "react-icons/fi";

const statusClasses = {
  Completed: "bg-emerald-200 text-emerald-900 dark:bg-emerald-700 dark:text-white",
  "In Progress": "bg-yellow-200 text-yellow-900 dark:bg-yellow-600 dark:text-white",
  Pending: "bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-white",
  "On Hold": "bg-blue-200 text-blue-900 dark:bg-blue-600 dark:text-white",
  Cancelled: "bg-red-200 text-red-900 dark:bg-red-600 dark:text-white",
};

const priorityClasses = {
  Low: "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-white",
  Medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-white",
  High: "bg-orange-100 text-orange-800 dark:bg-orange-600 dark:text-white",
  Critical: "bg-red-100 text-red-800 dark:bg-red-700 dark:text-white",
};

const ProjectCard = ({ project, onClick }) => {
  return (
    <div
      onClick={() => onClick(project)}
      className="relative p-6 rounded-3xl bg-white/80 dark:bg-gray-900/80 shadow-2xl border border-white dark:border-gray-800 backdrop-blur-lg hover:shadow-indigo-200 transition-shadow duration-300 cursor-pointer"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">{project.name}</h2>
        <div
          className={`px-3 py-1 text-xs font-bold rounded-full ${
            statusClasses[project.status]
          }`}
        >
          {project.status}
        </div>
      </div>

      {/* Description Tooltip */}
      <div className="relative group">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-200 bg-indigo-50 dark:bg-indigo-800 px-3 py-1 rounded-full w-fit shadow transition duration-300">
          {project.description.length > 10
            ? `${project.description.slice(0, 10)}...`
            : project.description}
        </p>
        <span className="absolute hidden group-hover:flex z-10 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg top-full left-0 mt-1 w-max max-w-xs">
          {project.description}
        </span>
      </div>

      {/* Deadline */}
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-3 mb-2">
        <FiCalendar className="mr-2" />
        {new Date(project.deadline).toLocaleDateString("en-GB")}
      </div>

      {/* Priority */}
      <div
        className={`inline-block px-3 py-1 text-xs rounded-full font-semibold ${
          priorityClasses[project.priority]
        } mb-4`}
      >
        Priority: {project.priority}
      </div>

      {/* Team */}
      <div className="flex items-center gap-2">
        <FiUsers className="text-gray-500 dark:text-gray-400" />
        <div className="flex -space-x-3">
          {project.team.map((member) => (
            <img
              key={member._id}
              src={member.avatar}
              alt={member.name}
              title={member.name}
              className="w-8 h-8 rounded-full border-2 border-gray-500 dark:border-gray-300 shadow-md"
            />
          ))}
        </div>
      </div>

      {/* Progress badge */}
      <div className="absolute -top-4 -right-4 w-14 h-14 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center border-4 border-indigo-200 dark:border-indigo-600">
        <div className="text-sm font-bold text-indigo-700 dark:text-indigo-300">
          {project.progress}%
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
