import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import DarkModeToggle from "../ui/DarkModeToggle";

export default function Login() {
  const { login } = useAuth(); // destructure from context

  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("/api/auth/login", form);
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("user", JSON.stringify(user));
      login(user); // <-- this sets it into React Context too

      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user.role === "employee") {
        navigate("/employee/dashboard");
      } else if (user.role === "client") {
        navigate("/client/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      const msg = err.response?.data?.error || "Login failed";
      setError(msg);
    }
  };

  return (
    <div className="flex min-h-screen font-sans">
      <DarkModeToggle />
      {/* Left branding panel */}
      {/* <div className="hidden w-1/2 bg-gradient-to-br from-purple-600 via-indigo-600 to-indigo-700 p-6 text-white lg:flex flex-col justify-center rounded-tr-[3rem] rounded-br-[3rem] shadow-2xl"> */}
      <div
        className="hidden w-1/2 lg:flex flex-col justify-center 
                  bg-gradient-to-br from-purple-600 via-indigo-600 to-indigo-700 text-white
                  dark:from-gray-900 dark:via-gray-800 dark:to-gray-800
                 p-6 rounded-tr-[3rem] rounded-br-[3rem] shadow-2xl"
      >
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
          alt="Login Illustration"
          className="w-3/4 mx-auto mt-8 drop-shadow-xl"
        />
        <p className="text-sm text-indigo-200 text-center mt-4">
          © 2025 Sahasrara Metatech, Pvt. Ltd.
        </p>
      </div>

      {/* Login form panel */}
      {/* <div className="flex w-full items-center justify-center bg-gray-100 lg:w-1/2"> */}
      <div className="flex w-full items-center justify-center bg-gray-100 dark:bg-gray-900 lg:w-1/2">
        {/* <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md space-y-5">
         */}
        <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md space-y-5">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center">
              Welcome Back
            </h2>
            <p className="text-sm text-gray-500">
              Log in to continue managing your team
            </p>
          </div>

          {/* {error && (
            <div className="text-red-600 text-sm text-center bg-red-100 px-4 py-2 rounded-md">
              {error}
            </div>
          )} */}

          {error && (
            <div className="text-red-600 dark:text-red-400 text-sm text-center bg-red-100 dark:bg-red-900/30 px-4 py-2 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Email <span className="text-red-700">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600  px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 dark:bg-gray-700  text-gray-800 dark:text-gray-100 shadow-sm"
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm text-gray-600 mb-1">
                Password <span className="text-red-700">*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50  dark:bg-gray-700 text-gray-800 dark:text-gray-100 shadow-sm"
                placeholder="••••••••"
              />
              <div
                className="absolute top-9 right-3 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </div>
            </div>

            <div className="flex justify-end text-sm text-indigo-600 hover:underline">
              <a href="#">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white text-sm py-2.5 rounded-lg hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition duration-200 shadow-md"
            >
              Sign In
            </button>
          </form>

          {/* <p className="text-center text-sm text-gray-500">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-600 font-medium hover:underline"
            >
              Register
            </Link>
          </p> */}
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Don’t have an account?
            {/* space */}
            <Link
              to="/register"
              className="ml-1 text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
