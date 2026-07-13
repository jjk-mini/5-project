// const Booking = require("../models/Booking");
// const Room = require("../models/Room");
// const { calcNights } = require("../utils/calBill");

// // @desc  Get all bookings (admin/staff) or own bookings (guest)
// // @route GET /api/bookings
// const getBookings = async (req, res, next) => {
//   try {
//     const filter = {};
//     if (req.user.role === "guest") filter.guest = req.user._id;
//     if (req.query.status) filter.status = req.query.status;

//     const bookings = await Booking.find(filter)
//       .populate("room", "roomNumber type price images")
//       .populate("guest", "name email phone")
//       .sort({ createdAt: -1 });

//     res.json({ success: true, count: bookings.length, bookings });
//   } catch (error) {
//     next(error);
//   }
// };

// // @desc  Get single booking
// // @route GET /api/bookings/:id
// const getBooking = async (req, res, next) => {
//   try {
//     const booking = await Booking.findById(req.params.id)
//       .populate("room")
//       .populate("guest", "name email phone");

//     if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });

//     if (req.user.role === "guest" && booking.guest._id.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ success: false, message: "Not authorized" });
//     }

//     res.json({ success: true, booking });
//   } catch (error) {
//     next(error);
//   }
// };

// // @desc  Create booking
// // @route POST /api/bookings
// const createBooking = async (req, res, next) => {
//   try {
//     const { room, checkIn, checkOut, guestsCount, specialRequests, guest } = req.body;

//     const roomDoc = await Room.findById(room);
//     if (!roomDoc) return res.status(404).json({ success: false, message: "Room not found" });
//     if (roomDoc.status !== "available") {
//       return res.status(400).json({ success: false, message: "Room is not available" });
//     }

//     const nights = calcNights(checkIn, checkOut);
//     const totalAmount = nights * roomDoc.price;

//     const booking = await Booking.create({
//       guest: req.user.role === "guest" ? req.user._id : guest,
//       room,
//       checkIn,
//       checkOut,
//       guestsCount: guestsCount || 1,
//       nights,
//       totalAmount,
//       specialRequests,
//       createdBy: req.user._id,
//       status: req.user.role === "guest" ? "pending" : "confirmed",
//     });

//     if (req.user.role !== "guest") {
//       roomDoc.status = "booked";
//       await roomDoc.save();
//     }

//     const populated = await booking.populate([{ path: "room" }, { path: "guest", select: "name email phone" }]);

//     res.status(201).json({ success: true, booking: populated });
//   } catch (error) {
//     next(error);
//   }
// };

// // @desc  Update booking status (confirm/cancel/etc.)
// // @route PATCH /api/bookings/:id/status
// const updateBookingStatus = async (req, res, next) => {
//   try {
//     const { status } = req.body;
//     const booking = await Booking.findById(req.params.id).populate("room");
//     if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });

//     booking.status = status;
//     await booking.save();

//     if (booking.room) {
//       if (status === "checked-in") {
//         booking.room.status = "booked";
//         await booking.room.save();
//       }
//       if (status === "checked-out") {
//         booking.room.status = "cleaning";
//         await booking.room.save();
//       }
//       if (status === "cancelled") {
//         booking.room.status = "available";
//         await booking.room.save();
//       }
//       if (status === "confirmed") {
//         booking.room.status = "booked";
//         await booking.room.save();
//       }
//     }

//     res.json({ success: true, booking });
//   } catch (error) {
//     next(error);
//   }
// };

// // @desc  Update booking (dates, guests, requests)
// // @route PUT /api/bookings/:id
// const updateBooking = async (req, res, next) => {
//   try {
//     const booking = await Booking.findById(req.params.id).populate("room");
//     if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });

//     const { checkIn, checkOut, guestsCount, specialRequests } = req.body;

//     if (checkIn) booking.checkIn = checkIn;
//     if (checkOut) booking.checkOut = checkOut;
//     if (guestsCount) booking.guestsCount = guestsCount;
//     if (specialRequests !== undefined) booking.specialRequests = specialRequests;

//     if (checkIn || checkOut) {
//       booking.nights = calcNights(booking.checkIn, booking.checkOut);
//       booking.totalAmount = booking.nights * booking.room.price;
//     }

//     await booking.save();
//     res.json({ success: true, booking });
//   } catch (error) {
//     next(error);
//   }
// };

// // @desc  Delete/cancel booking
// // @route DELETE /api/bookings/:id
// const deleteBooking = async (req, res, next) => {
//   try {
//     const booking = await Booking.findById(req.params.id);
//     if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });
//     await booking.deleteOne();
//     res.json({ success: true, message: "Booking deleted" });
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = {
//   getBookings,
//   getBooking,
//   createBooking,
//   updateBooking,
//   updateBookingStatus,
//   deleteBooking,
// };
// bookingController.js