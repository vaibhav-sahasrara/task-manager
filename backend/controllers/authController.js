import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
// import { notifyAdmin } from "../utils/mailer.js";

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

// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // const user = await User.findOne({ email });

//     const user = await User.findOne({ email }).populate(
//       "linkedMember",
//       "name email"
//     );
//     if (!user) return res.status(401).json({ error: "Invalid credentials" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

//     // Check approval status
//     if (!user.isApproved) {
//       return res.status(403).json({
//         error: "Your account is pending admin approval. Please wait.",
//       });
//     }

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.json({
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         linkedMember: user.linkedMember,
//       },
//     });
//   } catch (err) {
//     res.status(500).json({ error: "Login failed" });
//   }
// };

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
