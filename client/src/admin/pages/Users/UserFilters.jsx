import React from "react";

const UserFilters = ({ selectedRole, onChange }) => {
  return (
    <select
      className="border border-gray-300 rounded-xl px-3 py-2 text-sm"
      value={selectedRole}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">All Roles</option>
      <option value="admin">Admin</option>
      <option value="employee">Employee</option>
      <option value="client">Client</option>
    </select>
  );
};

export default UserFilters;
