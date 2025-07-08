// import React, { useState, useEffect } from "react";
// // import axios from "axios";
// import axios from "../../../utils/axiosInstance";

// import { FiPlus } from "react-icons/fi";
// import { motion, AnimatePresence } from "framer-motion";
// import TeamCard from "./TeamCard";
// import TeamModal from "./TeamModal";
// import ProfileModal from "./ProfileModal";
// import FilterBar from "./FilterBar";

// const Team = () => {
//   const [team, setTeam] = useState([]);
//   const [filters, setFilters] = useState({
//     role: "",
//     status: "",
//     expertise: "",
//   });
//   const [showModal, setShowModal] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [selectedMember, setSelectedMember] = useState(null);
//   const [newMember, setNewMember] = useState({
//     name: "",
//     email: "",
//     role: "",
//     avatar: "",
//     phone: "",
//     expertise: "",
//     pastProjects: "",
//     isActive: true,
//   });

//   const fetchTeam = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.get("/api/team", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTeam(res.data);
//     } catch (err) {
//       console.error(
//         "Failed to fetch team members",
//         err.response?.data || err.message
//       );
//     }
//   };

//   useEffect(() => {
//     fetchTeam();
//   }, []);

//   const filteredTeam = team.filter((member) => {
//     const matchesRole = filters.role
//       ? member.role?.toLowerCase().includes(filters.role.toLowerCase())
//       : true;
//     const matchesStatus = filters.status
//       ? filters.status === "active"
//         ? member.isActive
//         : !member.isActive
//       : true;
//     const matchesExpertise = filters.expertise
//       ? member.expertise?.some((skill) =>
//           skill.toLowerCase().includes(filters.expertise.toLowerCase())
//         )
//       : true;
//     return matchesRole && matchesStatus && matchesExpertise;
//   });

//   const handleEdit = (member) => {
//     setNewMember({
//       ...member,
//       expertise: member.expertise.join(", "),
//       pastProjects: member.pastProjects.join(", "),
//     });
//     setEditMode(true);
//     setSelectedMember(null);
//     setShowModal(true);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this member?")) return;
//     try {
//       await axios.delete(`/api/team/${id}`);
//       setSelectedMember(null);
//       fetchTeam();
//     } catch (err) {
//       console.error("Error deleting member:", err);
//     }
//   };

//   return (
//     <div className="space-y-8">
//       <h2 className="text-2xl font-bold text-gray-600">Our Team</h2>
//       <FilterBar filters={filters} setFilters={setFilters} />

//       {/* Team Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
//         {filteredTeam.map((member, index) => (
//           <TeamCard
//             key={member._id}
//             member={member}
//             index={index}
//             onView={() => setSelectedMember(member)}
//             onUpdate={() => handleEdit(member)}
//           />
//         ))}
//       </div>

//       <button
//         onClick={() => {
//           setEditMode(false);
//           setNewMember({
//             name: "",
//             email: "",
//             role: "",
//             avatar: "",
//             phone: "",
//             expertise: "",
//             pastProjects: "",
//             isActive: true,
//           });
//           setShowModal(true);
//         }}
//         className="fixed top-8 right-6 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full shadow-lg"
//       >
//         <FiPlus className="text-2xl" />
//       </button>

//       {/* Modals */}
//       <TeamModal
//         showModal={showModal}
//         setShowModal={setShowModal}
//         editMode={editMode}
//         newMember={newMember}
//         setNewMember={setNewMember}
//         fetchTeam={fetchTeam}
//       />

//       <ProfileModal
//         selectedMember={selectedMember}
//         setSelectedMember={setSelectedMember}
//         onEdit={handleEdit}
//         onDelete={handleDelete}
//       />
//     </div>
//   );
// };

// export default Team;



import React, { useState, useEffect } from "react";
import axios from "../../../utils/axiosInstance";
import { FiPlus } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

import TeamCard from "./TeamCard";
import TeamModal from "./TeamModal";
import ProfileModal from "./ProfileModal";
import FilterBar from "./FilterBar";

const Team = () => {
  const [team, setTeam] = useState([]);
  const [filters, setFilters] = useState({
    role: "",
    status: "",
    expertise: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
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
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/team", {
        headers: { Authorization: `Bearer ${token}` },
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
      ? member.role?.toLowerCase().includes(filters.role.toLowerCase())
      : true;
    const matchesStatus = filters.status
      ? filters.status === "active"
        ? member.isActive
        : !member.isActive
      : true;
    const matchesExpertise = filters.expertise
      ? member.expertise?.some((skill) =>
          skill.toLowerCase().includes(filters.expertise.toLowerCase())
        )
      : true;
    return matchesRole && matchesStatus && matchesExpertise;
  });

  const handleEdit = (member) => {
    setNewMember({
      ...member,
      expertise: member.expertise.join(", "),
      pastProjects: member.pastProjects.join(", "),
    });
    setEditMode(true);
    setSelectedMember(null);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;
    try {
      await axios.delete(`/api/team/${id}`);
      setSelectedMember(null);
      fetchTeam();
    } catch (err) {
      console.error("Error deleting member:", err);
    }
  };

  return (
    <div className="space-y-8 text-gray-800 dark:text-gray-100">
      <h2 className="text-2xl font-bold text-gray-700 dark:text-white">
        Our Team
      </h2>

      <FilterBar filters={filters} setFilters={setFilters} />

      {/* Team Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredTeam.map((member, index) => (
          <TeamCard
            key={member._id}
            member={member}
            index={index}
            onView={() => setSelectedMember(member)}
            onUpdate={() => handleEdit(member)}
          />
        ))}
      </div>

      {/* Add Member Floating Button */}
      <button
        onClick={() => {
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
          setShowModal(true);
        }}
        className="fixed top-8 right-6 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full shadow-lg"
      >
        <FiPlus className="text-2xl" />
      </button>

      {/* Modals */}
      <TeamModal
        showModal={showModal}
        setShowModal={setShowModal}
        editMode={editMode}
        newMember={newMember}
        setNewMember={setNewMember}
        fetchTeam={fetchTeam}
      />

      <ProfileModal
        selectedMember={selectedMember}
        setSelectedMember={setSelectedMember}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Team;
