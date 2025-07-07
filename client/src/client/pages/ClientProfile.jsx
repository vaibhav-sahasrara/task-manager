import React from "react";
import {
  FiUser,
  FiMail,
  FiAward,
  FiLinkedin,
  FiGithub,
  FiCode,
} from "react-icons/fi";

const ClientProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const member = user?.linkedMember;

  return (
      <div className=" space-y-6">
      <div className="backdrop-blur-md bg-white/70 border border-white/30 shadow-xl rounded-3xl w-full max-w-3xl p-8 relative overflow-hidden">

        {/* Decorative blurred circles */}
        <div className="absolute w-48 h-48 bg-indigo-200 rounded-full blur-3xl opacity-30 -top-16 -left-16"></div>
        <div className="absolute w-48 h-48 bg-pink-200 rounded-full blur-3xl opacity-30 -bottom-16 -right-16"></div>

        {/* Profile Header */}
        <div className="flex items-center gap-6 z-10 relative">
          <img
            src={`https://i.pravatar.cc/150?u=${member?._id}`}
            alt="Avatar"
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <FiUser /> {member?.name || "Client Name"}
            </h1>
            <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
              <FiMail /> {member?.email}
            </p>
            <p className="text-xs text-gray-400 mt-1">ID: {member?._id}</p>
          </div>
        </div>

        {/* Role + Skills */}
        <div className="mt-6 flex flex-wrap gap-3 text-sm z-10 relative">
          <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full flex items-center gap-2">
            <FiAward /> Role: <strong>{user?.role}</strong>
          </span>
          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full flex items-center gap-2">
            <FiCode /> Expertise: Frontend Developer
          </span>
        </div>

        {/* Bio/About */}
        <div className="mt-6 z-10 relative">
          <h3 className="text-sm font-semibold text-gray-700 mb-1">About</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            A creative frontend developer with experience in React, Tailwind CSS,
            and UI/UX best practices. Dedicated to building seamless, accessible interfaces and collaborating with product teams.
          </p>
        </div>

        {/* Social Links */}
        <div className="mt-6 flex gap-4 text-indigo-600 text-xl z-10 relative">
          <a href="#" className="hover:text-indigo-800 transition">
            <FiLinkedin />
          </a>
          <a href="#" className="hover:text-indigo-800 transition">
            <FiGithub />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;
