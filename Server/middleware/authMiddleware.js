// JWT auth middleware — protect routes
const asyncHandler = require("express-async-handler");
const  jwt = require("jsonwebtoken")
const User = require("../models/User")

// verifies JWT

const protect = asyncHandler (async (req, res, next ) =>{
    let token

    const authHeader = req.header.authorization

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1]
    }
 if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

  req.user = await User.findById(decoded.id)

if(!req.user){
    return res.status(401).json({ message:"User nolonger exists"})
}

    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
    
})

// restricts routes 
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403);
      throw new Error("You do not have permission to perform this action");
    }
    next();
  };
};
 
module.exports = { protect, authorizeRoles };