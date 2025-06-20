const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
},
  email: {
    type: String,     
    required: true,
    unique: true
},
  dateOfBirth: {
    type: String, 
    required: true
  },
  role: { 
    type: String, 
    enum: ["Admin", "Explorer"] 
},
  location: {
    type: String 
},

  password: {
    type: String, 
    required: true
  }
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;