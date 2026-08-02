import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const [userName, setUserName] = useState("Default User");


  useEffect(() => {
    const updateUser = () => {
      const name = localStorage.getItem("name");

      if (name) {
        setUserName(name);
      } else {
        setUserName("Default User");
      }
    };

    updateUser();

    window.addEventListener("login", updateUser);

    return () => {
      window.removeEventListener("login", updateUser);
    };
  }, []);



  const handleLogout = () => {

    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("token");

    setUserName("Default User");

    navigate("/login");
  };

  const handleDashboard = () => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      navigate("/dashboard");
    } else {
      alert("❌ Please login first to access Dashboard.");
    }
  };

  return (

    <>
      <nav>
        <div className="navbar bg-gray-900 text-white shadow-lg px-4 lg:px-10 sticky top-0 z-50">

          {/* Mobile Menu */}
          <div className="navbar-start">
            <div className="dropdown lg:hidden">
              <div tabIndex={0} role="button" className="btn btn-ghost text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-xl bg-gray-800 rounded-box w-56 text-white"
              >
                <li><a href="/" className="hover:text-red-500">Home</a></li>
                <li><a className="hover:text-red-500">About</a></li>

                <li>
                  <details>
                    <summary>Pages</summary>
                    <ul>
                      <li><a href="/emergency">Emergency</a></li>
                      <li><a href="/construction">Construction</a></li>
                      <li><a href="/agriculture">Agriculture</a></li>
                      <li><a href="/heavyload">HeavyLoad</a></li>
                      <li><a href="/lightload">LightWeight</a></li>
                      <li><a href="/rentalcars">RentalCars</a></li>
                      <li><a href="/trip">Trip</a></li>
                    </ul>
                  </details>
                </li>

                <li><a className="hover:text-red-500">Contact Us</a></li>
              </ul>
            </div>

            {/* Logo */}
            <a className="text-2xl font-extrabold tracking-wide cursor-pointer">
              Drive<span className="text-red-500">Hub</span>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal gap-3 font-medium">

              <li>
                <a href="/" className="hover:text-red-500 transition-all duration-300">
                  Home
                </a>
              </li>

              <li>
                <a href="#about-us" className="hover:text-red-500 transition-all duration-300">
                  About
                </a>
              </li>

              <li>
                <a onClick={handleDashboard} className="hover:text-red-500 transition-all duration-300">
                  Dashboard
                </a>
              </li>

              <li>
                <details>
                  <summary className="hover:text-red-500 transition-all duration-300">
                    Pages
                  </summary>
                  <ul className="bg-white text-gray-800 rounded-xl shadow-xl p-2 w-52">
                    <li><a href="/emergency">Emergency</a></li>
                    <li><a href="/construction">Construction</a></li>
                    <li><a href="/agriculture">Agriculture</a></li>
                    <li><a href="/heavyload">HeavyLoad</a></li>
                    <li><a href="/lightload">LightWeight</a></li>
                    <li><a href="/rentalcars">RentalCars</a></li>
                    <li><a href="/trip">Trip</a></li>
                  </ul>
                </details>
              </li>

              <li>
                <a href="#contact" className="hover:text-red-500 transition-all duration-300">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Right Side */}
          <div className="navbar-end gap-3">

            {userName === "Default User" && (
              <a href="/login">
                <button className="btn btn-sm bg-red-600 border-none hover:bg-red-700 text-white hidden md:flex">
                  Login
                </button>
              </a>
            )}

            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full border-2 border-red-500">
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    alt="Profile"
                  />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-2 shadow-xl bg-white text-gray-800 rounded-xl w-52"
              >
                <li>
                  <a className="font-semibold">
                    👤 {userName}
                  </a>
                </li>
                <li><a>Dashboard</a></li>
                <li><a href="/your-vehicles">Your Vehicles</a></li>
                <li>
                  <a onClick={handleLogout}>
                    Logout
                  </a>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </nav>
    </>
  );

}

export default Navbar;