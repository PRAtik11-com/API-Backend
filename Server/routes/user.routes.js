const express = require("express");
const {
  Signup, 
  Signin,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");


const authenticator = require("../middleware/authenticator");
const roleValidator = require("../middleware/roleValidator");
const userLogger = require("../middleware/userLogger");


const userRouter = express.Router();

userRouter.post("/signup", Signup);
userRouter.post("/signin", Signin, userLogger);
userRouter.get("/users", authenticator, getAllUsers);
userRouter.get("/users/:id", authenticator, getUserById);
userRouter.patch("/updateUser/:id", authenticator, roleValidator, updateUser);
userRouter.delete("/deleteUser/:id", authenticator, roleValidator, deleteUser);

module.exports = userRouter;
