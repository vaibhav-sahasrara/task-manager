import React, { useContext } from "react";
import { NotificationContext } from "../../context/NotificationContext";
import { formatDate } from "../../utils/formatDate";

const NotificationPage = () => {
  const { notifications } = useContext(NotificationContext);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Notifications</h1>

      {notifications.length === 0 ? (
        <p className="text-gray-500">No notifications.</p>
      ) : (
        <ul className="space-y-2">
          {notifications.map((n) => (
            <li
              key={n._id}
              className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm"
            >
              {n.isRead ? "✅" : "🔔"} {n.message}
              <div>
                {n.isRead ? "✅" : "🔔"} {n.message}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {formatDate(n.createdAt)}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationPage;
