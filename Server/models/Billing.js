// Billing schema — itemized charges, tax, payment status
const mongoose = require("mongoose");

const chargeItemSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    quantity: { type: Number, default: 1 },
    amount: { type: Number, required: true }, // total for this line (qty * unit already applied)
  },
  { _id: false }
);

const billingSchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
      unique: true, // one billing record per booking — prevents duplicate invoices
    },
    guest: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    invoiceNumber: { type: String, required: true, unique: true },

    // Itemized charges — room charge is always the first line, additional
    // charges (services/orders) can be appended without touching the booking.
    charges: { type: [chargeItemSchema], default: [] },

    subtotal: { type: Number, required: true, default: 0 },
    taxRate: { type: Number, default: 0.1 }, // 10%
    taxAmount: { type: Number, required: true, default: 0 },
    discountAmount: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true, default: 0 },

    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid"],
      default: "unpaid",
    },
    paymentMethod: {
      type: String,
      enum: ["", "card", "cash", "bank-transfer"],
      default: "",
    },
    transactionId: { type: String, default: "" },
    paidAt: { type: Date, default: null },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Billing", billingSchema);
