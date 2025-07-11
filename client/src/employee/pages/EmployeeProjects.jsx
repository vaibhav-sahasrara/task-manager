// import React, { useEffect, useState } from "react";
// import axios from "../../utils/axiosInstance";
// import { FiFolder, FiUsers, FiCalendar } from "react-icons/fi";

// const EmployeeProjects = () => {
//   const [projects, setProjects] = useState([]);
//   const [userId, setUserId] = useState(null);

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) {
//       const id = storedUser.linkedMember?._id || storedUser._id;
//       setUserId(id);
//     }
//   }, []);

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const res = await axios.get(`/api/projects/user/${userId}`);
//         setProjects(res.data);
//       } catch (err) {
//         console.error("❌ Failed to fetch projects", err);
//       }
//     };

//     if (userId) {
//       fetchProjects();
//     }
//   }, [userId]);

//   if (!userId) {
//     return (
//       <div className="text-red-500 text-center py-10">
//         User not found. Please log in again.
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-bold text-indigo-700 flex items-center gap-2">
//         Your Projects
//       </h1>

//       {projects.length === 0 ? (
//         <div className="bg-white rounded-xl p-6 shadow text-center text-gray-500">
//           No projects assigned yet.
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {projects.map((project) => (
//             <div
//               key={project._id}
//               className="bg-white p-5 rounded-xl shadow hover:shadow-md border border-gray-100 transition"
//             >
//               <h2 className="text-lg font-semibold text-indigo-800 mb-1">
//                 {project.name}
//               </h2>
//               <p className="text-sm text-gray-600 mb-3 line-clamp-3">
//                 {project.description}
//               </p>

//               <div className="text-sm space-y-1">
//                 <p>
//                   <strong>Status:</strong>{" "}
//                   <span className="text-indigo-600">{project.status}</span>
//                 </p>
//                 <p>
//                   <strong>Priority:</strong>{" "}
//                   <span
//                     className={`${
//                       project.priority === "High"
//                         ? "text-red-600"
//                         : project.priority === "Medium"
//                         ? "text-yellow-600"
//                         : "text-green-600"
//                     } font-semibold`}
//                   >
//                     {project.priority}
//                   </span>
//                 </p>
//                 <p className="flex items-center gap-1 text-gray-500">
//                   <FiCalendar />
//                   {new Date(project.deadline).toLocaleDateString("en-GB")}
//                 </p>

//                 {/* Team Members */}
//                 <div className="flex items-start gap-2 mt-2">
//                   <FiUsers className="text-gray-500 mt-1" />
//                   <div className="space-y-1">
//                     {project.team.length === 0 ? (
//                       <span className="text-gray-500">No team assigned</span>
//                     ) : (
//                       project.team.map((member) => (
//                         <div
//                           key={member._id}
//                           className="flex items-center gap-2"
//                         >
//                           <span className="text-indigo-800 font-medium">
//                             {member.name}
//                           </span>
//                         </div>
//                       ))
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default EmployeeProjects;




import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import { FiFolder, FiUsers, FiCalendar } from "react-icons/fi";

const EmployeeProjects = () => {
  const [projects, setProjects] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      const id = storedUser.linkedMember?._id || storedUser._id;
      setUserId(id);
    }
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`/api/projects/user/${userId}`);
        setProjects(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch projects", err);
      }
    };

    if (userId) {
      fetchProjects();
    }
  }, [userId]);

  if (!userId) {
    return (
      <div className="text-red-500 text-center py-10 dark:text-red-400">
        User not found. Please log in again.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-indigo-700 dark:text-yellow-300 flex items-center gap-2">
        Your Projects
      </h1>

      {projects.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow text-center text-gray-500 dark:text-gray-400">
          No projects assigned yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-white dark:bg-gray-900 p-5 rounded-xl shadow hover:shadow-md border border-gray-100 dark:border-gray-700 transition"
            >
              <h2 className="text-lg font-semibold text-indigo-800 dark:text-yellow-300 mb-1">
                {project.name}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-3">
                {project.description}
              </p>

              <div className="text-sm space-y-1">
                <p>
                  <strong className="text-gray-700 dark:text-gray-300">Status:</strong>{" "}
                  <span className="text-indigo-600 dark:text-yellow-400">{project.status}</span>
                </p>
                <p>
                  <strong className="text-gray-700 dark:text-gray-300">Priority:</strong>{" "}
                  <span
                    className={`${
                      project.priority === "High"
                        ? "text-red-600 dark:text-red-400"
                        : project.priority === "Medium"
                        ? "text-yellow-600 dark:text-yellow-400"
                        : "text-green-600 dark:text-green-400"
                    } font-semibold`}
                  >
                    {project.priority}
                  </span>
                </p>
                <p className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                  <FiCalendar />
                  {new Date(project.deadline).toLocaleDateString("en-GB")}
                </p>

                {/* Team Members */}
                <div className="flex items-start gap-2 mt-2">
                  <FiUsers className="text-gray-500 dark:text-gray-400 mt-1" />
                  <div className="space-y-1">
                    {project.team.length === 0 ? (
                      <span className="text-gray-500 dark:text-gray-400">No team assigned</span>
                    ) : (
                      project.team.map((member) => (
                        <div
                          key={member._id}
                          className="flex items-center gap-2"
                        >
                          <span className="text-indigo-800 dark:text-yellow-300 font-medium">
                            {member.name}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeProjects;
