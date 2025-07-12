import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { initSocket } from "./socket.js";
import authRoutes from "./routes/authRoutes.js";
// import protectedRoutes from "./routes/protectedRoutes.js";
import teamMemberRoutes from "./routes/teamMemberRoutes.js";
import protectedRoutes from "./routes/protectedRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import adminRoutes from "./routes/admin/adminRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

import reportRoutes from './routes/reportRoutes.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Your API routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", protectedRoutes);
app.use("/api/team", teamMemberRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use('/api/reports', reportRoutes);


app.use("/api/notifications", notificationRoutes);
// === DB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error", err));

// === Replace app.listen() with this:
const server = http.createServer(app); // <-- Create HTTP server manually
initSocket(server); // <-- Initialize socket on this server

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
