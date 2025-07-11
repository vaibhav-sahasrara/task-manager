import express from "express";
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats,
  getTaskById,
  getTasksForClientUser,
  updateTaskStatus,
} from "../controllers/taskController.js";
import { auth } from "../middleware/auth.js"; 

const router = express.Router();

router.get("/", getAllTasks);
router.get("/stats", getTaskStats);
router.post("/", createTask);
// router.put("/:id", updateTask);
router.put("/:id", auth, updateTask);
router.delete("/:id", deleteTask);
router.get("/:id", getTaskById);
router.patch("/:id/status", auth, updateTaskStatus);

router.get("/client-tasks/:userId", getTasksForClientUser);
import User from "../models/User.js";

router.get("/debug-user/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
});

export default router;
