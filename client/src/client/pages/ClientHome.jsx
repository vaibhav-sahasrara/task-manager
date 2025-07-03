import React from 'react';

const ClientHome = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow">
        <h1 className="text-xl font-semibold text-gray-800">
          Welcome, {user?.name || 'Client'} 👋
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Here’s your current work overview.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow hover:shadow-md transition">
          <div className="bg-blue-100 text-blue-600 p-3 rounded-full text-lg">📁</div>
          <div>
            <div className="text-sm text-gray-500">Active Projects</div>
            <div className="text-xl font-semibold text-gray-800">2</div>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow hover:shadow-md transition">
          <div className="bg-green-100 text-green-600 p-3 rounded-full text-lg">✅</div>
          <div>
            <div className="text-sm text-gray-500">Tasks Completed</div>
            <div className="text-xl font-semibold text-gray-800">14</div>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow hover:shadow-md transition">
          <div className="bg-yellow-100 text-yellow-600 p-3 rounded-full text-lg">⏳</div>
          <div>
            <div className="text-sm text-gray-500">Pending Tasks</div>
            <div className="text-xl font-semibold text-gray-800">5</div>
          </div>
        </div>
      </div>

      {/* Recent Updates */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Recent Updates</h2>
        <ul className="space-y-3 text-sm text-gray-700">
          <li className="flex items-center gap-2">
            <span className="text-green-500">✔</span> Completed task "<strong>UI bug fix</strong>" on Project A
          </li>
          <li className="flex items-center gap-2">
            <span className="text-blue-500">🆕</span> Assigned to new task "<strong>Prepare report</strong>"
          </li>
          <li className="flex items-center gap-2">
            <span className="text-yellow-500">📅</span> Deadline for "<strong>Dashboard redesign</strong>" is approaching
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ClientHome;
