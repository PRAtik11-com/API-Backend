import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [role, setRole] = useState("Explorer");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const payload = {
        username,
        email,
        dateOfBirth,
        role,
        location,
        password,
        confirmPassword
      };

      const res = await axios.post(`${import.meta.env.VITE_Base_URL}/signup`, payload,{
        withCredentials:true
      });
      alert(res.data.message);
      console.log(res.data.message);
      
      navigate("/login");
    } catch (err) {
      alert("Registration failed: " + err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-gray-800 text-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Date of Birth"
          className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          required
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none"
        >
          <option value="Explorer">Explorer</option>
          <option value="Admin">Admin</option>
        </select>
        <input
          type="text"
          placeholder="Location"
          className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Signup;
