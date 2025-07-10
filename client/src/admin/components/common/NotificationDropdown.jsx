
// src/components/common/NotificationDropdown.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * NotificationDropdown
 * --------------------
 * Shows *up to three* most‑recent notifications. If more exist, a
 * "View all" footer appears that can open a dedicated page or modal.
 *
 * Props
 *   notifOpen              – boolean, controls visibility
 *   unread, read, all      – arrays of notification objects
 *   markNotificationAsRead – function(id) → void
 *   onViewAll              – optional callback when user clicks "View all"
 */
export default function NotificationDropdown({
  notifOpen,
  unread = [],
  read = [],
  all = [],
  markNotificationAsRead,
  onViewAll = () => {},
}) {
  // show newest first (unread first)
  const combined = [...unread, ...read];
  const preview = combined.slice(0, 3);
  const hasMore = combined.length > 3;

  return (
    <AnimatePresence>
      {notifOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.15 }}
          className="absolute right-1 mt-1 w-80 max-h-96 overflow-y-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-50"
        >
          {combined.length === 0 ? (
            <div className="p-4 text-sm text-gray-500 text-center">
              No notifications
            </div>
          ) : (
            <>
              {preview.map((n) => (
                <div
                  key={n._id}
                  className="px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => markNotificationAsRead?.(n._id)}
                >
                  <span
                    className={
                      n.isRead
                        ? "text-gray-500 dark:text-gray-400"
                        : "font-semibold text-indigo-700 dark:text-yellow-300"
                    }
                  >
                    {n.isRead ? "✅" : "🔔"} {n.message}
                  </span>
                </div>
              ))}

              {hasMore && (
                <button
                  onClick={onViewAll}
                  className="w-full py-2 text-center text-sm text-indigo-600 dark:text-yellow-300 hover:bg-gray-50 dark:hover:bg-gray-700 border-t border-gray-200 dark:border-gray-700"
                >
                  View all ({combined.length})
                </button>
              )}
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
