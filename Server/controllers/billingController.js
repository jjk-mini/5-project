// Billing controller — generate bill, add charges, process payment
const asyncHandler = require("express-async-handler");
const Billing = require("../models/Billing");
const Booking = require("../models/Booking");
const { buildBillingAmounts, generateInvoiceNumber } = require("../utils/calcBill");
const { notifyUser, notifyRole } = require("../utils/notify");

const POPULATE_BOOKING = [
  { path: "room" },
  { path: "guest", select: "name email phone" },
];

const populateBilling = (query) =>
  query
    .populate({
      path: "booking",
      populate: POPULATE_BOOKING,
    })
    .populate("guest", "name email phone");

// Guard: only the guest who owns the booking, or staff, may view/pay a bill
const assertCanAccess = (req, booking) => {
  if (req.user.role === "guest" && booking.guest._id.toString() !== req.user._id.toString()) {
    const err = new Error("Not authorized to access this billing record");
    err.status = 403;
    throw err;
  }
};

// @desc  Get an existing billing record for a booking, or create one if it
//        doesn't exist yet (first time the guest reaches the Billing page).
//        This is what "Confirm Booking" redirects to.
// @route GET /api/billing/booking/:bookingId
const getOrCreateBillingForBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.bookingId).populate(POPULATE_BOOKING);
  if (!booking) {
    res.status(404);
    throw new Error("Booking not found");
  }

  if (req.user.role === "guest" && booking.guest._id.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to access this booking's billing");
  }

  let billing = await populateBilling(Billing.findOne({ booking: booking._id }));

  if (!billing) {
    const amounts = buildBillingAmounts({ booking });

    const created = await Billing.create({
      booking: booking._id,
      guest: booking.guest._id,
      invoiceNumber: generateInvoiceNumber(booking._id),
      ...amounts,
      paymentStatus: booking.paymentStatus === "paid" ? "paid" : "unpaid",
      createdBy: req.user._id,
    });

    billing = await populateBilling(Billing.findById(created._id));
  }

  res.json({ success: true, billing });
});

// @desc  Get single billing record by its own ID
// @route GET /api/billing/:id
const getBillingById = asyncHandler(async (req, res) => {
  const billing = await populateBilling(Billing.findById(req.params.id));
  if (!billing) {
    res.status(404);
    throw new Error("Billing record not found");
  }

  assertCanAccess(req, billing.booking);

  res.json({ success: true, billing });
});

// @desc  Get all billing records (staff) or the guest's own bills
// @route GET /api/billing
const getBillings = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.user.role === "guest") filter.guest = req.user._id;
  if (req.query.paymentStatus) filter.paymentStatus = req.query.paymentStatus;

  const billings = await populateBilling(Billing.find(filter).sort({ createdAt: -1 }));
  res.json({ success: true, count: billings.length, billings });
});

// @desc  Explicitly create a billing record for a booking (staff use, or
//        re-triggered from the frontend). Never creates a duplicate.
// @route POST /api/billing
const createBilling = asyncHandler(async (req, res) => {
  const { bookingId, extraCharges, discountAmount, taxRate } = req.body;

  if (!bookingId) {
    res.status(400);
    throw new Error("bookingId is required");
  }

  const booking = await Booking.findById(bookingId).populate(POPULATE_BOOKING);
  if (!booking) {
    res.status(404);
    throw new Error("Booking not found");
  }

  const existing = await Billing.findOne({ booking: booking._id });
  if (existing) {
    const populated = await populateBilling(Billing.findById(existing._id));
    return res.status(200).json({ success: true, billing: populated, alreadyExisted: true });
  }

  const amounts = buildBillingAmounts({
    booking,
    extraCharges: Array.isArray(extraCharges) ? extraCharges : [],
    discountAmount: Number(discountAmount || 0),
    taxRate: taxRate !== undefined ? Number(taxRate) : undefined,
  });

  const created = await Billing.create({
    booking: booking._id,
    guest: booking.guest._id,
    invoiceNumber: generateInvoiceNumber(booking._id),
    ...amounts,
    createdBy: req.user._id,
  });

  const billing = await populateBilling(Billing.findById(created._id));
  res.status(201).json({ success: true, billing });
});

// @desc  Update charges/discount/tax on an unpaid bill (staff only)
// @route PUT /api/billing/:id
const updateBilling = asyncHandler(async (req, res) => {
  const billing = await Billing.findById(req.params.id).populate({
    path: "booking",
    populate: POPULATE_BOOKING,
  });
  if (!billing) {
    res.status(404);
    throw new Error("Billing record not found");
  }

  if (billing.paymentStatus === "paid") {
    res.status(400);
    throw new Error("This booking has already been paid — the invoice can no longer be edited");
  }

  const { extraCharges, discountAmount, taxRate } = req.body;
  const amounts = buildBillingAmounts({
    booking: billing.booking,
    extraCharges: Array.isArray(extraCharges) ? extraCharges : [],
    discountAmount: discountAmount !== undefined ? Number(discountAmount) : billing.discountAmount,
    taxRate: taxRate !== undefined ? Number(taxRate) : billing.taxRate,
  });

  Object.assign(billing, amounts);
  await billing.save();

  const populated = await populateBilling(Billing.findById(billing._id));
  res.json({ success: true, billing: populated });
});

// @desc  Process payment for a bill. Rejects if already paid — prevents
//        duplicate payment records for the same booking.
// @route PATCH /api/billing/:id/pay
const payBilling = asyncHandler(async (req, res) => {
  const { paymentMethod, transactionId } = req.body;

  if (!paymentMethod) {
    res.status(400);
    throw new Error("paymentMethod is required");
  }

  const billing = await Billing.findById(req.params.id).populate({
    path: "booking",
    populate: POPULATE_BOOKING,
  });
  if (!billing) {
    res.status(404);
    throw new Error("Billing record not found");
  }

  assertCanAccess(req, billing.booking);

  if (billing.paymentStatus === "paid") {
    res.status(400);
    throw new Error("This booking has already been paid.");
  }

  billing.paymentStatus = "paid";
  billing.paymentMethod = paymentMethod;
  billing.transactionId = transactionId || `TXN-${Date.now()}`;
  billing.paidAt = new Date();
  await billing.save();

  // Keep the booking record in sync with the payment outcome — payment
  // status always flips to paid, and a booking still sitting in "pending"
  // (the default status when a guest books) is auto-confirmed once payment
  // goes through, so the guest's Booking Status actually changes on the
  // Billing page instead of being stuck on Pending forever.
  const booking = await Booking.findById(billing.booking._id);
  if (booking) {
    booking.paymentStatus = "paid";
    if (booking.status === "pending") {
      booking.status = "confirmed";
    }
    await booking.save();
  }

  notifyUser({
    userId: billing.guest,
    title: "Payment received",
    detail: `Invoice ${billing.invoiceNumber} has been marked as paid.`,
    type: "billing",
    link: `/billing/${billing.booking._id}`,
  });

  notifyRole({
    role: "receptionist",
    title: "Payment received",
    detail: `Invoice ${billing.invoiceNumber} — Rs. ${billing.totalAmount.toLocaleString()}`,
    type: "billing",
    link: "/receptionist/billing",
  });

  const populated = await populateBilling(Billing.findById(billing._id));
  res.json({ success: true, billing: populated });
});

module.exports = {
  getOrCreateBillingForBooking,
  getBillingById,
  getBillings,
  createBilling,
  updateBilling,
  payBilling,
};