const express = require("express");
const {
  createMaintenanceRequest,
  getMyMaintenanceRequests,
  getAllMaintenanceRequests,
  updateMaintenanceStatus,
} = require("../controllers/maintenanceController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createMaintenanceRequest); // guest
router.get("/mine", protect, getMyMaintenanceRequests); // guest

router.get(
  "/",
  protect,
  authorizeRoles("admin", "manager", "housekeeping"),
  getAllMaintenanceRequests
);
router.patch(
  "/:id/status",
  protect,
  authorizeRoles("admin", "manager", "housekeeping"),
  updateMaintenanceStatus
);

module.exports = router;
