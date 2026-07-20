const asyncHandler = require("express-async-handler");
const Maintenance = require("../models/Maintenance");
const Booking = require("../models/Booking");
const { notifyRole, notifyUser } = require("../utils/notify");

// @desc    Create a maintenance request. The room is NEVER trusted from
//          free text — it's resolved from one of the guest's own active
//          (checked-in) bookings, so staff always get a verified room.
// @route   POST /api/maintenance
// @access  Private (guest)
// Body: { bookingId, issueType, description, priority }
const createMaintenanceRequest = asyncHandler(async (req, res) => {
  const { bookingId, issueType, description, priority } = req.body;

  if (!bookingId || !issueType) {
    res.status(400);
    throw new Error("Please select a room (booking) and an issue type");
  }

  const booking = await Booking.findById(bookingId).populate("room", "roomNumber type");
  if (!booking) {
    res.status(404);
    throw new Error("Booking not found");
  }
  if (booking.guest.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("This booking doesn't belong to you");
  }
  if (booking.status !== "checked-in") {
    res.status(400);
    throw new Error("You can only request maintenance for a room you're currently checked into");
  }

  const request = await Maintenance.create({
    guest: req.user._id,
    booking: booking._id,
    room: booking.room._id,
    issueType,
    description: description || "",
    priority: priority || "Normal",
  });

  const populated = await request.populate("room", "roomNumber type");

  notifyRole({
    role: "housekeeping",
    title: `New maintenance request — Room ${booking.room.roomNumber}`,
    detail: issueType,
    type: "maintenance",
    link: "/housekeeping/maintenance",
  });

  res.status(201).json(populated);
});

// @desc    Get the logged-in guest's own maintenance requests
// @route   GET /api/maintenance/mine
// @access  Private (guest)
const getMyMaintenanceRequests = asyncHandler(async (req, res) => {
  const requests = await Maintenance.find({ guest: req.user._id })
    .populate("room", "roomNumber type")
    .sort({ createdAt: -1 });
  res.json(requests);
});

// @desc    Get all maintenance requests (staff view) — supports ?status=
// @route   GET /api/maintenance
// @access  Private (admin/manager/housekeeping)
const getAllMaintenanceRequests = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.status && req.query.status !== "All") {
    filter.status = req.query.status;
  }

  const requests = await Maintenance.find(filter)
    .populate("room", "roomNumber type")
    .populate("guest", "name email")
    .sort({ createdAt: -1 });
  res.json(requests);
});

// @desc    Update a maintenance request's status
// @route   PATCH /api/maintenance/:id/status
// @access  Private (admin/manager/housekeeping)
const updateMaintenanceStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const allowed = ["Open", "In Progress", "Resolved"];
  if (!allowed.includes(status)) {
    res.status(400);
    throw new Error(`Status must be one of: ${allowed.join(", ")}`);
  }

  const request = await Maintenance.findById(req.params.id).populate("room", "roomNumber");
  if (!request) {
    res.status(404);
    throw new Error("Maintenance request not found");
  }

  request.status = status;
  if (status === "Resolved") request.resolvedAt = new Date();
  await request.save();

  if (status === "Resolved") {
    notifyUser({
      userId: request.guest,
      title: `Maintenance resolved — Room ${request.room.roomNumber}`,
      detail: request.issueType,
      type: "maintenance",
      link: "/guest/servicesRequest",
    });
  }

  res.json(request);
});

module.exports = {
  createMaintenanceRequest,
  getMyMaintenanceRequests,
  getAllMaintenanceRequests,
  updateMaintenanceStatus,
};
