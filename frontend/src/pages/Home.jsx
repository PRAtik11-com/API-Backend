import React from "react";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-4 py-10">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1
          className="text-5xl font-extrabold mb-6"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Welcome to the User Portal 🚀
        </motion.h1>

        <motion.p
          className="text-xl text-gray-300 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Explore user roles, master full-stack development, and build something amazing!
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.img
            src="https://media.giphy.com/media/3o7abB06u9bNzA8lu8/giphy.gif"
            alt="Code Animation"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
          />

          <motion.img
            src="https://media.giphy.com/media/f3iwJFOVOwuy7K6FFw/giphy.gif"
            alt="Team Work"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
