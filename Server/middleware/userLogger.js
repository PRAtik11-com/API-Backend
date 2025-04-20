const fs = require("fs");
const path = require("path");

const userLogger = (req, res) => {
  const { username, role } = req.user;

  const log = `User: ${username}, Role: ${role}, Time: ${new Date().toISOString()}\n`;

  fs.appendFile(path.join(__dirname, "../log.txt"), log, (err) => {
    if (err) {
      console.error("Failed to write to log file:", err.message);
    }
  });


  res.status(200).json({
    message: "User login successfully.",
    user: req.user,
  });
};

module.exports = userLogger;

