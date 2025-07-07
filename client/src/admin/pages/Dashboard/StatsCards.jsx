import { FiUsers, FiClipboard, FiCheckCircle } from "react-icons/fi";

export default function StatsCards({ projects, tasks, team, stats }) {
  const completedTasks = tasks.filter((t) =>
    ["Done", "Completed"].includes(t.status)
  );

  return (
    <div className="grid gap-6 md:grid-cols-4">
      <Card
        icon={<FiClipboard />}
        label="Total Projects"
        count={projects.length}
        color="indigo"
      />
      <Card
        icon={<FiCheckCircle />}
        label="Tasks Completed"
        count={completedTasks.length}
        color="green"
      />
      <Card
        icon={<FiUsers />}
        label="Team Members"
        count={team.length}
        color="yellow"
      />
      {stats?.completionRate !== undefined && (
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm font-medium text-gray-700 mb-1">
            Completion Rate
          </p>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-indigo-500 h-full rounded-full"
              style={{ width: `${stats.completionRate}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {stats.completionRate}% of tasks completed
          </p>
        </div>
      )}
    </div>
  );
}

function Card({ icon, label, count, color }) {
  return (
    <div className="flex items-center gap-4 p-5 bg-white rounded-xl shadow hover:shadow-md transition">
      <div
        className={`bg-${color}-100 text-${color}-600 p-3 rounded-full text-xl`}
      >
        {icon}
      </div>
      <div>
        <div className="text-sm text-gray-500">{label}</div>
        <div className="text-2xl font-bold text-gray-800">{count}</div>
      </div>
    </div>
  );
}
