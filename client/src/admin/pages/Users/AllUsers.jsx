// import React, { useEffect, useState } from "react";
// import axios from "../../../utils/axiosInstance";
// import UserCard from "./UserCard";
// import UserFilters from "./UserFilters";

// const AllUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [filteredRole, setFilteredRole] = useState("");

//   const token = localStorage.getItem("token");
//   const config = { headers: { Authorization: `Bearer ${token}` } };

//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get("/api/auth/users", config);
//       setUsers(res.data);
//     } catch (err) {
//       console.error("❌ Failed to fetch users", err);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const filteredUsers = filteredRole
//     ? users.filter((u) => u.role === filteredRole)
//     : users;

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold text-gray-700">All Users</h1>
//         <UserFilters selectedRole={filteredRole} onChange={setFilteredRole} />
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//         {filteredUsers.map((user) => (
//           <UserCard key={user._id} user={user} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AllUsers;



import React, { useEffect, useState } from "react";
import axios from "../../../utils/axiosInstance";
import UserCard from "./UserCard";
import UserFilters from "./UserFilters";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredRole, setFilteredRole] = useState("");

  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/api/auth/users", config);
      setUsers(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch users", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = filteredRole
    ? users.filter((u) => u.role === filteredRole)
    : users;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">All Users</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage and view all registered users by role.</p>
        </div>
        <UserFilters selectedRole={filteredRole} onChange={setFilteredRole} />
      </div>

      {filteredUsers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
          No users found for selected role.
        </div>
      )}
    </div>
  );
};

export default AllUsers;
