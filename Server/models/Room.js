const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
   roomNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    type: {
      type: String,
      required: true,
      enum: ["Standard", "Deluxe", "Suite", "Executive", "Presidential"],
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: ["available", "occupied", "reserved", "cleaning", "maintenance"],
      default: "available",
    },

    floor: {
      type: Number,
      required: true,
    },

    area: {
      type: String,
      default: "",
    },

    guests: {
      type: Number,
      default: 2,
    },

    size: {
      type: String,
      default: "",
    },

    bed: {
      type: String,
      default: "",
    },

    view: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    amenities: {
      type: [String],
      default: [],
    },

    highlights: {
      type: [String],
      default: [],
    },

    image: {
      type: String,
      default: "",
    },

    gallery: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Room", roomSchema);