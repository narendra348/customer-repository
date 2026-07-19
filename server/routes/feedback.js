const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const Feedback = require("../models/Feedback");

/* =====================================
   Submit Feedback
   POST /api/feedback
===================================== */
router.post("/", auth, async (req, res) => {
  try {

    const { complaintId, rating, message } = req.body;

    // Check if feedback already exists
    const existingFeedback = await Feedback.findOne({
      complaint: complaintId,
      customer: req.user.id,
    });

    if (existingFeedback) {
      return res.status(400).json({
        success: false,
        message: "Feedback already submitted",
      });
    }

    const feedback = await Feedback.create({
      complaint: complaintId,
      customer: req.user.id,
      rating,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Feedback Submitted Successfully",
      feedback,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});

/* =====================================
   Get Feedback by Complaint
   GET /api/feedback/:complaintId
===================================== */
router.get("/:complaintId", auth, async (req, res) => {
  try {

    const feedback = await Feedback.find({
      complaint: req.params.complaintId,
    })
      .populate("customer", "name email")
      .populate("complaint", "title status");

    res.json({
      success: true,
      feedback,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});

/* =====================================
   Update Feedback
   PUT /api/feedback/:id
===================================== */
router.put("/:id", auth, async (req, res) => {
  try {

    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found",
      });
    }

    // Only feedback owner can edit
    if (feedback.customer.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    feedback.rating = req.body.rating;
    feedback.message = req.body.message;

    await feedback.save();

    res.json({
      success: true,
      message: "Feedback Updated Successfully",
      feedback,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});

/* =====================================
   Delete Feedback
   DELETE /api/feedback/:id
===================================== */
router.delete("/:id", auth, async (req, res) => {
  try {

    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found",
      });
    }

    // Customer or Admin can delete
    if (
      feedback.customer.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    await Feedback.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Feedback Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});

module.exports = router;