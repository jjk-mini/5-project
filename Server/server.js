// Express app entry point
const dotenv = require("dotenv");
dotenv.config();
const serviceRoutes = require("./routes/serviceRoutes");
const orderRoutes = require("./routes/orderRoutes");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
require("./config/cloudinary");

// Connect to MongoDB
dotenv.config();

connectDB();
 
const app = express();
// security Headers
app.use(helmet());

app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
 
 
// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
 
// rate limite 

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // 20 requests per IP per window
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many attempts. Please try again later." },
});
app.use("/api/auth", authLimiter);
 


// Routes
app.use("/api/services", serviceRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);
 // Routes
 app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/rooms', require('./routes/roomRoutes'));
app.use("/api/staff", require("./routes/staffRoutes"));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/maintenance', require('./routes/maintenanceRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/billing', require('./routes/billingRoutes'));
app.use('/api/housekeeping', require('./routes/housekeepingRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/feedback', require('./routes/feedbackRoutes'));
app.use('/api/reports', require('./routes/reportRoutes'));
app.use('/api/housekeeping', require('./routes/housekeepingRoutes')); 

// Health check
app.get("/", (req, res) => {
  res.send("LuxuryStay API is running");
});
 

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
 
// Global error handler
app.use((err, req, res, next) => {
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  console.error(err.stack);
  res.status(statusCode).json({
    message: err.message || "Server error",
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
});
 
 


const PORT = process.env.PORT || 5000;
 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});