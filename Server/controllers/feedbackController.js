// Feedback controller — submit and get reviews
const Feedback = require("../models/Feedback");

// =========================
// Add Feedback
// =========================
const addFeedback = async (req, res) => {
  try {
    const { guestName, guestId, rating, comment, room } = req.body;

    const feedback = new Feedback({
      guestName,
      guestId,
      rating,
      comment,
      room,
    });

    await feedback.save();

    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully.",
      feedback,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =========================
// Get All Feedback
// =========================
const getAllFeedback = async (req, res) => {
  try {

    const feedback = await Feedback.find().sort({
      createdAt: -1,
    });

    res.status(200).json(feedback);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

module.exports = {
  addFeedback,
  getAllFeedback,
};