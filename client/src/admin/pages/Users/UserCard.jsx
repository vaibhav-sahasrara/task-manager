
import React, { useState } from "react";
import { FaUserShield, FaUserTie, FaUser, FaTrash } from "react-icons/fa";
import ConfirmModal from "../../components/common/ConfirmModal";

const roleIcons = {
  admin: <FaUserShield className="text-red-500" />,
  employee: <FaUserTie className="text-blue-500" />,
  client: <FaUser className="text-green-500" />,
};

const roleColors = {
  admin: "bg-red-100 text-red-600",
  employee: "bg-blue-100 text-blue-600",
  client: "bg-green-100 text-green-600",
};

const UserCard = ({ user, toggleUserStatus, deleteUser }) => {
  const [showDelete, setShowDelete] = useState(false);

  return (
    <>
      <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
        <div className="flex items-center gap-4">
          <div className="text-3xl">{roleIcons[user.role]}</div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              {user.name}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {user.email}
            </p>
          </div>

          {/* Delete icon (hidden for self or admins, adjust as you like) */}
          {user.role !== "admin" && (
            <button
              onClick={() => setShowDelete(true)}
              className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition"
            >
              <FaTrash className="text-red-500" />
            </button>
          )}
        </div>

        {/* …existing info rows & toggle button… */}
        {/* (unchanged code omitted for brevity) */}
        {/* Toggle status button */}
        <div className="mt-4 space-y-2 text-sm">
          <div>
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-medium capitalize ${
                roleColors[user.role]
              }`}
            >
              {user.role}
            </span>
          </div>
          <div className="text-gray-600 dark:text-gray-300">
            <strong>Approved:</strong>{" "}
            <span
              className={user.isApproved ? "text-green-500" : "text-red-500"}
            >
              {user.isApproved ? "Yes" : "No"}
            </span>
          </div>
          <div className="text-gray-600 dark:text-gray-300">
            <strong>Status:</strong>{" "}
            <span className={user.isActive ? "text-green-500" : "text-red-500"}>
              {user.isActive ? "Active" : "Deactivated"}
            </span>
          </div>
          <div className="text-gray-600 dark:text-gray-300">
            <strong>Joined:</strong>{" "}
            {new Date(user.createdAt).toLocaleDateString("en-GB")}
          </div>
        </div>
        <button
          onClick={() => toggleUserStatus(user._id, !user.isActive)}
          className={`mt-4 w-full px-4 py-2 rounded-lg text-sm font-semibold shadow-sm ${
            user.isActive
              ? "bg-red-100 text-red-600 hover:bg-red-200"
              : "bg-green-100 text-green-600 hover:bg-green-200"
          }`}
        >
          {user.isActive ? "Deactivate" : "Activate"}
        </button>
      </div>

      {/* Confirmation modal */}
      <ConfirmModal
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={() => deleteUser(user._id)}
        title="Delete User"
        message={`Delete ${user.name}'s account? This cannot be undone.`}
      />
    </>
  );
};

export default UserCard;
