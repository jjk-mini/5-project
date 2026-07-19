// Feedback schema — rating, review, guest
const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    guestName: {
      type: String,
      required: true,
    },

    guestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      required: true,
    },

    // room: {
    //   type: String,
    //   default: "Guest Room",
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Feedback", feedbackSchema);