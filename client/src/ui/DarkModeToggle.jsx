// src/components/ui/DarkModeToggle.jsx
import { FiSun, FiMoon } from "react-icons/fi";
import useDarkMode from "../utils/useDarkMode";   // adjust path

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="fixed top-4 right-4 lg:top-6 lg:right-6 z-50
                 p-2 rounded-full bg-gray-100 dark:bg-gray-700
                 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
      aria-label="Toggle dark mode"
    >
      {darkMode ? (
        <FiSun className="text-yellow-400" />
      ) : (
        <FiMoon className="text-indigo-500" />
      )}
    </button>
  );
}
