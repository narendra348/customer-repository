const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const role = require("../middleware/role");

const Complaint = require("../models/Complaint");
const User = require("../models/User");
const Notification = require("../models/Notification");
const ComplaintHistory = require("../models/ComplaintHistory");

// ==============================
// Create Complaint (Customer)
// ==============================
router.post("/", auth, role("customer"), async (req, res) => {
  try {
    // Create Complaint
    const complaint = new Complaint({
      ...req.body,
      customer: req.user.id,
    });

    await complaint.save();

    // Save Complaint History
    await ComplaintHistory.create({
      complaint: complaint._id,
      action: "Complaint Submitted",
      user: req.user.id,
    });

    // Customer Notification
    await Notification.create({
      user: req.user.id,
      title: "Complaint Submitted",
      message: `Your complaint "${complaint.title}" has been submitted successfully.`,
    });

    // Notify All Admins
    const admins = await User.find({ role: "admin" });

    for (const admin of admins) {
      await Notification.create({
        user: admin._id,
        title: "New Complaint",
        message: `A new complaint "${complaint.title}" has been submitted by a customer.`,
      });
    }

    res.status(201).json({
      success: true,
      message: "Complaint submitted successfully",
      complaint,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ==============================
// Get All Complaints
// ==============================
router.get("/", auth, async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("customer", "name email")
      .populate("assignedTo", "name email");

    res.json({
      success: true,
      complaints,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ==============================
// Get Single Complaint
// ==============================
router.get("/:id", auth, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate("customer", "name email")
      .populate("assignedTo", "name email");

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    res.json({
      success: true,
      complaint,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;