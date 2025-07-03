import React from "react";
import { FiLayout, FiTable, FiFilter } from "react-icons/fi";

const Filters = ({ filters, setFilters, viewMode, setViewMode }) => {
  const priorities = ["Low", "Medium", "High"];
  const statuses = ["To Do", "In Progress", "Done"];

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-6 px-2">
      {/* Filter Dropdowns */}
      <div className="flex flex-wrap gap-4 items-center">
        <span className="flex items-center gap-2 text-gray-600 font-medium">
          <FiFilter className="text-indigo-500" />
          Filters:
        </span>

        <select
          value={filters.priority}
          onChange={(e) =>
            setFilters((f) => ({ ...f, priority: e.target.value }))
          }
          className="px-4 py-2 rounded-full border border-gray-300 shadow-sm bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="">All Priorities</option>
          {priorities.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>

        <select
          value={filters.status}
          onChange={(e) =>
            setFilters((f) => ({ ...f, status: e.target.value }))
          }
          className="px-4 py-2 rounded-full border border-gray-300 shadow-sm bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="">All Statuses</option>
          {statuses.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* View Switcher */}
      <div className="flex gap-3 mt-2 lg:mt-0">
        <button
          onClick={() => setViewMode("kanban")}
          className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition ${
            viewMode === "kanban"
              ? "bg-indigo-600 text-white shadow"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <FiLayout />
          Kanban
        </button>
        <button
          onClick={() => setViewMode("table")}
          className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition ${
            viewMode === "table"
              ? "bg-indigo-600 text-white shadow"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <FiTable />
          Table
        </button>
      </div>
    </div>
  );
};

export default Filters;
