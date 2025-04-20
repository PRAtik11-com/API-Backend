import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-800 via-purple-800 to-pink-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left Links */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-lg font-semibold hover:text-yellow-300 transition duration-200"
          >
            Home
          </Link>
          <Link
            to="/UserList"
            className="text-lg font-semibold hover:text-yellow-300 transition duration-200"
          >
            About
          </Link>
          <Link
            to="/signup"
            className="text-lg font-semibold hover:text-yellow-300 transition duration-200"
          >
            Sign Up
          </Link>
          {!user && (
            <Link
              to="/login"
              className="text-lg font-semibold hover:text-yellow-300 transition duration-200"
            >
              Login
            </Link>
          )}
        </div>

       
        <div className="flex items-center gap-4">
          {user && (
            <>
              <span className="font-medium text-green-200">
                Welcome, {user.username}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md transition duration-200"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
