import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from "crypto";
// import { notifyAdmin } from "../utils/mailer.js";
import TeamMember from "../models/TeamMember.js";
import { sendMail } from "../utils/mailer.js";

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

console.log("📧 Email:", process.env.EMAIL_USER);
console.log("🔑 Pass:", process.env.EMAIL_PASS ? "Loaded" : "Missing");

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

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/auth/forgot-password   { email }
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(200).json({
        message: "If that email is in our system, we’ve sent a link.",
      });
    }

    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
    await user.save({ validateBeforeSave: false });

    console.log("📨 Raw token:", rawToken);
    console.log("🔒 Hashed token saved:", hashedToken);

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${rawToken}`;
    const mailOptions = {
      from: `"Task Manager" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Password Reset Instructions",
      html: `
        <p>Hello ${user.name || ""},</p>
        <p>You requested a password reset. Click the link below (valid for 15 minutes):</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>If you didn’t request this, please ignore this email.</p>
      `,
    };

    await sendMail(mailOptions); // ✅ use your helper

    res.status(200).json({ message: "Reset link sent if the account exists." });
  } catch (err) {
    console.error("📧 Forgot‑password error:", err);
    res.status(500).json({ error: "Failed to send reset link" });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/auth/reset-password/:token   { password }
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  // Hash the token in the same way we stored it
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }, // still valid?
    });

    if (!user)
      return res.status(400).json({ error: "Token is invalid or has expired" });

    // Update password
    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res
      .status(200)
      .json({ message: "Password reset successful. You can log in." });
  } catch (err) {
    console.error("❌ Reset‑password error:", err);
    res.status(500).json({ error: "Failed to reset password" });
  }
};
