import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Home from "../pages/Home";
import UserList from "../pages/UserList";
import Edit from "../pages/Edit";


const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/UserList" element={<UserList />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/edit/:id" element={<Edit />} />
    </Routes>
  );
};

export default AllRoutes;