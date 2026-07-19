// Contact controller — public contact form submissions
const asyncHandler = require("express-async-handler");
const Contact = require("../models/Contact");

const submitContactForm = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, phone, subject, message } = req.body;

  if (!firstName || !lastName || !email || !message) {
    res.status(400);
    throw new Error("First name, last name, email, and message are required");
  }

  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    res.status(400);
    throw new Error("Please provide a valid email address");
  }

  const contact = await Contact.create({
    firstName,
    lastName,
    email,
    phone,
    subject,
    message,
  });

  res.status(201).json({
    success: true,
    message: "Your message has been received. We'll get back to you soon.",
    contact,
  });
});

module.exports = { submitContactForm };