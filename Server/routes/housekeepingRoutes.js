const express = require("express");

const router = express.Router();

const {
  protect,
  authorizeRoles,
} = require("../middleware/authMiddleware");

const {
  getAllHousekeepingRequests,
  getHousekeepingRequest,
  createHousekeepingRequest,
  updateHousekeepingStatus,
  updateHousekeepingRequest,
  deleteHousekeepingRequest,
} = require("../controllers/housekeepingController");

// Get all requests
router.get(
  "/",
  protect,
  authorizeRoles(
    "admin",
    "manager",
    "housekeeping"
  ),
  getAllHousekeepingRequests
);

// Get one request
router.get(
  "/:id",
  protect,
  authorizeRoles(
    "admin",
    "manager",
    "housekeeping"
  ),
  getHousekeepingRequest
);

// Create request
router.post(
  "/",
  protect,
  authorizeRoles(
    "admin",
    "manager",
    "housekeeping"
  ),
  createHousekeepingRequest
);

// Update only status
router.patch(
  "/:id/status",
  protect,
  authorizeRoles(
    "admin",
    "manager",
    "housekeeping"
  ),
  updateHousekeepingStatus
);

// Update complete request
router.put(
  "/:id",
  protect,
  authorizeRoles(
    "admin",
    "manager",
    "housekeeping"
  ),
  updateHousekeepingRequest
);

// Delete request
router.delete(
  "/:id",
  protect,
  authorizeRoles(
    "admin",
    "manager"
  ),
  deleteHousekeepingRequest
);

module.exports = router;