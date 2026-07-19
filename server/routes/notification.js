const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const Notification = require("../models/Notification");

// ==========================
// Get Logged-in User Notifications
// ==========================
router.get("/", auth, async (req, res) => {
  try {

    const notifications = await Notification.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      notifications,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});

// ==========================
// Mark Notification as Read
// ==========================
router.put("/:id", auth, async (req, res) => {

  try {

    const notification = await Notification.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    notification.read = true;

    await notification.save();

    res.json({
      success: true,
      message: "Notification marked as read",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

});

module.exports = router;