const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const User = require("../models/User");

const STAFF_ROLES = ["admin", "manager", "receptionist", "housekeeping"];

// Generates a readable-ish random temp password, e.g. "k3F9-mQ2r"
const generateTempPassword = () =>
  crypto.randomBytes(6).toString("base64").replace(/[^a-zA-Z0-9]/g, "").slice(0, 10);

// ===========================
// Get All Staff (real User accounts only, never guests)
// ===========================
const getStaff = asyncHandler(async (req, res) => {
  const staff = await User.find({ role: { $in: STAFF_ROLES } }).sort({ createdAt: -1 });
  res.status(200).json(staff);
});

// ===========================
// Add Staff — creates a REAL login account with a system-generated
// temporary password. Admin-only (enforced in routes too).
// ===========================
const addStaff = asyncHandler(async (req, res) => {
  const { name, email, role } = req.body;

  if (!name || !email || !role) {
    res.status(400);
    throw new Error("Name, email, and role are required");
  }

  const normalizedRole = role.toLowerCase();
  if (!STAFF_ROLES.includes(normalizedRole)) {
    res.status(400);
    throw new Error(`Role must be one of: ${STAFF_ROLES.join(", ")}`);
  }

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    res.status(400).json({ message: "Email already exists." });
    return;
  }

  const tempPassword = generateTempPassword();

  const staff = await User.create({
    name,
    email: email.toLowerCase(),
    password: tempPassword, // hashed automatically by the User model's pre-save hook
    role: normalizedRole,
  });

  // Return the temp password ONCE — it isn't stored anywhere in plain text
  // and isn't retrievable again after this response.
  res.status(201).json({
    _id: staff._id,
    name: staff.name,
    email: staff.email,
    role: staff.role,
    createdAt: staff.createdAt,
    tempPassword,
  });
});

// ===========================
// Update Staff (name/email/role only — not password)
// ===========================
const updateStaff = asyncHandler(async (req, res) => {
  const staff = await User.findOne({ _id: req.params.id, role: { $in: STAFF_ROLES } });
  if (!staff) {
    res.status(404);
    throw new Error("Staff not found");
  }

  const { name, email, role } = req.body;

  if (name) staff.name = name;
  if (email) staff.email = email.toLowerCase();
  if (role) {
    const normalizedRole = role.toLowerCase();
    if (!STAFF_ROLES.includes(normalizedRole)) {
      res.status(400);
      throw new Error(`Role must be one of: ${STAFF_ROLES.join(", ")}`);
    }
    staff.role = normalizedRole;
  }

  await staff.save();
  res.json(staff);
});

// ===========================
// Delete Staff (never touches guest accounts)
// ===========================
const deleteStaff = asyncHandler(async (req, res) => {
  const staff = await User.findOneAndDelete({ _id: req.params.id, role: { $in: STAFF_ROLES } });
  if (!staff) {
    res.status(404);
    throw new Error("Staff not found");
  }
  res.json({ message: "Staff deleted successfully" });
});

module.exports = {
  getStaff,
  addStaff,
  updateStaff,
  deleteStaff,
};
