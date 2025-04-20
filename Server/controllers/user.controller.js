const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
require("dotenv").config()

const Signup = async (req, res) => {
  const { username, email, dateOfBirth, role, location, password, confirmPassword } = req.body;

  if (!username || !email || !dateOfBirth || !role || !location || !password || !confirmPassword) {
    return res.status(400).json({message:"Please fill all the fields."});
  }

  if (password !== confirmPassword) {
    return res.status(400).json({message:"Passwords do not match"});
  }
   

  const existingUser = await UserModel.findOne({ email });
  if (existingUser){
    return res.status(400).json({message:"Email already exists"});
  } 

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new UserModel({
    username,
    email,
    dateOfBirth,
    role,
    location,
    password: hashedPassword,
  });

  await user.save();
  res.status(201).json({message:"User registered successfully",user});
};

const Signin = async (req, res,next) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ msg: "Please fill all the fields." });
    }
  
    try {
      const user = await UserModel.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ msg: "Invalid email or password." });
      }
  
      bcrypt.compare(password,user.password , (err, result) => {
        if (err) {
            return res.status(400).json({ message:err.message });
        }
        if (!result) {
            return res.status(400).json({ message:"Invalid Password." });
        }

        const {password,...rest} = user._doc
        jwt.sign({ user: rest },process.env.JWT_privatkey , (err, token) => {
            if (err) {
                return res.status(401).json({ message:err.message });
            }
            if (!token) {
                return res.status(400).json({ message:"Token is not created." });
            }
            res.cookie("Verificationtoken", token);
            req.user = rest;
            next();
          });

    });
  

  
    } catch (err) {
      res.status(500).json({ msg: "Something went wrong", error: err.message });
    }
  };

const getAllUsers = async (req, res) => {
 try {
    const users = await UserModel.find();
    res.status(200).json({ msg: "Get all data successful", users });
 } catch (error) {
    res.status(500).json({ message:error.message });
 }
};

const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    res.status(200).json({ msg: "Get userid data successful", user});
  } catch (error) {
    res.status(500).json({ message:error.message });
  }
};

const updateUser = async (req, res) => {
    try {
        const { password } = req.body;
    
        // If password is being updated, hash it first
        if (password) {
          const hashedPassword = await bcrypt.hash(password, 10);
          req.body.password = hashedPassword;
        }
    
        await UserModel.findByIdAndUpdate(req.params.id, { $set: req.body });
        res.status(200).json({ message: "User updated successfully" });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
};

const deleteUser = async (req, res) => {
 try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).json({message:"User deleted successfully"});
 } catch (error) {
    res.status(500).json({ message:error.message });
 }
};

module.exports = {
  Signup,
  Signin,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
