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
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-700">All Users</h1>
        <UserFilters selectedRole={filteredRole} onChange={setFilteredRole} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredUsers.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
