// Auth controller — login, register, logout
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
 

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
 
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please provide name, email, and password");
  }
 
  if (password.length < 8) {
    res.status(400);
    throw new Error("Password must be at least 8 characters");
  }
 
  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    res.status(409);
    throw new Error("Email is already registered");
  }

  const user = await User.create({
    name,
    email,
    password,
    role: "guest",
  });
 
  const token = generateToken(user._id, user.role);
 
  res.status(201).json({
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
 
  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide email and password");
  }
 
  const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
 
  if (!user) {
    res.status(401);
    throw new Error("Incorrect email or password");
  }
 
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    res.status(401);
    throw new Error("Incorrect email or password");
  }
 
  const token = generateToken(user._id, user.role);
 
  res.status(200).json({
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  });
});
 

const getCurrentUser = asyncHandler(async (req, res) => {
  const user = req.user;
 
  res.status(200).json({
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});
 
module.exports = { register, login, getCurrentUser };
 