import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import SignupPage from '../../assets/HomeImages/SignupPage.png'

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobileNumber: ""
  });


 const handleSignup = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      "https://localhost:7041/api/Users/register",
      formData
    );

    alert(res.data.message);
    navigate("/login");

  } catch (error) {
    console.log(error.response?.data);

    alert(
      error.response?.data?.message ||
      error.response?.data ||
      error.message
    );
  }
};

  return (
    <div className="min-h-screen grid lg:grid-cols-2">

      {/* Left Side */}
      <div className="hidden lg:flex items-center justify-center bg-slate-50 p-10">
        <img
          src={SignupPage}
          alt="Signup"
          className="max-w-lg w-full"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center justify-center px-6 py-10">

        <div className="w-full max-w-md">

          <h1 className="text-4xl font-bold text-slate-900">
            Create Account 🚀
          </h1>

          <p className="text-slate-500 mt-2 mb-8">
            Join DriveHub and start your journey today.
          </p>

          <form className="space-y-5" onSubmit={handleSignup}>

            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full border border-slate-300 rounded-xl px-4 py-3"
            />

            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full border border-slate-300 rounded-xl px-4 py-3"
            />



            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full border border-slate-300 rounded-xl px-4 py-3"
            />

            <input
              type="text"
              placeholder="Mobile Number"
              value={formData.mobileNumber}
              onChange={(e) =>
                setFormData({ ...formData, mobileNumber: e.target.value })
              }
              className="w-full border border-slate-300 rounded-xl px-4 py-3"
            />

            <label className="flex gap-2 text-sm">

              <input type="checkbox" />

              I agree to the Terms & Conditions

            </label>

            <button
              className="w-full bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-xl font-semibold"
            >
              Create Account
            </button>

          </form>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t"></div>
            <span className="px-4 text-gray-400">OR</span>
            <div className="flex-grow border-t"></div>
          </div>

          <button
            className="w-full border border-slate-300 py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-slate-50"
          >
            <FcGoogle size={22} />
            Signup with Google
          </button>

          <p className="text-center mt-6 text-slate-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-slate-900"
            >
              Login
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
}