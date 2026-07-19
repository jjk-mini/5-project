// Feedback routes — submit and view reviews
const express = require("express");
const {
  addFeedback,
  getAllFeedback,
} = require("../controllers/feedbackController");

const router = express.Router();

// Add Feedback
router.post("/", addFeedback);

// Get All Feedback
router.get("/", getAllFeedback);

module.exports = router;