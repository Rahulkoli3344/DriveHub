import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import LoginPage from '../../assets/HomeImages/LoginPage.png';
import { auth } from "../../firebase";
import {
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

export default function Login() {

  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://localhost:7041/api/Users/login",
        formData
      );

      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("email", res.data.email);
      localStorage.setItem("role", res.data.role);

      // Notify Navbar
      window.dispatchEvent(new Event("login"));

      alert("Login successful 🚀");
      navigate("/");

    } catch (error) {
      console.log(error.response?.data || error.message);

      alert(
        error.response?.data?.message ||
        error.response?.data ||
        error.message
      );
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const res = await axios.post(
        "https://localhost:7041/api/Users/google-login",
        {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        }
      );

      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("email", res.data.email);
      localStorage.setItem("role", res.data.role);

      window.dispatchEvent(new Event("login"));

      alert("Google Login Successful 🚀");

      navigate("/");
    } catch (error) {
      console.log("Error Code:", error.code);
      console.log("Error Message:", error.message);
      console.log(error);

      alert(error.code + "\n" + error.message);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">

      {/* Left Side */}
      <div className="hidden lg:flex items-center justify-center bg-slate-50 p-10">
        <img
          src={LoginPage}
          alt="Login"

          className="max-w-lg w-full"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center justify-center px-6 py-10">

        <div className="w-full max-w-md">

          <h1 className="text-4xl font-bold text-slate-900">
            Welcome Back 👋
          </h1>

          <p className="text-slate-500 mt-2 mb-8">
            Login to access your DriveHub account.
          </p>

          <form className="space-y-5" onSubmit={handleLogin}>

            <div>
              <label className="block mb-2 font-medium">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:border-slate-600"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }

                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:border-slate-600"
              />
            </div>

            <div className="flex justify-between items-center text-sm">

              <label className="flex gap-2">
                <input type="checkbox" />
                Remember Me
              </label>

              <Link
                to="/forgot-password"
                className="text-slate-700 hover:text-slate-900"
              >
                Forgot Password?
              </Link>

            </div>

            <button
              className="w-full bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-xl font-semibold transition"
            >
              Login
            </button>

          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t"></div>
            <span className="px-4 text-gray-400">OR</span>
            <div className="flex-grow border-t"></div>
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="w-full border border-slate-300 py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-slate-50"
          >
            <FcGoogle size={22} />
            Continue with Google
          </button>

          <p className="text-center mt-6 text-slate-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-slate-900"
            >
              Signup
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
}