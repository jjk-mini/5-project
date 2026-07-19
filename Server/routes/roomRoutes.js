// Room routes — CRUD and filter
const express = require("express");

const {
  getRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
} = require("../controllers/roomController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

const upload = require("../middleware/upload");

const router = express.Router();

// Get all rooms
router.get("/", getRooms);

// Get single room
router.get("/:id", getRoomById);

// Create room
router.post(
  "/",
  protect,
  authorizeRoles("admin", "manager"),
  upload.single("image"),
  createRoom
);

// Update room
router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "manager"),
  upload.single("image"),
  updateRoom
);

// Delete room
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin", "manager"),
  deleteRoom
);

module.exports = router;