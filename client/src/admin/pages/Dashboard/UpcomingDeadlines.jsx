import { FiClock } from "react-icons/fi";

export default function UpcomingDeadlines({ stats, getPriorityBadge }) {
  if (!stats || !stats.upcomingDeadlines) return null;

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <FiClock /> Upcoming Deadlines
      </h2>
      <ul className="space-y-3 text-sm text-gray-700">
        {stats.upcomingDeadlines.length === 0 ? (
          <li className="text-gray-400">No upcoming tasks</li>
        ) : (
          stats.upcomingDeadlines.map((task) => (
            <li
              key={task._id}
              className="flex justify-between items-center border-b pb-2"
            >
              <div className="flex flex-col gap-1">
                <div className="font-semibold text-gray-800">{task.name}</div>
                <div className="text-xs text-gray-500">
                  Assigned to: {task.assignee?.label || "Unassigned"}
                </div>
                {getPriorityBadge(task.priority)}
              </div>
              <div className="text-right text-sm text-gray-600">
                {new Date(task.deadline).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
