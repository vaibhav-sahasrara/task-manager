import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiPlus } from "react-icons/fi";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";
import ProjectModal from "./ProjectModal";

const initialForm = {
  name: "",
  description: "",
  deadline: "",
  status: "In Progress",
  priority: "Medium",
  owner: "",
  team: [],
  milestones: [], 
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [teamList, setTeamList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(initialForm);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [ownerOptions, setOwnerOptions] = useState([]);
  useEffect(() => {
    fetchProjects();
    fetchTeam();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/projects");
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTeam = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/team", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTeamList(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/clients")
      .then((res) => {
        const options = res.data.map((client) => ({
          value: client._id,
          label: client.name,
        }));
        setOwnerOptions(options);
      })
      .catch(console.error);
  }, []);

  const openModal = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setShowModal(false);
  };

  const handleFormSubmit = async (data) => {
    try {
      await axios.post("http://localhost:5000/api/projects", data);
      fetchProjects();
      setFormData(initialForm);
      setShowAddForm(false);
    } catch (err) {
      console.error("Error adding project:", err);
    }
  };
  const teamOptions = teamList.map((member) => ({
    value: member._id,
    label: member.name,
  }));

  // const ownerOptions = teamList
  //   .filter((member) => member.role?.toLowerCase().includes("client"))
  //   .map((member) => ({
  //     value: member._id,
  //     label: member.name,
  //   }));

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-600">Projects</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-5 py-2 flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium shadow-lg"
        >
          <FiPlus /> New Project
        </button>
      </div>

      {/* {showAddForm && (
        <ProjectForm
          teamList={teamList}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setFormData(initialForm);
            setShowAddForm(false);
          }}
        />
      )} */}

      {showAddForm && (
        <ProjectForm
          formData={formData}
          setFormData={setFormData}
          teamOptions={teamOptions}
          ownerOptions={ownerOptions}
          onCancel={() => {
            setShowAddForm(false);
            setFormData(initialForm);
          }}
          onSubmit={(e) => {
            e.preventDefault();
            handleFormSubmit(formData);
          }}
        />
      )}

      {loading ? (
        <div className="text-center text-gray-400">Loading projects...</div>
      ) : projects.length === 0 ? (
        <div className="text-center text-gray-400">No projects found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onClick={() => openModal(project)}
            />
          ))}
        </div>
      )}

      {showModal && selectedProject && (
        <ProjectModal project={selectedProject} onClose={closeModal} />
      )}
    </div>
  );
};

export default Projects;
