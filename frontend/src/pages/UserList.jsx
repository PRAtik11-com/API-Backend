import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);

  const currentUser = JSON.parse(sessionStorage.getItem("user")) || {};

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_Base_URL}/users`,{
        withCredentials:true
      });
      setUsers(res.data.users);
    } catch (err) {
      alert("Failed to fetch users",err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`${import.meta.env.VITE_Base_URL}/deleteUser/${id}`,{
        withCredentials: true
      });
      setUsers(users.filter((user) => user._id !== id));
    } catch (err) {
      alert("Delete failed: " + err.response?.data?.message || err.message);
    }
  };

  

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-800 text-white py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-indigo-400 mb-8">
          All Users
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {users.map((el) => (
            <div
              key={el._id}
              className="bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-indigo-500 transition"
            >
              <h3 className="text-xl font-semibold mb-2 text-indigo-300">
                {el.username}
              </h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li><strong>Email:</strong> {el.email}</li>
                <li><strong>DOB:</strong> {el.dateOfBirth}</li>
                <li><strong>Role:</strong> {el.role}</li>
                <li><strong>Location:</strong> {el.location}</li>
              </ul>

              {(currentUser.role === "Admin" ) && (
                <div className="mt-4 space-x-3">
                  <Link
                    to={`/edit/${el._id}`}  state={{username:el.username,email:el.email,dateOfBirth:el.dateOfBirth,role:el.role,location:el.location}}
                    className="px-4 py-1 bg-blue-600 hover:bg-blue-700 rounded-md"
                  >
                    Edit
                  </Link>
                  {currentUser.role === "Admin" && (
                    <button
                      onClick={() => handleDelete(el._id)}
                      className="px-4 py-1 bg-red-600 hover:bg-red-700 rounded-md"
                    >
                      Delete
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserList;
