import React from "react";
import { motion } from "framer-motion";
import {
  FiFolder,
  FiCheckCircle,
  FiClock,
  FiUsers,
  FiArrowRightCircle,
} from "react-icons/fi";

const dummyStats = [
  {
    title: "Total Projects",
    value: 12,
    icon: <FiFolder />,
    color: "from-purple-500 to-indigo-500",
  },
  {
    title: "Completed Tasks",
    value: 48,
    icon: <FiCheckCircle />,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Pending Tasks",
    value: 7,
    icon: <FiClock />,
    color: "from-yellow-500 to-orange-500",
  },
  {
    title: "Team Members",
    value: 5,
    icon: <FiUsers />,
    color: "from-pink-500 to-rose-500",
  },
];

const ClientHome = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome back 👋</h2>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dummyStats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-gradient-to-r ${stat.color} text-white p-5 rounded-xl shadow-md flex items-center justify-between`}
          >
            <div>
              <p className="text-sm font-medium">{stat.title}</p>
              <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
            </div>
            <div className="text-3xl opacity-70">{stat.icon}</div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity (dummy) */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          Recent Activity
        </h3>
        <div className="bg-white rounded-xl shadow p-4 space-y-3">
          {[
            "You were assigned a new task: 'Design Login Page'",
            "Project 'Marketing Site' marked as completed",
            "3 new comments on 'Dashboard UI'",
            "You joined the 'Website Revamp' team",
          ].map((activity, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between text-sm text-gray-600"
            >
              <span>{activity}</span>
              <FiArrowRightCircle className="text-indigo-500" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientHome;
