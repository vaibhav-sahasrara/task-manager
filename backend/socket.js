// // socket.js
// import { Server } from "socket.io";

// let io;

// export const initSocket = (server) => {
//   io = new Server(server, {
//     cors: {
//       origin: "*", // update in production
//       methods: ["GET", "POST"],
//     },
//   });

//   io.on("connection", (socket) => {
//     console.log("🟢 Client connected:", socket.id);

//     // ✅ New: Listen for user ID and join personal room
//     socket.on("join", (userId) => {
//       if (userId) {
//         socket.join(userId);
//         console.log("🟢 Joining Room:", userId);
//       }
//     });

//     socket.on("disconnect", () => {
//       console.log("🔴 Client disconnected:", socket.id);
//     });
//   });
// };

// export const getIO = () => {
//   if (!io) throw new Error("Socket.io not initialized!");
//   return io;
// };



// socket.js
import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*", // for development only — secure in production
      methods: ["GET", "POST", "PATCH"],
    },
  });

  io.on("connection", (socket) => {
    console.log("🟢 Client connected:", socket.id);

    // ✅ Handle join room by userId
    socket.on("join", (userId) => {
      if (userId) {
        socket.join(userId);
        console.log("🟢 Joined Room:", userId);
      }
    });

    socket.on("disconnect", () => {
      console.log("🔴 Client disconnected:", socket.id);
    });
  });
};

export const getIO = () => {
  if (!io) throw new Error("Socket.io not initialized!");
  return io;
};
