import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../utils/axiosInstance";
import { FiMail, FiLoader } from "react-icons/fi";
import DarkModeToggle from "../ui/DarkModeToggle";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

/**
 * ForgotPassword.jsx – matches the same two‑panel look & feel as Login.jsx
 */
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email address");

    try {
      setLoading(true);
      await axios.post("/api/auth/forgot-password", { email });
      toast.success("If the email exists, a reset link has been sent ✉️");
      setEmail("");
    } catch (err) {
      toast.error(err.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen font-sans">
      <DarkModeToggle />

      {/* Left branding panel */}
      <div className="hidden w-1/2 lg:flex flex-col justify-center bg-gradient-to-br from-purple-600 via-indigo-600 to-indigo-700 text-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-800 p-6 rounded-tr-[3rem] rounded-br-[3rem] shadow-2xl">
        <div>
          <h1 className="text-4xl font-bold drop-shadow-sm">
            Sahasrara Metatech
          </h1>
          <p className="mt-2 text-sm text-indigo-100">
            Manage your team, projects, and tasks.
          </p>
        </div>
        <img
          src="https://illustrations.popsy.co/gray/work-from-home.svg"
          alt="Forgot Password Illustration"
          className="w-3/4 mx-auto mt-8 drop-shadow-xl"
        />
        <p className="text-sm text-indigo-200 text-center mt-4">
          © 2025 Sahasrara Metatech, Pvt. Ltd.
        </p>
      </div>

      {/* Form panel */}
      <div className="flex w-full items-center justify-center bg-gray-100 dark:bg-gray-900 lg:w-1/2">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md space-y-5"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              Forgot Password
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and we'll send you a reset link.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="relative">
              <label className="block text-sm text-gray-600 mb-1">
                Email <span className="text-red-700">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 shadow-sm"
                placeholder="you@example.com"
              />
              <FiMail className="absolute left-3 top-9 text-gray-500" />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 bg-indigo-600 text-white text-sm py-2.5 rounded-lg hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition duration-200 shadow-md disabled:opacity-50"
            >
              {loading && <FiLoader className="animate-spin" />} Send Reset Link
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Remembered your password?
            <Link
              to="/login"
              className="ml-1 text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
