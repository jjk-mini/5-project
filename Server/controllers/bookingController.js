const asyncHandler = require("express-async-handler");
const Booking = require("../models/Booking");
const Room = require("../models/Room");
const { calcNights } = require("../utils/calBill");
const { notifyUser, notifyRole } = require("../utils/notify");

// @desc  Get all bookings (staff) or own bookings (guest)
// @route GET /api/bookings
const getBookings = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.user.role === "guest") filter.guest = req.user._id;
  if (req.query.status) filter.status = req.query.status;

  const bookings = await Booking.find(filter)
    .populate("room", "roomNumber type price image")
    .populate("guest", "name email phone")
    .sort({ createdAt: -1 });

  res.json({ success: true, count: bookings.length, bookings });
});

// @desc  Get the logged-in guest's currently active (checked-in) bookings —
//        used to resolve "which room" for maintenance/service requests
// @route GET /api/bookings/mine/active
const getMyActiveBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({
    guest: req.user._id,
    status: "checked-in",
  })
    .populate("room", "roomNumber type floor")
    .sort({ checkIn: -1 });

  res.json({ success: true, bookings });
});

// @desc  Get single booking
// @route GET /api/bookings/:id
const getBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate("room")
    .populate("guest", "name email phone");

  if (!booking) {
    res.status(404);
    throw new Error("Booking not found");
  }

  if (req.user.role === "guest" && booking.guest._id.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized");
  }

  res.json({ success: true, booking });
});

// @desc  Create booking — guests book for themselves; staff can book on
//        behalf of a walk-in guest by passing `guest`
// @route POST /api/bookings
const createBooking = asyncHandler(async (req, res) => {
  const { room, checkIn, checkOut, guestsCount, specialRequests, guest } = req.body;

  if (!room || !checkIn || !checkOut) {
    res.status(400);
    throw new Error("Room, check-in and check-out dates are required");
  }

  const roomDoc = await Room.findById(room);
  if (!roomDoc) {
    res.status(404);
    throw new Error("Room not found");
  }
  if (roomDoc.status !== "available") {
    res.status(400);
    throw new Error("Room is not available");
  }

  const nights = calcNights(checkIn, checkOut);
  const totalAmount = nights * roomDoc.price;

  const booking = await Booking.create({
    guest: req.user.role === "guest" ? req.user._id : guest,
    room,
    checkIn,
    checkOut,
    guestsCount: guestsCount || 1,
    nights,
    totalAmount,
    specialRequests,
    createdBy: req.user._id,
    status: req.user.role === "guest" ? "pending" : "confirmed",
  });

  // Reserve the room so it doesn't get double-booked while pending/confirmed
  roomDoc.status = "reserved";
  await roomDoc.save();

  const populated = await booking.populate([
    { path: "room" },
    { path: "guest", select: "name email phone" },
  ]);

  // Let front-desk staff know a new booking came in
  notifyRole({
    role: "receptionist",
    title: "New booking",
    detail: `Room ${roomDoc.roomNumber} · ${nights} night${nights !== 1 ? "s" : ""}`,
    type: "booking",
    link: "/receptionist/bookings",
  });

  res.status(201).json({ success: true, booking: populated });
});

// @desc  Update booking status (confirm/check-in/check-out/cancel)
// @route PATCH /api/bookings/:id/status
const updateBookingStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const allowed = ["pending", "confirmed", "checked-in", "checked-out", "cancelled"];
  if (!allowed.includes(status)) {
    res.status(400);
    throw new Error(`Status must be one of: ${allowed.join(", ")}`);
  }

  const booking = await Booking.findById(req.params.id).populate("room").populate("guest", "name");
  if (!booking) {
    res.status(404);
    throw new Error("Booking not found");
  }

  booking.status = status;
  await booking.save();

  if (booking.room) {
    if (status === "checked-in") {
      booking.room.status = "occupied";
      await booking.room.save();
    }
    if (status === "checked-out") {
      booking.room.status = "cleaning"; // housekeeping needs to turn it over
      await booking.room.save();
    }
    if (status === "cancelled") {
      booking.room.status = "available";
      await booking.room.save();
    }
    if (status === "confirmed") {
      booking.room.status = "reserved";
      await booking.room.save();
    }
  }

  const guestMessages = {
    confirmed: "Your booking has been confirmed.",
    "checked-in": "You're checked in — welcome!",
    "checked-out": "You've been checked out. Thanks for staying with us.",
    cancelled: "Your booking has been cancelled.",
  };
  if (guestMessages[status]) {
    notifyUser({
      userId: booking.guest._id,
      title: guestMessages[status],
      detail: booking.room ? `Room ${booking.room.roomNumber}` : "",
      type: "booking",
      link: "/profile",
    });
  }
  if (status === "checked-out") {
    notifyRole({
      role: "housekeeping",
      title: "Room needs cleaning",
      detail: booking.room ? `Room ${booking.room.roomNumber} was just checked out` : "",
      type: "booking",
      link: "/housekeeping/dashboard",
    });
  }

  res.json({ success: true, booking });
});

// @desc  Update booking (dates, guests, requests)
// @route PUT /api/bookings/:id
const updateBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate("room");
  if (!booking) {
    res.status(404);
    throw new Error("Booking not found");
  }

  const { checkIn, checkOut, guestsCount, specialRequests } = req.body;

  if (checkIn) booking.checkIn = checkIn;
  if (checkOut) booking.checkOut = checkOut;
  if (guestsCount) booking.guestsCount = guestsCount;
  if (specialRequests !== undefined) booking.specialRequests = specialRequests;

  if (checkIn || checkOut) {
    booking.nights = calcNights(booking.checkIn, booking.checkOut);
    booking.totalAmount = booking.nights * booking.room.price;
  }

  await booking.save();
  res.json({ success: true, booking });
});

// @desc  Delete/cancel booking
// @route DELETE /api/bookings/:id
const deleteBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    res.status(404);
    throw new Error("Booking not found");
  }
  await booking.deleteOne();
  res.json({ success: true, message: "Booking deleted" });
});

// @desc  Today's check-ins / check-outs (for the receptionist dashboard)
// @route GET /api/bookings/today
const getTodayActivity = asyncHandler(async (req, res) => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const [checkinsToday, checkoutsToday, currentlyCheckedIn] = await Promise.all([
    Booking.find({ checkIn: { $gte: startOfDay, $lte: endOfDay }, status: { $ne: "cancelled" } })
      .populate("room", "roomNumber type")
      .populate("guest", "name email"),
    Booking.find({ checkOut: { $gte: startOfDay, $lte: endOfDay }, status: { $ne: "cancelled" } })
      .populate("room", "roomNumber type")
      .populate("guest", "name email"),
    Booking.find({ status: "checked-in" })
      .populate("room", "roomNumber type")
      .populate("guest", "name email"),
  ]);

  res.json({ success: true, checkinsToday, checkoutsToday, currentlyCheckedIn });
});

module.exports = {
  getBookings,
  getMyActiveBookings,
  getBooking,
  createBooking,
  updateBooking,
  updateBookingStatus,
  deleteBooking,
  getTodayActivity,
};
