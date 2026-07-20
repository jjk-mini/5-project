const mongoose = require("mongoose");

const maintenanceSchema = new mongoose.Schema(
  {
    guest: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    // Resolved automatically from the guest's active (checked-in) booking,
    // so staff always get an exact, verified room number.
    booking: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
    room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },

    issueType: {
      type: String,
      enum: [
        "Air Conditioner",
        "Electricity",
        "Water Leakage",
        "TV",
        "Door Lock",
        "Furniture",
        "Bathroom",
        "Other",
      ],
      required: true,
    },
    description: { type: String, default: "", trim: true },

    priority: {
      type: String,
      enum: ["Low", "Normal", "High", "Urgent"],
      default: "Normal",
    },

    status: {
      type: String,
      enum: ["Open", "In Progress", "Resolved"],
      default: "Open",
    },

    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    resolvedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Maintenance", maintenanceSchema);
