import { FiArrowRightCircle } from "react-icons/fi";

export default function RecentActivity({ recentActivities }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <FiArrowRightCircle /> Recent Activity
      </h2>
      <ul className="space-y-3 text-sm text-gray-700">
        {recentActivities.length === 0 ? (
          <li className="text-gray-400">No recent tasks</li>
        ) : (
          recentActivities.map((task) => (
            <li key={task._id} className="flex items-center gap-2">
              <span className="text-blue-500">🆕</span>
              Task <strong>{task.name}</strong> was added / updated
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
