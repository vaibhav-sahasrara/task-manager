import express from "express";
import Notification from "../models/Notification.js";
import { auth } from "../middleware/auth.js";
import { getNotifications } from "../controllers/taskController.js";

const router = express.Router();

// ✅ USE THIS — only this!
router.get("/", auth, getNotifications);

router.patch("/:id/read", auth, async (req, res) => {
  await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
  res.json({ message: "Marked as read" });
});

export default router;
