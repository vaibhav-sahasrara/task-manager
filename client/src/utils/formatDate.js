// src/utils/formatDate.js
export function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }); // e.g., "10 Jul 2025, 3:05 PM"
}
