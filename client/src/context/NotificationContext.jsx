// // src/context/NotificationContext.jsx
// import React, { createContext, useEffect, useState } from "react";
// import io from "socket.io-client";

// export const NotificationContext = createContext();

// export const NotificationProvider = ({ children }) => {
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     // 1. Connect
//     const socket = io(import.meta.env.VITE_API_URL); // backend base URL

//     // 2. Join personal room
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (user?.id) {
//       //  ✅ use id
//       socket.emit("join", user.id);
//       console.log("📡 join sent for", user.id);
//     } else {
//       console.warn("⚠️ No user id in localStorage");
//     }

//     // 3. Listen
//     socket.on("notification", (notif) => {
//       console.log("🔔 New notification", notif);
//       setNotifications((prev) => [notif, ...prev]);
//     });

//     // 4. Cleanup
//     return () => socket.disconnect();
//   }, []);

//   return (
//     <NotificationContext.Provider value={{ notifications }}>
//       {children}
//     </NotificationContext.Provider>
//   );
// };



// src/context/NotificationContext.jsx
import React, { createContext, useEffect, useState } from "react";
import io from "socket.io-client";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    /* 1. Connect */
    const socket = io(import.meta.env.VITE_API_URL);   // backend base URL

    /* 2. Join personal room */
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.id) {
      socket.emit("join", user.id);
      console.log("📡 join sent for", user.id);
    } else {
      console.warn("⚠️ No user id in localStorage");
    }

    /* 3a. Listen for generic notifications */
    socket.on("notification", (notif) => {
      console.log("🔔 New notification", notif);
      setNotifications((prev) => [notif, ...prev]);
    });

    /* 3b. Listen for task‑specific updates */
    socket.on("taskUpdated", (task) => {
      const notif = {
        message: `Task "${task.name}" was updated`,
        type: "taskStatusUpdated",
        task,
      };
      console.log("🔔 New taskUpdated", notif);
      setNotifications((prev) => [notif, ...prev]);
    });

    /* 4. Cleanup when component unmounts */
    return () => socket.disconnect();
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications }}>
      {children}
    </NotificationContext.Provider>
  );
};
