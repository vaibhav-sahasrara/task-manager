import React from "react";
import { NavLink } from "react-router-dom";
import {
  FiGrid,
  FiFolder,
  FiUsers,
  FiBell,
  FiLogOut,
  FiMenu,
} from "react-icons/fi";

const navItems = [
  { label: "Dashboard", icon: <FiGrid />, path: "/client/dashboard" },
  { label: "My Projects", icon: <FiFolder />, path: "/client/projects" },
  { label: "Team", icon: <FiUsers />, path: "/client/team" },
  { label: "Notifications", icon: <FiBell />, path: "/client/notifications" },
   { label: "Notifications", icon: <FiBell />, path: "/client/discussions" },
    { label: "Notifications", icon: <FiBell />, path: "/client/reports" },
];

const ClientSidebar = ({ isOpen = true, toggleSidebar }) => {
  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen border-r transition-all duration-300 
        bg-gradient-to-b from-indigo-800 via-violet-700 to-fuchsia-700 text-white shadow-lg backdrop-blur-md
        ${isOpen ? "w-60" : "w-16"}`}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-white/20">
        <h1
          className={`text-lg font-bold tracking-wider transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          Client
        </h1>
        <button onClick={toggleSidebar} className="text-white text-lg">
          <FiMenu />
        </button>
      </div>

      {/* Nav */}
      <nav className="p-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all 
              ${
                isActive
                  ? "bg-white/20 text-white"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            {isOpen && item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default ClientSidebar;
