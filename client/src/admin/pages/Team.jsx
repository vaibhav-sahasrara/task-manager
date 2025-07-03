import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { FiPlus } from "react-icons/fi";

const Team = () => {
  const [team, setTeam] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [filters, setFilters] = useState({
    role: "",
    status: "",
    expertise: "",
  });

  const [selectedMember, setSelectedMember] = useState(null);
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    role: "",
    avatar: "",
    phone: "",
    expertise: "",
    pastProjects: "",
    isActive: true,
  });

  const fetchTeam = async () => {
    try {
      const token = localStorage.getItem("token"); // or wherever you store it

      const res = await axios.get("http://localhost:5000/api/team", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTeam(res.data);
    } catch (err) {
      console.error(
        "Failed to fetch team members",
        err.response?.data || err.message
      );
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const filteredTeam = team.filter((member) => {
    const matchesRole = filters.role
      ? member.role.toLowerCase().includes(filters.role.toLowerCase())
      : true;
    const matchesStatus = filters.status
      ? filters.status === "active"
        ? member.isActive
        : !member.isActive
      : true;
    const matchesExpertise = filters.expertise
      ? member.expertise.some((skill) =>
          skill.toLowerCase().includes(filters.expertise.toLowerCase())
        )
      : true;
    return matchesRole && matchesStatus && matchesExpertise;
  });

  const handleAddMember = async () => {
    try {
      const payload = {
        ...newMember,
        expertise: newMember.expertise.split(",").map((e) => e.trim()),
        pastProjects: newMember.pastProjects.split(",").map((p) => p.trim()),
      };
      await axios.post("http://localhost:5000/api/team", payload);
      setShowModal(false);
      setNewMember({
        name: "",
        email: "",
        role: "",
        avatar: "",
        phone: "",
        expertise: "",
        pastProjects: "",
        isActive: true,
      });
      fetchTeam();
    } catch (err) {
      console.error("Error adding member:", err);
    }
  };

  const handleEdit = (member) => {
    setNewMember({
      ...member,
      expertise: member.expertise.join(", "),
      pastProjects: member.pastProjects.join(", "),
    });
    setSelectedMember(null); // close profile view
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/team/${id}`);
      setSelectedMember(null);
      fetchTeam();
    } catch (err) {
      console.error("Error deleting member:", err);
    }
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token"); // ✅ get the token here

      const payload = {
        ...newMember,
        expertise: newMember.expertise.split(",").map((e) => e.trim()),
        pastProjects: newMember.pastProjects.split(",").map((p) => p.trim()),
      };

      if (editMode) {
        await axios.put(
          `http://localhost:5000/api/team/${newMember._id}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`, // ✅ include this
            },
          }
        );
      } else {
        await axios.post(`http://localhost:5000/api/team`, payload, {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ include this
          },
        });
      }

      setShowModal(false);
      setEditMode(false);
      setNewMember({
        name: "",
        email: "",
        role: "",
        avatar: "",
        phone: "",
        expertise: "",
        pastProjects: "",
        isActive: true,
      });
      fetchTeam();
    } catch (err) {
      console.error("Error saving member:", err);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-600 ">Our Team</h2>
      {/* <p className="text-gray-500">The people behind the magic.</p> */}

      {/* Filter Bar */}
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Filter by Role"
          className="px-4 py-2 border rounded-md"
          value={filters.role}
          onChange={(e) => setFilters({ ...filters, role: e.target.value })}
        />
        <select
          className="px-4 py-2 border rounded-md"
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All Status</option>
          <option value="active">Working</option>
          <option value="inactive">Inactive</option>
        </select>
        <input
          type="text"
          placeholder="Filter by Expertise"
          className="px-4 py-2 border rounded-md"
          value={filters.expertise}
          onChange={(e) =>
            setFilters({ ...filters, expertise: e.target.value })
          }
        />
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredTeam.map((member, index) => (
          <motion.div
            key={member._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`rounded-3xl shadow-xl p-5 text-center hover:scale-105 transition transform duration-300 
    ${
      !member.avatar || !member.expertise.length || !member.pastProjects.length
        ? "bg-red-100 border border-red-300"
        : "bg-gradient-to-br from-indigo-100 to-white"
    }
  `}
          >
            <img
              src={member.avatar || "https://i.pravatar.cc/150?img=1"}
              alt={member.name}
              className="w-24 h-24 mx-auto rounded-full border-4 border-indigo-300 mb-3"
            />
            <h3 className="text-xl font-semibold text-gray-800">
              {member.name}
            </h3>
            <p className="text-sm text-indigo-600">{member.role}</p>
            <p className="text-xs text-gray-500">{member.email}</p>

            {/* View Profile Button */}
            <button
              className="mt-4 px-4 py-1.5 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 text-sm"
              onClick={() => setSelectedMember(member)}
            >
              View Profile
            </button>

            {/* Conditionally show Update Profile if incomplete */}
            {(!member.avatar ||
              !member.expertise.length ||
              !member.pastProjects.length) && (
              <button
                className="mt-2 px-4 py-1.5 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 text-sm"
                onClick={() => {
                  setEditMode(true);
                  handleEdit(member);
                }}
              >
                Update Profile
              </button>
            )}
          </motion.div>
        ))}
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed top-8 right-6 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full shadow-lg transition-all duration-300"
      >
        <FiPlus className="text-2xl" />
      </button>

      {/* Add Member Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0  flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ type: "spring", bounce: 0.3 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative"
            >
              <button
                className="absolute top-2 right-3 text-gray-400 hover:text-red-500 text-2xl"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
              <h3 className="text-xl font-semibold mb-4">Add New Member</h3>
              <div className="grid grid-cols-2 gap-4">
                {["name", "email", "role", "phone"].map((field) => (
                  <input
                    key={field}
                    type="text"
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    className="px-4 py-2 border rounded-md"
                    value={newMember[field]}
                    onChange={(e) =>
                      setNewMember({ ...newMember, [field]: e.target.value })
                    }
                  />
                ))}
                <input
                  type="text"
                  placeholder="Avatar URL"
                  className="col-span-2 px-4 py-2 border rounded-md"
                  value={newMember.avatar}
                  onChange={(e) =>
                    setNewMember({ ...newMember, avatar: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Expertise (comma-separated)"
                  className="col-span-2 px-4 py-2 border rounded-md"
                  value={newMember.expertise}
                  onChange={(e) =>
                    setNewMember({ ...newMember, expertise: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Past Projects (comma-separated)"
                  className="col-span-2 px-4 py-2 border rounded-md"
                  value={newMember.pastProjects}
                  onChange={(e) =>
                    setNewMember({ ...newMember, pastProjects: e.target.value })
                  }
                />
                <label className="col-span-2 flex gap-2 items-center text-sm">
                  <input
                    type="checkbox"
                    checked={newMember.isActive}
                    onChange={() =>
                      setNewMember({
                        ...newMember,
                        isActive: !newMember.isActive,
                      })
                    }
                  />
                  Currently Working
                </label>
              </div>
              <button
                onClick={handleSubmit}
                className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md"
              >
                {editMode ? "Update Member" : "Save Member"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Profile Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50  flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              {/* Header with Avatar */}
              <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 h-32 relative">
                <button
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-3 right-4 text-white text-2xl hover:text-red-300"
                >
                  &times;
                </button>
                <div className="absolute left-1/2 -bottom-12 transform -translate-x-1/2">
                  <img
                    src={selectedMember.avatar}
                    alt={selectedMember.name}
                    className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="pt-16 px-6 pb-6 text-center">
                <h3 className="text-xl font-semibold text-gray-800">
                  {selectedMember.name}
                </h3>
                <p className="text-sm text-indigo-600">{selectedMember.role}</p>
                <p className="text-xs text-gray-500">{selectedMember.email}</p>
                <p className="text-xs text-gray-500 mb-4">
                  {selectedMember.phone}
                </p>

                {/* Expertise */}
                <div className="text-left mb-4">
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Expertise:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.expertise.map((skill, i) => (
                      <span
                        key={i}
                        className="bg-indigo-100 text-indigo-700 px-2 py-1 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Past Projects */}
                <div className="text-left mb-4">
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Past Projects:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.pastProjects.map((proj, i) => (
                      <span
                        key={i}
                        className="bg-pink-100 text-pink-700 px-2 py-1 text-xs rounded-full"
                      >
                        {proj}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Status */}
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-600">Status:</p>
                  <span
                    className={`text-sm font-semibold ${
                      selectedMember.isActive
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {selectedMember.isActive ? "Working" : "Inactive"}
                  </span>
                </div>

                <div className="mt-4 flex justify-center gap-4">
                  <button
                    onClick={() => handleEdit(selectedMember)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-full text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(selectedMember._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-full text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Team;
