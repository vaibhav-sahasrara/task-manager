import express from "express";
import {
  register,
  login,
  getClients,
  getAllUsers,
  deleteUser,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";
import { auth, verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/clients", getClients);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.delete("/:userId", auth, deleteUser);

router.get("/users", auth, getAllUsers);

export default router;
