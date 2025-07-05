import React from "react";
import { FaUserShield, FaUserTie, FaUser } from "react-icons/fa";

const roleIcons = {
  admin: <FaUserShield className="text-red-500" />,
  employee: <FaUserTie className="text-blue-500" />,
  client: <FaUser className="text-green-500" />,
};

const UserCard = ({ user }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 space-y-2 hover:shadow-lg transition">
      <div className="flex items-center gap-3">
        <div className="text-2xl">{roleIcons[user.role]}</div>
        <div>
          <h2 className="text-lg font-semibold text-gray-700">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      <div className="text-sm text-gray-600 mt-2">
        <p>
          <strong>Role:</strong> {user.role}
        </p>
        <p>
          <strong>Approved:</strong>{" "}
          <span className={user.isApproved ? "text-green-600" : "text-red-500"}>
            {user.isApproved ? "Yes" : "No"}
          </span>
        </p>
        <p>
          <strong>Joined:</strong>{" "}
          {new Date(user.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
