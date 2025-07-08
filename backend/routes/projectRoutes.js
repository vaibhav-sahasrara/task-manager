// import express from "express";
// import {
//   createProject,
//   getAllProjects,
//   getProjectById,
//   updateProject,
//   deleteProject,
//   getProjectsByUser,
//   getProjectProgress,
// } from "../controllers/projectController.js";

// const router = express.Router();

// // /api/projects
// router.post("/", createProject);
// router.get("/", getAllProjects);
// router.get("/user/:userId", getProjectsByUser);
// router.get("/:id", getProjectById);
// router.put("/:id", updateProject);
// router.delete("/:id", deleteProject);
// router.get("/progress", getProjectProgress);

// export default router;



import express from "express";
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getProjectsByUser,
  getProjectProgress,
} from "../controllers/projectController.js";

const router = express.Router();

// ✅ Static routes first
router.get("/progress", getProjectProgress);
router.get("/user/:userId", getProjectsByUser);

// ✅ Then dynamic and CRUD routes
router.post("/", createProject);
router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;
