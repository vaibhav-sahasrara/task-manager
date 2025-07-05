// MilestoneList.jsx
import React from "react";

const MilestoneList = ({ milestones = [] }) => {
  if (!milestones.length) return null;

  return (
    <div className="mt-4">
      <h3 className="text-md font-semibold text-gray-700 mb-2">Milestones:</h3>
      <ul className="space-y-2">
        {milestones.map((m) => (
          <li key={m._id} className="p-3 rounded-lg bg-gray-50 shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{m.title}</p>
                <p className="text-sm text-gray-600">{m.description}</p>
                <p className="text-xs text-gray-500">
                  Due: {new Date(m.dueDate).toLocaleDateString("en-GB")}
                </p>
              </div>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded ${
                  m.completed
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {m.completed ? "Completed" : "Pending"}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MilestoneList;
