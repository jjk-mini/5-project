const asyncHandler = require("express-async-handler");
const Notification = require("../models/Notification");

// @desc    Get the logged-in user's notifications (their own + their role's)
// @route   GET /api/notifications
const getMyNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({
    $or: [{ recipient: req.user._id }, { recipientRole: req.user.role }],
  })
    .sort({ createdAt: -1 })
    .limit(30);

  const unreadCount = notifications.filter((n) => !n.read).length;

  res.json({ notifications, unreadCount });
});

// @desc    Mark one notification as read
// @route   PATCH /api/notifications/:id/read
const markAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);
  if (!notification) {
    res.status(404);
    throw new Error("Notification not found");
  }
  notification.read = true;
  await notification.save();
  res.json(notification);
});

// @desc    Mark all of the logged-in user's notifications as read
// @route   PATCH /api/notifications/read-all
const markAllAsRead = asyncHandler(async (req, res) => {
  await Notification.updateMany(
    { $or: [{ recipient: req.user._id }, { recipientRole: req.user.role }], read: false },
    { $set: { read: true } }
  );
  res.json({ success: true });
});

module.exports = { getMyNotifications, markAsRead, markAllAsRead };
