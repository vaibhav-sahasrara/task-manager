import express from 'express';
import {
  getEmployeeReport,
  getEmployeeSummary,
  getTeamComparison,
} from '../controllers/reportController.js';
import { auth } from '../middleware/auth.js';
// import { authorizeRoles } from '../middleware/authorizeRoles.js';
// routes/reportRoutes.js
import authorizeRoles from '../middleware/authorizeRoles.js';



const router = express.Router();

// Employee views their own report
router.get('/me', auth, getEmployeeReport);

// Admin/manager views a specific employee
router.get('/:userId', auth, authorizeRoles('admin', 'manager'), getEmployeeReport);

// Lightweight widget data
router.get('/:userId/summary', auth, authorizeRoles('admin', 'manager'), getEmployeeSummary);

// Admin comparison chart
router.get('/compare/team', auth, authorizeRoles('admin'), getTeamComparison);

export default router;
