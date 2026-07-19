const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const role = require("../middleware/role");

const Complaint = require("../models/Complaint");


// ================================
// Get All Assigned Complaints
// ================================
router.get("/tasks", auth, role("agent"), async (req, res) => {
  try {

    console.log("Logged in Agent ID:", req.user.id);

    const complaints = await Complaint.find({
      assignedTo: req.user.id,
    }).populate("customer", "name email");

    console.log("Complaints Found:", complaints.length);

    res.json({
      success: true,
      complaints,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// ================================
// Update Complaint Status
// ================================

router.put("/update/:id", auth, role("agent"), async (req, res) => {
  try {

    console.log("Logged in Agent ID:", req.user.id);

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    console.log("Complaint assignedTo:", complaint.assignedTo.toString());

    if (complaint.assignedTo.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "This complaint is not assigned to you.",
      });
    }

    complaint.status = req.body.status;

    await complaint.save();

    res.json({
      success: true,
      message: "Status Updated Successfully",
      complaint,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;