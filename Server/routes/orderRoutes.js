const express = require("express");
const {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/mine", protect, getMyOrders);
router.get("/", protect, authorizeRoles("admin", "manager", "receptionist"), getAllOrders);
router.patch("/:id/status", protect, authorizeRoles("admin", "manager", "receptionist"), updateOrderStatus);

module.exports = router;