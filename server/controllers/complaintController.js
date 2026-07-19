const Complaint = require("../models/Complaint");

// Create Complaint
exports.createComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.create(req.body);

    res.status(201).json({
      success: true,
      message: "Complaint Submitted Successfully",
      complaint
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// Get All Complaints
exports.getComplaints = async (req, res) => {
  try {

    const complaints = await Complaint.find()
      .populate("customer")
      .populate("agent");

    res.json({
      success: true,
      complaints
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
};

// Get Complaint by ID
exports.getComplaintById = async (req, res) => {

  try {

    const complaint = await Complaint.findById(req.params.id);

    res.json({
      success: true,
      complaint
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

};

// Update Complaint
exports.updateComplaint = async (req, res) => {

  try {

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      complaint
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

};

// Delete Complaint
exports.deleteComplaint = async (req, res) => {

  try {

    await Complaint.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Complaint Deleted"
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

};