import React from "react";
import {
  FiUser,
  FiMail,
  FiAward,
  FiLinkedin,
  FiGithub,
  FiCode,
  FiCalendar,
  FiUserCheck,
} from "react-icons/fi";

const ClientProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const member = user?.linkedMember;

  const leaveData = { total: 20, used: 5 };
  const holidays = [
    { _id: 1, name: "Independence Day", date: "2025-08-15" },
    { _id: 2, name: "Ganesh Chaturthi", date: "2025-09-05" },
  ];

  return (
    <div className="flex flex-col items-center  px-6 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {/* Left Profile Card */}
        <div className="col-span-1 bg-white/80 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-3xl p-10 relative overflow-hidden">
          <div className="absolute w-60 h-60 bg-indigo-300 rounded-full blur-3xl opacity-20 -top-24 -left-24"></div>
          <div className="absolute w-60 h-60 bg-pink-400 rounded-full blur-3xl opacity-20 -bottom-24 -right-24"></div>

          <div className="flex flex-col items-center text-center relative z-10">
            <img
              src={`https://i.pravatar.cc/150?u=${member?._id}`}
              alt="Avatar"
              className="w-28 h-28 rounded-full border-4 border-white shadow-xl mb-4"
            />
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <FiUser /> {member?.name || "Client Name"}
            </h1>
            <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
              <FiMail /> {member?.email || "example@email.com"}
            </p>
            <p className="text-xs text-gray-500 mt-1">ID: {member?._id}</p>

            <div className="mt-4 flex flex-wrap gap-4 justify-center text-sm">
              <span className="bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full flex items-center gap-2 shadow">
                <FiAward /> Role: <strong>{user?.role}</strong>
              </span>
              <span className="bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full flex items-center gap-2 shadow">
                <FiCode /> Frontend Developer
              </span>
            </div>

            <div className="mt-4 flex gap-4 text-indigo-600 text-xl">
              <a href="#" className="hover:text-indigo-800 transition">
                <FiLinkedin />
              </a>
              <a href="#" className="hover:text-indigo-800 transition">
                <FiGithub />
              </a>
            </div>
          </div>
        </div>

        {/* Right Cards */}
        <div className="col-span-1 lg:col-span-2 grid md:grid-cols-2 gap-6">
          {/* Leave Card */}
          <div className="bg-white shadow-xl rounded-2xl p-6 border-t-4 border-indigo-500 hover:shadow-2xl transition duration-300">
            <h3 className="text-lg font-semibold text-indigo-700 mb-4 flex items-center gap-2">
              <FiUserCheck className="text-xl" /> Leave Status
            </h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li><strong>Total Leaves:</strong> {leaveData.total}</li>
              <li><strong>Used:</strong> {leaveData.used}</li>
              <li><strong>Remaining:</strong> {leaveData.total - leaveData.used}</li>
            </ul>
          </div>

          {/* Holidays Card */}
          <div className="bg-white shadow-xl rounded-2xl p-6 border-t-4 border-pink-400 hover:shadow-2xl transition duration-300">
            <h3 className="text-lg font-semibold text-pink-700 mb-4 flex items-center gap-2">
              <FiCalendar className="text-xl" /> Upcoming Holidays
            </h3>
            <ul className="text-sm text-gray-700 space-y-3">
              {holidays.map((holiday) => (
                <li key={holiday._id} className="flex justify-between border-b pb-1">
                  <span>{holiday.name}</span>
                  <span className="text-gray-500">
                    {new Date(holiday.date).toLocaleDateString("en-IN")}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;
