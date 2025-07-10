// src/components/common/NotificationHandler.jsx
import useNotifications from "../../../hooks/useNotifications";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

export default function NotificationHandler() {
  const { all } = useNotifications(); // <-- 'all' is the full array of notifications

  useEffect(() => {
    all.forEach((n) => {
      // your logic
    });
  }, [all]);
}
