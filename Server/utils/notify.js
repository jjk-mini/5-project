const Notification = require("../models/Notification");

// Notify one specific user (e.g. the guest who made the booking)
const notifyUser = async ({ userId, title, detail = "", type = "system", link = "" }) => {
  try {
    await Notification.create({ recipient: userId, title, detail, type, link });
  } catch (err) {
    console.error("notifyUser failed:", err.message);
  }
};

// Notify everyone with a given role (e.g. all housekeeping staff about a
// new maintenance request, or all receptionists about a new order)
const notifyRole = async ({ role, title, detail = "", type = "system", link = "" }) => {
  try {
    await Notification.create({ recipientRole: role, title, detail, type, link });
  } catch (err) {
    console.error("notifyRole failed:", err.message);
  }
};

module.exports = { notifyUser, notifyRole };
