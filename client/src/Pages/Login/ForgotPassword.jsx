import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoginPage from "../../assets/HomeImages/LoginPage.png";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  // STEP 1 - SEND OTP
  const sendOtp = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await axios.post(
        "https://localhost:7041/api/Users/forgot-password",
        {
          email,
        }
      );

      alert(
        "OTP Sent Successfully\n\nDemo OTP : " +
          res.data.otp
      );

      setStep(2);
    } catch (err) {
      console.log("========== SEND OTP ERROR ==========");
      console.log(err);
      console.log(err.response);

      if (err.response) {
        console.log("Status :", err.response.status);
        console.log("Data :", err.response.data);

        alert(
          err.response.data.Message ||
            err.response.data.message ||
            JSON.stringify(err.response.data)
        );
      } else {
        alert(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // STEP 2 - VERIFY OTP
  const verifyOtp = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await axios.post(
        "https://localhost:7041/api/Users/verify-otp",
        {
          email,
          otp,
        }
      );

      alert("OTP Verified Successfully");

      setStep(3);
    } catch (err) {
      console.log("========== VERIFY OTP ERROR ==========");
      console.log(err);

      if (err.response) {
        alert(
          err.response.data.Message ||
            err.response.data.message ||
            JSON.stringify(err.response.data)
        );
      } else {
        alert(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // STEP 3 - RESET PASSWORD
  const resetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        "https://localhost:7041/api/Users/reset-password",
        {
          email,
          newPassword,
        }
      );

      alert("Password Reset Successfully");

      navigate("/login");
    } catch (err) {
      console.log("========== RESET PASSWORD ERROR ==========");
      console.log(err);

      if (err.response) {
        alert(
          err.response.data.Message ||
            err.response.data.message ||
            JSON.stringify(err.response.data)
        );
      } else {
        alert(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex items-center justify-center bg-slate-50">
        <img
          src={LoginPage}
          alt="Forgot Password"
          className="max-w-lg"
        />
      </div>

      <div className="flex justify-center items-center">
        <div className="w-full max-w-md p-6">

          <h1 className="text-4xl font-bold mb-2">
            Forgot Password
          </h1>

          <p className="text-gray-500 mb-8">
            Reset your password in 3 simple steps.
          </p>

          {step === 1 && (
            <form onSubmit={sendOtp}>
              <label className="font-medium">
                Email
              </label>

              <input
                type="email"
                className="w-full border rounded-xl p-3 mt-2 mb-6"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button className="w-full bg-slate-800 text-white rounded-xl py-3">
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={verifyOtp}>
              <label className="font-medium">
                OTP
              </label>

              <input
                type="text"
                className="w-full border rounded-xl p-3 mt-2 mb-6"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />

              <button className="w-full bg-slate-800 text-white rounded-xl py-3">
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={resetPassword}>
              <label className="font-medium">
                New Password
              </label>

              <input
                type="password"
                className="w-full border rounded-xl p-3 mt-2 mb-5"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <label className="font-medium">
                Confirm Password
              </label>

              <input
                type="password"
                className="w-full border rounded-xl p-3 mt-2 mb-6"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <button className="w-full bg-slate-800 text-white rounded-xl py-3">
                {loading ? "Updating..." : "Reset Password"}
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}