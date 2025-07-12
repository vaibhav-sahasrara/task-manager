// import React from "react";
// import MilestoneList from "./MilestoneList";


// const ProjectModal = ({ project, onClose }) => {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg relative animate-fadeIn">
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-xl font-bold"
//         >
//           ×
//         </button>
//         <h2 className="text-2xl font-bold mb-3">{project.name}</h2>
//         <p className="text-sm text-gray-600 mb-4">
//           {project.description || "No description provided."}
//         </p>
//         <div className="mb-4 space-y-1 text-sm text-gray-700">
//           <p>
//             <strong>Status:</strong> {project.status}
//           </p>
//           <p>
//             <strong>Priority:</strong> {project.priority}
//           </p>
//           <p>
//             <strong>Deadline:</strong> {new Date(project.deadline).toLocaleDateString("en-GB")}
//           </p>
//           <p>
//             <strong>Progress:</strong> {project.progress}%
//           </p>
//         </div>
//         <div className="mb-4">
//           <strong className="text-gray-500">Owner:</strong>{" "}
//           {project.owner ? (
//             <span className="flex items-center mt-1 gap-2">
//               <img
//                 src={project.owner.avatar}
//                 className="w-8 h-8 rounded-full"
//                 alt="owner"
//               />
//               <span>{project.owner.name}</span>
//             </span>
//           ) : (
//             "Not assigned"
//           )}
//         </div>
//         <div className="mb-2">
//           <strong className="text-gray-500">Team Members:</strong>
//           {project.team.length === 0 ? (
//             <p className="text-sm text-gray-500 mt-1">No team members assigned.</p>
//           ) : (
//             <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
//               {project.team.map((member) => (
//                 <div
//                   key={member._id}
//                   className="flex flex-col items-center text-center"
//                 >
//                   <img
//                     src={member.avatar}
//                     alt={member.name}
//                     className="w-10 h-10 rounded-full border border-white shadow"
//                   />
//                   <span className="text-xs text-gray-700 mt-1">
//                     {member.name}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//         <MilestoneList milestones={project.milestones} />
//       </div>
//     </div>
//   );
// };

// export default ProjectModal;


import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MilestoneList from "./MilestoneList";

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50  flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white rounded-2xl shadow-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto relative"
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-xl font-bold"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold mb-3">{project.name}</h2>

            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              {project.description || "No description provided."}
            </p>

            <div className="mb-4 space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <p>
                <strong>Status:</strong> {project.status}
              </p>
              <p>
                <strong>Priority:</strong> {project.priority}
              </p>
              <p>
                <strong>Deadline:</strong>{" "}
                {new Date(project.deadline).toLocaleDateString("en-GB")}
              </p>
              <p>
                <strong>Progress:</strong> {project.progress}%
              </p>
            </div>

            <div className="mb-4">
              <strong className="text-gray-500 dark:text-gray-400">Owner:</strong>{" "}
              {project.owner ? (
                <span className="flex items-center mt-1 gap-2">
                  <img
                    src={project.owner.avatar}
                    className="w-8 h-8 rounded-full"
                    alt={project.owner.name}
                  />
                  <span>{project.owner.name}</span>
                </span>
              ) : (
                "Not assigned"
              )}
            </div>

            <div className="mb-4">
              <strong className="text-gray-500 dark:text-gray-400">Team Members:</strong>
              {project.team.length === 0 ? (
                <p className="text-sm text-gray-500 mt-1">No team members assigned.</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
                  {project.team.map((member) => (
                    <div
                      key={member._id}
                      className="flex flex-col items-center text-center"
                    >
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-10 h-10 rounded-full border border-white shadow"
                      />
                      <span className="text-xs mt-1">{member.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <MilestoneList milestones={project.milestones} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
