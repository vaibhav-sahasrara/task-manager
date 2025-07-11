// import React, { useContext } from "react";
// import { NotificationContext } from "../../context/NotificationContext";
// import { formatDate } from "../../utils/formatDate";

// const NotificationPage = () => {
//   const { notifications } = useContext(NotificationContext);

//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-bold mb-4">All Notifications</h1>

//       {notifications.length === 0 ? (
//         <p className="text-gray-500">No notifications.</p>
//       ) : (
//         <ul className="space-y-2">
//           {notifications.map((n) => (
//             <li
//               key={n._id}
//               className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm"
//             >
//               {n.isRead ? "✅" : "🔔"} {n.message}
//               <div>
//                 {n.isRead ? "✅" : "🔔"} {n.message}
//               </div>
//               <div className="text-xs text-gray-500 mt-1">
//                 {formatDate(n.createdAt)}
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default NotificationPage;

// src/pages/NotificationPage.jsx
import React, { useContext } from "react";
import { NotificationContext } from "../../context/NotificationContext";
import { formatDate } from "../../utils/formatDate";
import { motion, AnimatePresence } from "framer-motion";
import { FiBell, FiCheckCircle } from "react-icons/fi";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export default function NotificationPage() {
  const { notifications } = useContext(NotificationContext);

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-extrabold tracking-tight">
          All Notifications
        </h1>
      </div>

      {/* No notifications */}
      {notifications.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400">
          You’re all caught up! 🎉
        </p>
      )}

      {/* Notification list */}
      <AnimatePresence>
        <motion.ul
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {notifications.map((n) => (
            <motion.li
              key={n._id}
              variants={itemVariants}
              exit={{ opacity: 0, y: -10, transition: { duration: 0.15 } }}
            >
              <div
                className={`relative overflow-hidden rounded-xl shadow-sm border dark:border-gray-700 p-4 transition
                  bg-white dark:bg-gray-800 hover:shadow-md hover:-translate-y-0.5`}
              >
                {/* Status icon */}
                <div className="absolute top-3 right-3">
                  {n.isRead ? (
                    <FiCheckCircle className="text-emerald-500" />
                  ) : (
                    <FiBell className="text-amber-500 animate-pulse" />
                  )}
                </div>

                {/* Message */}
                <p
                  className={`pr-6 ${
                    n.isRead
                      ? "text-gray-600 dark:text-gray-300"
                      : "font-semibold"
                  }`}
                >
                  {n.message}
                </p>

                {/* Timestamp */}
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  {formatDate(n.createdAt)}
                </div>

                {/* Unread badge */}
                {!n.isRead && (
                  <span className="absolute -left-1 -top-1 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    NEW
                  </span>
                )}
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </AnimatePresence>
    </div>
  );
}
