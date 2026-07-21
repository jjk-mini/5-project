// Room controller — CRUD, status update
const asyncHandler = require("express-async-handler");
const Room = require("../models/Room");
const cloudinary = require("../config/cloudinary");
const uploadBufferToCloudinary = require("../utils/uploadBufferToCloudinary");

// GET /api/rooms
const getRooms = asyncHandler(async (req, res) => {
  const { status, type, search } = req.query;

  const filter = {};

  if (status && status !== "all") {
    filter.status = status;
  }

  if (type && type !== "all") {
    filter.type = type;
  }

 if (search) {
    filter.$or = [
      {
        roomNumber: {
          $regex: search,
          $options: "i",
        },
      },
      {
        type: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  const rooms = await Room.find(filter).sort({ roomNumber: 1 });

 res.status(200).json({
    success: true,
    count: rooms.length,
    rooms,
  });
});

// GET /api/rooms/:id
const getRoomById = asyncHandler(async (req, res) => {
  const room = await Room.findById(req.params.id);

  if (!room) {
    res.status(404);
    throw new Error("Room not found");
  }

  res.status(200).json({
    success: true,
    room,
  });
});


// POST /api/rooms
const createRoom = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("Room image is required");
  }

  const {
    roomNumber,
    type,
    floor,
      area,
    price,
    status,
    description,
    amenities,
    guests,
    size,
    bed,
    bar,
    view,
    highlights,
  } = req.body;

  const existingRoom = await Room.findOne({ roomNumber });

  if (existingRoom) {
    res.status(400);
    throw new Error("Room number already exists");
  }

  // req.file only has a buffer in memory (multer memoryStorage) — it must
  // be uploaded to Cloudinary before we have a real, persistent URL to save.
  const uploadResult = await uploadBufferToCloudinary(req.file.buffer);

const room = await Room.create({
  roomNumber,
  type,
  floor,
  area,
  price,
  status,
  description,
  amenities,
  guests,
  size,
  bed,
  bar,
  view,
  highlights,
  image: uploadResult.secure_url,
});

  res.status(201).json({
    success: true,
    message: "Room created successfully",
    room,
  });
});
// PUT /api/rooms/:id
const updateRoom = asyncHandler(async (req, res) => {
  const room = await Room.findById(req.params.id);

  if (!room) {
    res.status(404);
    throw new Error("Room not found");
  }

const {
  roomNumber,
  type,
  floor,
  area,
  price,
  status,
  description,
  amenities,
  guests,
  size,
  bed,
  bar,
  view,
  highlights,
} = req.body;

room.roomNumber = roomNumber ?? room.roomNumber;
room.type = type ?? room.type;
room.floor = floor ?? room.floor;
room.area = area ?? room.area;
room.price = price ?? room.price;
room.status = status ?? room.status;
room.description = description ?? room.description;
room.amenities = amenities ?? room.amenities;
room.guests = guests ?? room.guests;
room.size = size ?? room.size;
room.bed = bed ?? room.bed;
room.bar = bed ?? room.bar;
room.view = view ?? room.view;
room.highlights = highlights ?? room.highlights;

  if (req.file) {
    const uploadResult = await uploadBufferToCloudinary(req.file.buffer);
    room.image = uploadResult.secure_url;
  }

  const updatedRoom = await room.save();

  res.status(200).json({
    success: true,
    message: "Room updated successfully",
    room: updatedRoom,
  });
});

// DELETE /api/rooms/:id
const deleteRoom = asyncHandler(async (req, res) => {
  const room = await Room.findById(req.params.id);

  if (!room) {
    res.status(404);
    throw new Error("Room not found");
  }

  await Room.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "Room deleted successfully",
  });
});

module.exports = {
  getRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
};