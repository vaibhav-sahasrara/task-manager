// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const navigate = useNavigate();
//   const [error, setError] = useState("");
//   const [form, setForm] = useState({ email: "", password: "" });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/auth/login",
//         form
//       );

//       const { token, user } = res.data;

//       // Store in localStorage
//       localStorage.setItem("token", token);
//       localStorage.setItem("role", user.role);
//       localStorage.setItem("user", JSON.stringify(user));

//       // Redirect based on role
//       // if (user.role === 'admin') {
//       //     navigate('/dashboard');
//       // } else {
//       //     navigate('/client');
//       // }
//       if (user.role === "admin") {
//         navigate("/admin/dashboard");
//       } else if (user.role === "employee") {
//         navigate("/client/dashboard");
//       } else {
//         navigate("/");
//       }
//     } catch (err) {
//       const msg = err.response?.data?.error || "Login failed";
//       setError(msg);
//     }
//   };

//   return (
//     <div className="flex min-h-screen">
//       {/* Left panel - Image or branding */}
//       <div className="hidden w-1/2 bg-gradient-to-br from-purple-600 to-indigo-600 p-10 text-white lg:flex flex-col justify-between">
//         <div>
//           <h1 className="text-4xl font-bold">Sahasrara Metatech</h1>
//           <p className="mt-2 text-lg text-indigo-100">
//             Manage your team, projects, and tasks in one place.
//           </p>
//         </div>
//         <img
//           src="https://illustrations.popsy.co/gray/work-from-home.svg"
//           alt="Login Illustration"
//           className="w-3/4 mx-auto mt-8"
//         />
//         <p className="text-sm text-indigo-200 text-center">
//           © 2025 Sahasrara Metatech,Pvt.Ltd.
//         </p>
//       </div>

//       {/* Right panel - Login form */}
//       <div className="flex w-full items-center justify-center bg-white lg:w-1/2">
//         <div className="w-full max-w-md space-y-8 p-8">
//           <div>
//             <h2 className="text-center text-3xl font-bold text-gray-800">
//               Welcome
//             </h2>
//             <p className="mt-2 text-center text-sm text-gray-600">
//               Log in to continue managing your team
//             </p>
//           </div>
//           {error && (
//             <div className="text-red-600 text-sm text-center mb-2">{error}</div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Email <span className="text-red-600">*</span>
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 required
//                 onChange={handleChange}
//                 className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
//                 placeholder="you@example.com"
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Password <span className="text-red-600">*</span>
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 required
//                 onChange={handleChange}
//                 className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
//                 placeholder="••••••••"
//               />
//             </div>
//             <div className="flex justify-end text-sm">
//               <a href="#" className="text-indigo-600 hover:underline">
//                 Forgot password?
//               </a>
//             </div>
//             <button
//               type="submit"
//               className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 transition duration-300"
//             >
//               Sign In
//             </button>
//           </form>
//           <p className="text-center text-xs text-gray-500">
//             Don’t have an account?{" "}
//             <Link to="/register" className="text-indigo-600 hover:underline">
//               Register
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Login() {
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
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user.role === "employee") {
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
      {/* Left branding panel */}
      <div className="hidden w-1/2 bg-gradient-to-br from-purple-600 via-indigo-600 to-indigo-700 p-6 text-white lg:flex flex-col justify-center rounded-tr-[3rem] rounded-br-[3rem] shadow-2xl">
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
      <div className="flex w-full items-center justify-center bg-gray-100 lg:w-1/2">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md space-y-5">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-sm text-gray-500">
              Log in to continue managing your team
            </p>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center bg-red-100 px-4 py-2 rounded-md">
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
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 shadow-sm"
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
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 shadow-sm"
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
              className="w-full bg-indigo-600 text-white text-sm py-2.5 rounded-lg hover:bg-indigo-700 transition duration-200 shadow-md"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-sm text-gray-500">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-600 font-medium hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
