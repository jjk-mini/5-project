// Billing routes — generate bill, get invoice, process payment
const express = require("express");
const {
  getOrCreateBillingForBooking,
  getBillingById,
  getBillings,
  createBilling,
  updateBilling,
  payBilling,
} = require("../controllers/billingController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

// Specific routes BEFORE "/:id" so they don't get swallowed by it
router.get("/booking/:bookingId", protect, getOrCreateBillingForBooking);

router.get("/", protect, getBillings);
router.post("/", protect, createBilling);

router.get("/:id", protect, getBillingById);
router.put("/:id", protect, authorizeRoles("admin", "manager", "receptionist"), updateBilling);
router.patch("/:id/pay", protect, payBilling);

module.exports = router;
