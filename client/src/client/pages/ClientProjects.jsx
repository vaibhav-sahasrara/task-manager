import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiFolder, FiUsers, FiCalendar } from "react-icons/fi";

const ClientProjects = () => {
  const [projects, setProjects] = useState([]);
  const userId = "685fd114fe9bfd36ab1ec0cc";

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/projects/user/${userId}`
        );
        setProjects(res.data);
      } catch (err) {
        console.error("Failed to fetch projects", err);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-indigo-700 flex items-center gap-2">
        <FiFolder /> Your Projects
      </h1>

      {projects.length === 0 ? (
        <p className="text-gray-400">No projects assigned yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-white border border-indigo-100 shadow-lg rounded-2xl p-5 hover:shadow-indigo-200 transition"
            >
              <h2 className="text-xl font-semibold text-indigo-800 mb-2">
                {project.name}
              </h2>
              <p className="text-sm text-gray-600 mb-3">
                {project.description}
              </p>

              <div className="text-sm space-y-1">
                <p>
                  <strong>Status:</strong>{" "}
                  <span className="text-indigo-600">{project.status}</span>
                </p>
                <p>
                  <strong>Priority:</strong>{" "}
                  <span
                    className={`font-semibold ${
                      project.priority === "High"
                        ? "text-red-600"
                        : project.priority === "Medium"
                        ? "text-yellow-600"
                        : "text-green-600"
                    }`}
                  >
                    {project.priority}
                  </span>
                </p>
                <p className="flex items-center gap-1">
                  <FiCalendar className="text-gray-500" />{" "}
                  {new Date(project.deadline).toLocaleDateString("en-GB")}
                </p>
                <p className="flex items-center gap-1">
                  <FiUsers className="text-gray-500" />
                  {project.team.map((member) => member.name).join(", ") ||
                    "No Team"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientProjects;
