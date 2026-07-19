const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const role = require("../middleware/role");

const Complaint = require("../models/Complaint");

router.get("/", auth, role("admin"), async (req, res) => {
  try {

    const complaints = await Complaint.find()
      .populate("customer", "name email")
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      reports: complaints,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});

module.exports = router;