const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema(
  {
    fname: { type: String, required: true }, // First Name
    lname: { type: String, required: true }, // Last Name
    age: { type: Number, required: true, min: 4 }, // Age
    address: { type: String, required: true }, // Address
    email: { type: String, unique: true, required: true }, // Email
    password: { type: String, required: true }, // Password
    userType: { type: String, enum: ['user', 'admin'], default: 'user' }, 
  },
  {
    collection: "UserInfo",
  }
);

module.exports = mongoose.model("UserInfo", UserDetailsSchema);
