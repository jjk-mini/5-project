// Booking routes — create, cancel, check-in, check-out
const express = require("express");
const {
  getBookings,
  getMyActiveBookings,
  getBooking,
  createBooking,
  updateBooking,
  updateBookingStatus,
  deleteBooking,
  getTodayActivity,
} = require("../controllers/bookingController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

// Specific routes BEFORE "/:id" so they don't get swallowed by it
router.get("/mine/active", protect, getMyActiveBookings);
router.get("/today", protect, authorizeRoles("admin", "manager", "receptionist"), getTodayActivity);

router.get("/", protect, getBookings); // guest → own bookings, staff → all
router.post("/", protect, createBooking); // guest self-books, staff can book for a walk-in

router.get("/:id", protect, getBooking);
router.put("/:id", protect, authorizeRoles("admin", "manager", "receptionist"), updateBooking);
router.patch("/:id/status", protect, authorizeRoles("admin", "manager", "receptionist"), updateBookingStatus);
router.delete("/:id", protect, authorizeRoles("admin", "manager"), deleteBooking);

module.exports = router;
