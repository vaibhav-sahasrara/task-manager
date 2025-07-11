import express from "express";
import {
  getAllTeamMembers,
  createTeamMember,
  createTeamMemberFromUser,
  getTeamMemberById,
  updateTeamMember,
  deleteTeamMember,
  // getUnlinkedUsers,
} from "../controllers/teamMemberController.js";

import { verifyToken, verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

// Normal routes
router.get("/", verifyToken, getAllTeamMembers);
router.post("/", verifyToken, verifyAdmin, createTeamMember);

// 🔒 Create from user flow
router.post(
  "/create-from-user/:userId",
  verifyToken,
  verifyAdmin,
  createTeamMemberFromUser
);

// router.post('/unlinked-users', verifyToken, verifyAdmin, getUnlinkedUsers);
router.get("/:id", verifyToken, getTeamMemberById);
router.put("/:id", verifyToken, verifyAdmin, updateTeamMember);
router.delete("/:id", verifyToken, verifyAdmin, deleteTeamMember);

export default router;
