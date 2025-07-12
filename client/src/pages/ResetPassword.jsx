import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";
import { FiKey, FiEye, FiEyeOff, FiLoader } from "react-icons/fi";
import DarkModeToggle from "../ui/DarkModeToggle";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

/**
 * ResetPassword.jsx – same two‑panel design as Login / ForgotPassword.
 * Expects a :token param in route like /reset-password/:token
 */
export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || !confirm) return toast.error("Please fill both fields");
    if (password !== confirm) return toast.error("Passwords do not match");

    try {
      setLoading(true);
      await axios.post(`/api/auth/reset-password/${token}`, { password });
      toast.success("Password reset successful! Please log in.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.error || "Link invalid or expired.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen font-sans">
      <DarkModeToggle />

      {/* Left branding */}
      <div className="hidden w-1/2 lg:flex flex-col justify-center bg-gradient-to-br from-purple-600 via-indigo-600 to-indigo-700 text-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-800 p-6 rounded-tr-[3rem] rounded-br-[3rem] shadow-2xl">
        <div>
          <h1 className="text-4xl font-bold drop-shadow-sm">
            Sahasrara Metatech
          </h1>
          <p className="mt-2 text-sm text-indigo-100">
            Securely reset your password.
          </p>
        </div>
        <img
          src="https://illustrations.popsy.co/gray/work-from-home.svg"
          alt="Reset Password Illustration"
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
              Reset Password
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter a new password for your account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* New password */}
            <div className="relative">
              <label className="block text-sm text-gray-600 mb-1">
                New Password <span className="text-red-700">*</span>
              </label>
              <input
                type={show ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 shadow-sm"
                placeholder="••••••••"
              />
              <FiKey className="absolute left-3 top-9 text-gray-500" />
            </div>

            {/* Confirm */}
            <div className="relative">
              <label className="block text-sm text-gray-600 mb-1">
                Confirm Password <span className="text-red-700">*</span>
              </label>
              <input
                type={show ? "text" : "password"}
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 shadow-sm"
                placeholder="••••••••"
              />
              <div
                className="absolute right-3 top-9 text-gray-500 cursor-pointer"
                onClick={() => setShow(!show)}
              >
                {show ? <FiEyeOff /> : <FiEye />}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 bg-indigo-600 text-white text-sm py-2.5 rounded-lg hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition duration-200 shadow-md disabled:opacity-50"
            >
              {loading && <FiLoader className="animate-spin" />} Reset Password
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
