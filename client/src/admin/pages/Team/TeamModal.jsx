import React from "react";
import { motion, AnimatePresence } from "framer-motion";
// import axios from "axios";
import axios from "../../../utils/axiosInstance"; 

const TeamModal = ({
  showModal,
  setShowModal,
  editMode,
  newMember,
  setNewMember,
  fetchTeam,
}) => {
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      const payload = {
        ...newMember,
        expertise: newMember.expertise.split(",").map((e) => e.trim()),
        pastProjects: newMember.pastProjects.split(",").map((p) => p.trim()),
      };

      if (editMode) {
        await axios.put(
          `/api/team/${newMember._id}`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post("/api/team", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

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
      console.error("Error saving member:", err);
    }
  };

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-30"
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
            <h3 className="text-xl font-semibold mb-4">
              {editMode ? "Edit Member" : "Add New Member"}
            </h3>
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
  );
};

export default TeamModal;
