const express = require("express");
const router = express.Router();

const reportController = require("../controllers/reportController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

router.get(
  "/dashboard",
  protect,
  authorizeRoles("admin", "manager"),
  reportController.getDashboardStats
);
router.get("/revenue-by-room-type", protect, authorizeRoles("admin", "manager"), reportController.getRevenueByRoomType);
router.get("/extra-charges", protect, authorizeRoles("admin", "manager"), reportController.getExtraChargesBreakdown);
router.get("/monthly", protect, authorizeRoles("admin", "manager"), reportController.getMonthlyReport);

module.exports = router;