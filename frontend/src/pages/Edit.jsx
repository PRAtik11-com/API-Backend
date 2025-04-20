import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";


const Edit = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const {id} = useParams()
  
    const { username, email, dateOfBirth, role, location: userLocation } = location.state;
  
    const [editUsername, setEditUsername] = useState(username);
    const [editEmail, setEditEmail] = useState(email);
    const [editDOB, setEditDOB] = useState(dateOfBirth);
    const [editRole, setEditRole] = useState(role);
    const [editLocation, setEditLocation] = useState(userLocation);

    const handleUpdate = async (e) => {
        e.preventDefault();
    
        const payload = {
          username: editUsername,
          email: editEmail,
          dateOfBirth: editDOB,
          role: editRole,
          location: editLocation,
        };
    
        try {
          await axios.patch(`${import.meta.env.VITE_Base_URL}/updateUser/${id}`, payload, {
            withCredentials: true,
          });
          alert("User updated successfully!");
          navigate("/userlist");
        } catch (err) {
          alert("Update failed!");
          console.error(err);
        }
      };

      return (
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
          <form
            onSubmit={handleUpdate}
            className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
          >
            <h2 className="text-3xl font-bold mb-6 text-center text-indigo-400">Edit User</h2>
    
            <label className="block mb-2">Username</label>
            <input
              type="text"
              value={editUsername}
              onChange={(e) => setEditUsername(e.target.value)}
              className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
              required
            />
    
            <label className="block mb-2">Email</label>
            <input
              type="email"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
              className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
              required
            />
    
            <label className="block mb-2">Date of Birth</label>
            <input
              type="date"
              value={editDOB}
              onChange={(e) => setEditDOB(e.target.value)}
              className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
              required
            />
    
            <label className="block mb-2">Role</label>
            <select
              value={editRole}
              onChange={(e) => setEditRole(e.target.value)}
              className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
            >
              <option value="Admin">Admin</option>
              <option value="Explorer">Explorer</option>
            </select>
    
            <label className="block mb-2">Location</label>
            <input
              type="text"
              value={editLocation}
              onChange={(e) => setEditLocation(e.target.value)}
              className="w-full p-2 mb-6 rounded bg-gray-700 text-white"
              required
            />
    
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded font-semibold"
            >
              Update User
            </button>
          </form>
        </div>
      );
    };
    
    export default Edit;
    
