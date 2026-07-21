// Housekeeping controller — view rooms, mark a room clean/available again
const asyncHandler = require("express-async-handler");
const Room = require("../models/Room");
const { notifyRole } = require("../utils/notify");

// GET /api/housekeeping/rooms
const getHousekeepingRooms = asyncHandler(async (req, res) => {
  const rooms = await Room.find().sort({ roomNumber: 1 });
  res.json({ success: true, rooms });
});

// PATCH /api/housekeeping/rooms/:id/clean
const markRoomClean = asyncHandler(async (req, res) => {
  const room = await Room.findById(req.params.id);

  if (!room) {
    res.status(404);
    throw new Error("Room not found");
  }

  room.status = "available";
  await room.save();

  notifyRole({
    role: "receptionist",
    title: "Room ready",
    detail: `Room ${room.roomNumber} has been cleaned and is now available`,
    type: "housekeeping",
    link: "/receptionist/checkinout",
  });

  res.json({ success: true, message: "Room marked as available", room });
});

module.exports = { getHousekeepingRooms, markRoomClean };