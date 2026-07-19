// // const mongoose = require("mongoose");

// // const CATEGORIES = [
// //   "Food & Drinks",
// //   "Laundry",
// //   "Spa & Wellness",
// //   "Housekeeping",
// //   "Room Service",
// //   "Transport",
// // ];

// // const serviceSchema = new mongoose.Schema(
// //   {
// //     name: {
// //       type: String,
// //       required: [true, "Service name is required"],
// //       trim: true,
// //     },
// //     description: {
// //       type: String,
// //       required: [true, "Description is required"],
// //       trim: true,
// //     },
// //     category: {
// //       type: String,
// //       required: true,
// //       enum: CATEGORIES,
// //     },
// //     price: {
// //       type: Number,
// //       required: true,
// //       min: 0,
// //     },
// //     image: {
// //       type: String,
// //       default: "",
// //     },
// //     rating: {
// //       type: Number,
// //       min: 0,
// //       max: 5,
// //       default: 5,
// //     },
// //     // Free-text so it can say "20 mins", "4 hours", or "Schedule Now"
// //     eta: {
// //       type: String,
// //       default: "",
// //     },
// //     status: {
// //       type: String,
// //       enum: ["available", "unavailable"],
// //       default: "available",
// //     },
// //     // Powers the "Curated for You" carousel
// //     curated: {
// //       type: Boolean,
// //       default: false,
// //     },
// //   },
// //   { timestamps: true }
// // );

// // serviceSchema.statics.CATEGORIES = CATEGORIES;

// module.exports = mongoose.model("Service", serviceSchema);