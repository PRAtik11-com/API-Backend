import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${import.meta.env.VITE_Base_URL}/signin`,
        { email, password },
        { withCredentials: true }
      );

      sessionStorage.setItem("user", JSON.stringify(res.data.user));
      alert(res.data.message);
      console.log(res.data.message);
      
      navigate("/");
    } catch (err) {
      alert("Login failed: " + err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-gray-800 text-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
