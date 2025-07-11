import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
// import { notifyAdmin } from "../utils/mailer.js";
import TeamMember from "../models/TeamMember.js";


export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "client",
    });

    // 📧 Notify admin
    // await notifyAdmin(user);

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ error: "User already exists or invalid data" });
  }
};

// GET /api/users/clients

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).populate(
      "linkedMember",
      "name email"
    );
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    // ❌ Block deactivated users
    if (!user.isActive) {
      return res.status(403).json({
        error: "Your account has been deactivated. Please contact admin.",
      });
    }

    // Check approval status
    if (!user.isApproved) {
      return res.status(403).json({
        error: "Your account is pending admin approval. Please wait.",
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        linkedMember: user.linkedMember || null, // 👈 Include here
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
};

export const getClients = async (req, res) => {
  try {
    const clients = await User.find({ role: "client" });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch clients", error });
  }
};

// GET /api/users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // exclude password field
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users", error: err });
  }
};

// DELETE a user  ──────────────────────────────────────────────────────────────
export const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    // 1️⃣  Find the user first (so we have access to linkedMember)
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // 2️⃣  Remove any associated TeamMember profile
    if (user.linkedMember) {
      await TeamMember.findByIdAndDelete(user.linkedMember);
    } else {
      // Fallback in case linkedMember wasn’t set but a profile exists
      await TeamMember.findOneAndDelete({ userRef: userId });
    }

    // 3️⃣  Delete the user account itself
    await User.findByIdAndDelete(userId);

    // 4️⃣  OPTIONAL: Clean up other collections (tasks, comments, etc.)
    // TODO: await Task.deleteMany({ assignees: userId });
    // TODO: await Comment.deleteMany({ author: userId });
    // …add more as needed

    res.status(200).json({ message: "User and related profile deleted" });
  } catch (err) {
    console.error("❌ Failed to delete user:", err);
    res.status(500).json({ error: "Failed to delete user" });
  }
};
