// client/pages/ClientReports.jsx
import React from "react";

const dummyReports = [
  {
    id: 1,
    title: "Sprint 1 Summary",
    date: "2025-07-01",
    status: "Completed",
    summary: "Design and development of landing pages.",
  },
  {
    id: 2,
    title: "Issue Log - Payment Flow",
    date: "2025-07-06",
    status: "Pending",
    summary: "Reported payment bug during checkout on mobile view.",
  },
];

const ClientReports = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-indigo-700">
        Project Reports
      </h2>
      <div className="space-y-4">
        {dummyReports.map((report) => (
          <div
            key={report.id}
            className="p-4 bg-white shadow-md rounded-lg border border-gray-100"
          >
            <h3 className="text-md font-bold text-gray-800">{report.title}</h3>
            <p className="text-sm text-gray-500 mb-1">{report.date}</p>
            <p className="text-sm text-gray-700">{report.summary}</p>
            <span
              className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${
                report.status === "Completed"
                  ? "bg-green-100 text-green-600"
                  : "bg-yellow-100 text-yellow-600"
              }`}
            >
              {report.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientReports;
