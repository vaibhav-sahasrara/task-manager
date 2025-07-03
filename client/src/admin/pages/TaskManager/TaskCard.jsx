// import React from "react";
// import { FiEdit, FiTrash2 } from "react-icons/fi";

// // Priority-based Tailwind classes
// const priorityColors = {
//   Low: "bg-green-50 border-l-4 border-green-400",
//   Medium: "bg-yellow-50 border-l-4 border-yellow-400",
//   High: "bg-red-50 border-l-4 border-red-400",
// };

// const TaskCard = ({
//   task,
//   innerRef,
//   dragHandleProps,
//   draggableProps,
//   onEdit,
//   onDelete,
// }) => {
//   const priorityClass = priorityColors[task.priority] || "bg-gray-50 border";

//   return (
//     <div
//       ref={innerRef}
//       {...dragHandleProps}
//       {...draggableProps}
//       className={`rounded-xl p-4 mb-3 shadow hover:shadow-md transition ${priorityClass}`}
//     >
//       <div className="flex justify-between items-start">
//         <div>
//           <h3 className="font-bold text-indigo-800">{task.name}</h3>
//           <p className="text-sm text-gray-600 mt-1">
//             {task.description || "No description"}
//           </p>

//           <p className="text-sm text-gray-700 mt-1">
//             <strong>Start Date:</strong>{" "}
//             {new Date(task.startDate).toLocaleDateString("en-GB")}
//           </p>
//           <p className="text-sm text-gray-700 mt-1">
//             <strong>Deadline:</strong>{" "}
//             {new Date(task.deadline).toLocaleDateString("en-GB")}
//           </p>
//           <p className="text-sm text-gray-600 mt-1">
//             <strong>Assignees:</strong>{" "}
//             {(task.assignees || []).map((a) => a.label).join(", ")}
//           </p>
//           <span className="inline-block mt-2 text-xs px-3 py-1 rounded-full bg-white border text-gray-700">
//             Priority: {task.priority}
//           </span>
//         </div>

//         <div className="flex gap-2 mt-1">
//           <button
//             onClick={onEdit}
//             className="text-blue-500 hover:text-blue-700"
//           >
//             <FiEdit />
//           </button>
//           <button
//             onClick={onDelete}
//             className="text-red-500 hover:text-red-700"
//           >
//             <FiTrash2 />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TaskCard;

import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { BsTag } from "react-icons/bs";

const priorityStyles = {
  High: {
    card: "bg-red-50 border-red-200",
    badge: "bg-gradient-to-r from-red-500 to-red-600 text-white",
    progress: "from-red-400 to-red-600",
  },
  Medium: {
    card: "bg-yellow-50 border-yellow-200",
    badge: "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white",
    progress: "from-yellow-400 to-yellow-600",
  },
  Low: {
    card: "bg-green-50 border-green-200",
    badge: "bg-gradient-to-r from-green-400 to-green-500 text-white",
    progress: "from-green-400 to-green-600",
  },
  Default: {
    card: "bg-gray-50 border-gray-200",
    badge: "bg-gradient-to-r from-gray-400 to-gray-600 text-white",
    progress: "from-indigo-400 to-indigo-600",
  },
};

const TaskCard = ({
  task,
  innerRef,
  dragHandleProps,
  draggableProps,
  onEdit,
  onDelete,
}) => {
  const priority = task.priority || "Default";
  const styles = priorityStyles[priority] || priorityStyles.Default;

  return (
    <div
      ref={innerRef}
      {...dragHandleProps}
      {...draggableProps}
      className={`rounded-xl border ${styles.card} shadow hover:shadow-lg p-3 transform hover:scale-[1.01] transition-all duration-300 mb-3`}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-800">{task.name}</h3>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="text-blue-500 hover:text-blue-700 transition"
          >
            <FiEdit size={16} />
          </button>
          <button
            onClick={onDelete}
            className="text-red-500 hover:text-red-700 transition"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
        {task.description || "No description available."}
      </p>

      {/* Dates */}
      <div className="flex flex-wrap gap-6 text-xs text-gray-600 font-medium mb-2">
        <div>
          📅 Start: {new Date(task.startDate).toLocaleDateString("en-GB")}
        </div>
        <div>
          ⏳ Deadline: {new Date(task.deadline).toLocaleDateString("en-GB")}
        </div>
      </div>

      {/* Assignees */}
      {task.assignees?.length > 0 && (
        <div className="flex items-center gap-2 mb-3 text-sm text-gray-700">
          <FaUser className="text-gray-500" size={12} />
          {(task.assignees || []).map((a) => a.label).join(", ")}
        </div>
      )}

      {/* Tags */}
      {task.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {task.tags.map((tag, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 px-3 py-1 text-xs bg-indigo-100 text-indigo-700 rounded-full"
            >
              <BsTag size={12} />
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${styles.progress} transition-all duration-500`}
            style={{ width: `${task.progress || 0}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Progress: {task.progress || 0}%
        </p>
      </div>

      {/* Priority Chip */}
      <div
        className={`inline-block mt-1 text-xs px-3 py-1 rounded-full shadow-sm font-semibold tracking-wide ${styles.badge}`}
      >
        {task.priority}
      </div>
    </div>
  );
};

export default TaskCard;
