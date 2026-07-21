const asyncHandler = require("express-async-handler");

const Housekeeping = require("../models/Housekeeping");

// =====================================================
// GET ALL HOUSEKEEPING SERVICE REQUESTS
// GET /api/housekeeping
// =====================================================

const getAllHousekeepingRequests = asyncHandler(
  async (req, res) => {
    const requests =
      await Housekeeping.find()
        .populate(
          "room",
          "roomNumber type"
        )
        .sort({
          createdAt: -1,
        });

    res.status(200).json({
      success: true,
      count: requests.length,
      requests,
    });
  }
);

// =====================================================
// GET SINGLE REQUEST
// GET /api/housekeeping/:id
// =====================================================

const getHousekeepingRequest =
  asyncHandler(async (req, res) => {
    const request =
      await Housekeeping.findById(
        req.params.id
      ).populate(
        "room",
        "roomNumber type"
      );

    if (!request) {
      res.status(404);

      throw new Error(
        "Housekeeping request not found"
      );
    }

    res.status(200).json({
      success: true,
      request,
    });
  });

// =====================================================
// CREATE SERVICE REQUEST
// POST /api/housekeeping
// =====================================================

const createHousekeepingRequest =
  asyncHandler(async (req, res) => {
    const {
      room,
      service,
      priority,
    } = req.body;

    if (
      !room ||
      !service
    ) {
      res.status(400);

      throw new Error(
        "Room and service are required"
      );
    }

    const request =
      await Housekeeping.create({
        room,
        service,
        priority:
          priority || "Medium",
        status: "Pending",
      });

    const populatedRequest =
      await request.populate(
        "room",
        "roomNumber type"
      );

    res.status(201).json({
      success: true,
      message:
        "Housekeeping request created successfully",
      request: populatedRequest,
    });
  });

// =====================================================
// UPDATE STATUS
// PATCH /api/housekeeping/:id/status
// =====================================================

const updateHousekeepingStatus =
  asyncHandler(async (req, res) => {
    const {
      status,
    } = req.body;

    const validStatuses = [
      "Pending",
      "In Progress",
      "Completed",
    ];

    if (
      !validStatuses.includes(status)
    ) {
      res.status(400);

      throw new Error(
        "Invalid housekeeping status"
      );
    }

    const request =
      await Housekeeping.findByIdAndUpdate(
        req.params.id,

        {
          status,
        },

        {
          new: true,
          runValidators: true,
        }
      ).populate(
        "room",
        "roomNumber type"
      );

    if (!request) {
      res.status(404);

      throw new Error(
        "Housekeeping request not found"
      );
    }

    res.status(200).json({
      success: true,
      message:
        "Housekeeping status updated successfully",
      request,
    });
  });

// =====================================================
// UPDATE COMPLETE REQUEST
// PUT /api/housekeeping/:id
// =====================================================

const updateHousekeepingRequest =
  asyncHandler(async (req, res) => {
    const request =
      await Housekeeping.findByIdAndUpdate(
        req.params.id,

        req.body,

        {
          new: true,
          runValidators: true,
        }
      ).populate(
        "room",
        "roomNumber type"
      );

    if (!request) {
      res.status(404);

      throw new Error(
        "Housekeeping request not found"
      );
    }

    res.status(200).json({
      success: true,
      message:
        "Housekeeping request updated successfully",
      request,
    });
  });

// =====================================================
// DELETE REQUEST
// DELETE /api/housekeeping/:id
// =====================================================

const deleteHousekeepingRequest =
  asyncHandler(async (req, res) => {
    const request =
      await Housekeeping.findById(
        req.params.id
      );

    if (!request) {
      res.status(404);

      throw new Error(
        "Housekeeping request not found"
      );
    }

    await request.deleteOne();

    res.status(200).json({
      success: true,
      message:
        "Housekeeping request deleted successfully",
    });
  });

module.exports = {
  getAllHousekeepingRequests,
  getHousekeepingRequest,
  createHousekeepingRequest,
  updateHousekeepingStatus,
  updateHousekeepingRequest,
  deleteHousekeepingRequest,
};