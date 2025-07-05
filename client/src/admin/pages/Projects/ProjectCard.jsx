 import React from "react";
import { FiCalendar, FiUsers } from "react-icons/fi";

const statusClasses = {
  Completed: "bg-emerald-200 text-emerald-900",
  "In Progress": "bg-yellow-200 text-yellow-900",
  Pending: "bg-gray-200 text-gray-800",
  "On Hold": "bg-blue-200 text-blue-900",
  Cancelled: "bg-red-200 text-red-900",
};

const priorityClasses = {
  Low: "bg-gray-100 text-gray-700",
  Medium: "bg-yellow-100 text-yellow-800",
  High: "bg-orange-100 text-orange-800",
  Critical: "bg-red-100 text-red-800",
};

const ProjectCard = ({ project, onClick }) => {
  return (
    <div
      onClick={() => onClick(project)}
      className="relative p-6 rounded-3xl bg-white/80 shadow-2xl border border-white backdrop-blur-lg hover:shadow-indigo-200 transition-shadow duration-300 cursor-pointer"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">{project.name}</h2>
        <div
          className={`px-3 py-1 text-xs font-bold rounded-full ${statusClasses[project.status]}`}
        >
          {project.status}
        </div>
      </div>

      <div className="flex items-center text-sm text-gray-500 mb-2">
        <FiCalendar className="mr-2" />
        {new Date(project.deadline).toLocaleDateString("en-GB")}
      </div>

      <div
        className={`inline-block px-3 py-1 text-xs rounded-full font-semibold ${priorityClasses[project.priority]} mb-4`}
      >
        Priority: {project.priority}
      </div>

      <div className="flex items-center gap-2">
        <FiUsers className="text-gray-500" />
        <div className="flex -space-x-3">
          {project.team.map((member) => (
            <img
              key={member._id}
              src={member.avatar}
              alt={member.name}
              title={member.name}
              className="w-8 h-8 rounded-full border-2 border-white shadow-md"
            />
          ))}
        </div>
      </div>

      <div className="absolute -top-4 -right-4 w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center border-4 border-indigo-200">
        <div className="text-sm font-bold text-indigo-700">{project.progress}%</div>
      </div>
    </div>
  );
};

export default ProjectCard;