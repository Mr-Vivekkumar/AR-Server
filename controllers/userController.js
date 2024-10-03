const User = require("../models/userDetails");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// User Registration
exports.registerUser = async (req, res) => {
  const { fname, lname, age, address, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.json({ error: "User Exists" });
    }
  const newUser = new User({
      fname,
      lname,
      age,
      address,
      email,
      password: hashedPassword,
      userType: 'user',
  });  
  await newUser.save();
  res.status(201).json({ message: "User registered successfully" });
} catch (error) {
  res.send({ status: "error" });
}

};







// User Login
exports.loginUser = async (req, res) => {

  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "User Not found" });
    }

    // Compare password with hashed password
    if (await bcrypt.compare(password, user.password)) {
      // Generate JWT token
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "15m",
      });

      // Send response with user details
      return res.status(200).json({
        status: "ok",
        token: token,
        email: user.email,
        userType: user.userType,
        name: user.fname + " " + user.lname, // Combine first and last name
        age: user.age,
        address: user.address,
      });
    }

    // Invalid password response
    return res.status(401).json({ status: "error", error: "Invalid Password" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred during login." });
  }

 
};









// Admin delete user
exports.deleteUser = async (req, res) => {
  console.log("*****");
  const { email } = req.body;
  await User.deleteOne({ email: email });
  res.json({ message: "User deleted successfully" });
};

// Admin view all users
exports.getAllUsers = async (req, res) => {
  const allUsers = await User.find({});
  res.json(allUsers);
};

// Admin Registration
exports.registerAdmin = async (req, res) => {
  const { fname, lname, age, address, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newAdmin = new User({
      fname,
      lname,
      age,
      address,
      email,
      password: hashedPassword,
      userType: 'admin', // Set userType as admin
  });
  await newAdmin.save();
  res.status(201).json({ message: "Admin registered successfully" });
};
