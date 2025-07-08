// import React from "react";
// import { FaUserShield, FaUserTie, FaUser } from "react-icons/fa";

// const roleIcons = {
//   admin: <FaUserShield className="text-red-500" />,
//   employee: <FaUserTie className="text-blue-500" />,
//   client: <FaUser className="text-green-500" />,
// };

// const UserCard = ({ user }) => {
//   return (
//     <div className="bg-white shadow-md rounded-xl p-5 space-y-2 hover:shadow-lg transition">
//       <div className="flex items-center gap-3">
//         <div className="text-2xl">{roleIcons[user.role]}</div>
//         <div>
//           <h2 className="text-lg font-semibold text-gray-700">{user.name}</h2>
//           <p className="text-sm text-gray-500">{user.email}</p>
//         </div>
//       </div>

//       <div className="text-sm text-gray-600 mt-2">
//         <p>
//           <strong>Role:</strong> {user.role}
//         </p>
//         <p>
//           <strong>Approved:</strong>{" "}
//           <span className={user.isApproved ? "text-green-600" : "text-red-500"}>
//             {user.isApproved ? "Yes" : "No"}
//           </span>
//         </p>
//         <p>
//           <strong>Joined:</strong>{" "}
//           {new Date(user.createdAt).toLocaleDateString()}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default UserCard;



import React from "react";
import { FaUserShield, FaUserTie, FaUser } from "react-icons/fa";

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

const UserCard = ({ user }) => {
  return (
    <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-4">
        <div className="text-3xl">{roleIcons[user.role]}</div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{user.name}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
        </div>
      </div>

      <div className="mt-4 space-y-2 text-sm">
        <div>
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium capitalize ${roleColors[user.role]}`}>
            {user.role}
          </span>
        </div>
        <div className="text-gray-600 dark:text-gray-300">
          <strong>Approved:</strong>{" "}
          <span className={user.isApproved ? "text-green-500" : "text-red-500"}>
            {user.isApproved ? "Yes" : "No"}
          </span>
        </div>
        <div className="text-gray-600 dark:text-gray-300">
          <strong>Joined:</strong>{" "}
          {new Date(user.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
