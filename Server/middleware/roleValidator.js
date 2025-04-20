const roleValidator = (req, res, next) => {
    if (req.user.role !== "Admin") {
      return res.status(403).send("You can't access this resource");
    }
    next();
  };
  
  module.exports = roleValidator;
  