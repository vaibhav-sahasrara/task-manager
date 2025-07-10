import { useEffect, useRef, useState } from "react";
import axios from "../utils/axios";

export default function useNotifications(pollInterval = 10000) {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const { data } = await axios.get("/notifications");
      setNotifications(data);
    } catch (err) {
      console.error("❌ Failed to fetch notifications", err);
    }
  };

  useEffect(() => {
    fetchNotifications(); // first load
    const id = setInterval(fetchNotifications, pollInterval);
    return () => clearInterval(id);
  }, [pollInterval]);

  // split arrays
  const unread = notifications.filter((n) => !n.isRead);
  const read = notifications.filter((n) => n.isRead);

  // helper to mark one notification as read
  const markNotificationAsRead = async (id) => {
    try {
      await axios.patch(`/notifications/${id}/read`);
      // optimistic update:
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      console.error("❌ Failed to mark as read", err);
    }
  };

  return { unread, read, all: notifications, markNotificationAsRead };
}
