const mongoose = require("mongoose");

const SERVICE_CHARGE_RATE = 0.10;
const TAX_RATE = 0.08;

const orderItemSchema = new mongoose.Schema(
  {
    service: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
    name: { type: String, required: true },      // snapshot at order time
    price: { type: Number, required: true },      // snapshot at order time
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    guest: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: {
      type: [orderItemSchema],
      validate: (items) => items.length > 0,
    },
    specialInstructions: { type: String, default: "", trim: true },
    subtotal: { type: Number, required: true },
    serviceCharge: { type: Number, required: true },
    taxes: { type: Number, required: true },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

orderSchema.statics.RATES = { SERVICE_CHARGE_RATE, TAX_RATE };

module.exports = mongoose.model("Order", orderSchema);