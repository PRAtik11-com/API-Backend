const jwt = require("jsonwebtoken");
require("dotenv").config()

const authenticator = (req, res, next) => {
  let token = req.cookies.Verificationtoken;

  if (!token) {
    return res.status(401).send("Unauthorized: No token provided");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_privatkey);
    req.user = decoded.user; 
    next();
  } catch (err) {
    res.status(400).send("Invalid or expired token");
  }
};

module.exports = authenticator;
