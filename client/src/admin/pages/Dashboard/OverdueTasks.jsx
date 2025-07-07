import { FiAlertTriangle } from "react-icons/fi";

export default function OverdueTasks({ stats }) {
  if (!stats || !stats.overdueTasks) return null;

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-md font-semibold text-red-700 flex items-center gap-2 mb-2">
        <FiAlertTriangle /> Overdue Tasks
      </h2>

      {stats.overdueTasks.length === 0 ? (
        <p className="text-sm text-gray-500">🎉 No overdue tasks!</p>
      ) : (
        <ul className="text-sm text-red-800 space-y-2">
          {stats.overdueTasks.map((task) => (
            <li key={task._id} className="border-b pb-2">
              <p className="font-semibold">{task.name}</p>
              <p className="text-xs">
                Assigned to: {task.assignee?.label || "Unassigned"}
                <span className="ml-2 text-gray-500">
                  (Due {new Date(task.deadline).toLocaleDateString("en-IN")})
                </span>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
