const express = require("express");
const {
  getHousekeepingRooms,
  markRoomClean,
} = require("../controllers/housekeepingController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/rooms",
  protect,
  authorizeRoles("admin", "manager", "housekeeping"),
  getHousekeepingRooms
);

router.patch(
  "/rooms/:id/clean",
  protect,
  authorizeRoles("admin", "manager", "housekeeping"),
  markRoomClean
);

module.exports = router;