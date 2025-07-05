import express from "express";
// import auth from '../middleware/auth.js';
import authorizeRoles from "../middleware/authorizeRoles.js";

const router = express.Router();

// Only accessible to admins
router.get("/admin-data", authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Admin-only data" });
});

// Only accessible to clients
router.get("/client-data", authorizeRoles("client"), (req, res) => {
  res.json({ message: "Client-only data" });
});

export default router;
