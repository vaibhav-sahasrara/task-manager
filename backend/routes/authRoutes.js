import express from "express";
import {
  register,
  login,
  getClients,
  getAllUsers,
  deleteUser,
} from "../controllers/authController.js";
import { auth, verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/clients", getClients);
// router.get("/", authMiddleware, getAllUsers);
// router.get("/users", auth, verifyAdmin, getAllUsers);
// router.delete("/:userId", deleteUser);
router.delete("/:userId", auth, deleteUser);

router.get("/users", auth, getAllUsers);

export default router;
