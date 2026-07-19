const Staff = require("../models/Staff");

// ===========================
// Get All Staff
// ===========================
const getStaff = async (req, res) => {
  try {
    const staff = await Staff.find().sort({ createdAt: -1 });

    res.status(200).json(staff);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===========================
// Add Staff
// ===========================
const addStaff = async (req, res) => {
  try {
    const { name, email, role } = req.body;

    const existing = await Staff.findOne({ email });

    if (existing) {
      return res.status(400).json({
        message: "Email already exists.",
      });
    }

    const staff = await Staff.create({
      name,
      email,
      role,
    });

    res.status(201).json(staff);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===========================
// Update Staff
// ===========================
const updateStaff = async (req, res) => {
  try {

    const staff = await Staff.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!staff) {
      return res.status(404).json({
        message: "Staff not found",
      });
    }

    res.json(staff);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===========================
// Delete Staff
// ===========================
const deleteStaff = async (req, res) => {
  try {

    const staff = await Staff.findByIdAndDelete(req.params.id);

    if (!staff) {
      return res.status(404).json({
        message: "Staff not found",
      });
    }

    res.json({
      message: "Staff deleted successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  getStaff,
  addStaff,
  updateStaff,
  deleteStaff,
};