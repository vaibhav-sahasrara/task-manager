// import React, { useEffect, useState } from "react";
// import axios from "../../utils/axiosInstance";

// import { FiUserCheck, FiMail } from "react-icons/fi";

// const PendingUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [selectedRoles, setSelectedRoles] = useState({});
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchPendingUsers = async () => {
//       try {
//         const res = await axios.get(
//           "/api/admin/pending-users",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setUsers(res.data);

//         // Initialize role selectors with default role
//         const defaultRoles = {};
//         res.data.forEach((u) => (defaultRoles[u._id] = u.role || "employee"));
//         setSelectedRoles(defaultRoles);
//       } catch (err) {
//         console.error("Failed to fetch pending users", err);
//       }
//     };

//     fetchPendingUsers();
//   }, []);

//   const handleRoleChange = (id, role) => {
//     setSelectedRoles((prev) => ({ ...prev, [id]: role }));
//   };

//   const approveUser = async (id) => {
//     const role = selectedRoles[id];
//     try {
//       await axios.put(
//         `/api/admin/approve-user/${id}`,
//         { role },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setUsers((prev) => prev.filter((u) => u._id !== id));
//     } catch (err) {
//       console.error("Failed to approve user", err);
//     }
//   };

//   return (
//     <div className="p-1">
//       <h2 className="text-xl font-bold text-indigo-700 mb-4">Pending Users</h2>

//       {users.length === 0 ? (
//         <div className="text-center text-gray-500">No pending users.</div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {users.map((user) => (
//             <div
//               key={user._id}
//               className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-sm rounded-xl p-4 hover:shadow-md transition"
//             >
//               <div className="flex items-center gap-3 mb-3">
//                 <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 font-bold flex items-center justify-center text-sm">
//                   {user.name?.charAt(0).toUpperCase()}
//                 </div>
//                 <div>
//                   <p className="font-medium text-gray-800 text-sm">
//                     {user.name}
//                   </p>
//                   <p className="text-xs text-gray-500 flex items-center gap-1">
//                     <FiMail className="text-gray-400" /> {user.email}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex justify-between items-center mb-3">
//                 <select
//                   className="border px-2 py-1 text-sm rounded bg-white"
//                   value={selectedRoles[user._id]}
//                   onChange={(e) => handleRoleChange(user._id, e.target.value)}
//                 >
//                   <option value="employee">Employee</option>
//                   <option value="client">Client</option>
//                   <option value="admin">Admin</option>
//                 </select>
//               </div>

//               <button
//                 onClick={() => approveUser(user._id)}
//                 className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1.5 rounded-full transition"
//               >
//                 <FiUserCheck /> Approve
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PendingUsers;

import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import { FiUserCheck, FiMail } from "react-icons/fi";

const PendingUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPendingUsers = async () => {
      try {
        const res = await axios.get("/api/admin/pending-users", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsers(res.data);

        const defaultRoles = {};
        res.data.forEach((u) => (defaultRoles[u._id] = u.role || "employee"));
        setSelectedRoles(defaultRoles);
      } catch (err) {
        console.error("Failed to fetch pending users", err);
      }
    };

    fetchPendingUsers();
  }, []);

  const handleRoleChange = (id, role) => {
    setSelectedRoles((prev) => ({ ...prev, [id]: role }));
  };

  const approveUser = async (id) => {
    const role = selectedRoles[id];
    try {
      await axios.put(
        `/api/admin/approve-user/${id}`,
        { role },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      console.error("Failed to approve user", err);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
        Pending Users
      </h1>

      {users.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400">
          No pending users.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white dark:bg-[#1e293b] backdrop-blur-md border border-gray-200 dark:border-gray-600 shadow-sm rounded-xl p-4 hover:shadow-md transition"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 font-bold flex items-center justify-center text-sm">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-white text-sm">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <FiMail className="text-gray-400 dark:text-gray-500" />{" "}
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center mb-3">
                <select
                  className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-100 px-2 py-1 rounded"
                  value={selectedRoles[user._id]}
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                >
                  <option value="employee">Employee</option>
                  <option value="client">Client</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <button
                onClick={() => approveUser(user._id)}
                className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1.5 rounded-full transition"
              >
                <FiUserCheck /> Approve
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingUsers;
