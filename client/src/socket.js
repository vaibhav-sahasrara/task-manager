// src/socket.js
import { io } from "socket.io-client";

// Replace with your actual backend URL or use relative during development
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

export const socket = io(SOCKET_URL, {
  withCredentials: true,
  transports: ["websocket"],
});
