import express from 'express';
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getProjectsByUser,
} from '../controllers/projectController.js';

const router = express.Router();

// /api/projects
router.post('/', createProject);
router.get('/', getAllProjects);
router.get('/user/:userId', getProjectsByUser);
router.get('/:id', getProjectById);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

export default router;
