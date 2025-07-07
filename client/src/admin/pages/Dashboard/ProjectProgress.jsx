import { FiTrendingUp } from "react-icons/fi";

export default function ProjectProgress({ stats }) {
  if (!stats || !stats.projectProgress?.length) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow text-center border border-dashed border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700 flex items-center justify-center gap-2">
          <FiTrendingUp /> Project Progress
        </h2>
        <p className="text-sm text-gray-500 mt-2">No projects available yet.</p>
      </div>
    );
  }

  const getProgressColor = (value) => {
    if (value >= 75) return "from-green-400 to-green-600";
    if (value >= 40) return "from-yellow-300 to-yellow-500";
    return "from-red-400 to-red-600";
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow  border border-gray-100">
      <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <FiTrendingUp className="text-indigo-500" /> Project Progress
      </h2>
      <div className="space-y-6">
        {stats.projectProgress.map((proj) => (
          <div key={proj.value} className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700 truncate max-w-[70%]">
                {proj.label}
              </span>
              <span
                className={`text-xs font-semibold ${
                  proj.progress >= 75
                    ? "text-green-600"
                    : proj.progress >= 40
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {proj.progress}%
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${getProgressColor(
                  proj.progress
                )} transition-all duration-500`}
                style={{ width: `${proj.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
