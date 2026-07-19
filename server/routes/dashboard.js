const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const role = require("../middleware/role");

const Complaint = require("../models/Complaint");
const User = require("../models/User");

router.get("/stats", auth, role("admin"), async (req, res) => {
  try {

    const totalComplaints = await Complaint.countDocuments();

    const pending = await Complaint.countDocuments({
      status: "Pending",
    });

    const inProgress = await Complaint.countDocuments({
      status: "In Progress",
    });

    const resolved = await Complaint.countDocuments({
      status: "Resolved",
    });

    const customers = await User.countDocuments({
      role: "customer",
    });

    const agents = await User.countDocuments({
      role: "agent",
    });

    res.json({
      success: true,
      stats: {
        totalComplaints,
        pending,
        inProgress,
        resolved,
        customers,
        agents,
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});

module.exports = router;