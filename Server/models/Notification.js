const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    // Either a specific user, or a whole role (e.g. every "housekeeping" user)
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    recipientRole: {
      type: String,
      enum: ["admin", "manager", "receptionist", "housekeeping", "guest", null],
      default: null,
    },
    title: { type: String, required: true },
    detail: { type: String, default: "" },
    type: {
      type: String,
      enum: ["booking", "maintenance", "order", "system"],
      default: "system",
    },
    link: { type: String, default: "" }, // frontend route to open when clicked
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

notificationSchema.index({ recipient: 1, createdAt: -1 });
notificationSchema.index({ recipientRole: 1, createdAt: -1 });

module.exports = mongoose.model("Notification", notificationSchema);
