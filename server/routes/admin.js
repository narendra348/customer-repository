const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const role = require("../middleware/role");

const Complaint = require("../models/Complaint");
const User = require("../models/User");

/* ======================================
   View All Complaints (Admin Only)
====================================== */
router.get("/complaints", auth, role("admin"), async (req, res) => {
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

/* ======================================
   Get All Agents with Complaint Count
====================================== */
router.get("/agents", auth, role("admin"), async (req, res) => {
  try {

    // Get all agents
    const agents = await User.find({ role: "agent" }).select("-password");

    // Add complaint count for each agent
    const agentsWithCount = await Promise.all(

      agents.map(async (agent) => {

        const totalComplaints = await Complaint.countDocuments({
          assignedTo: agent._id,
        });

        return {
          ...agent.toObject(),
          totalComplaints,
        };

      })

    );

    res.json({
      success: true,
      agents: agentsWithCount,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});

/* ======================================
   Assign Complaint to Agent
====================================== */
router.put("/assign/:id", auth, role("admin"), async (req, res) => {
  try {

    const { agentId } = req.body;

    const agent = await User.findById(agentId);

    if (!agent) {
      return res.status(404).json({
        success: false,
        message: "Agent not found",
      });
    }

    if (agent.role !== "agent") {
      return res.status(400).json({
        success: false,
        message: "Selected user is not an agent",
      });
    }

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      {
        assignedTo: agentId,
        status: "In Progress",
      },
      {
        new: true,
      }
    )
      .populate("customer", "name email")
      .populate("assignedTo", "name email");

    res.json({
      success: true,
      message: "Complaint assigned successfully",
      complaint,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});

/* ======================================
   View All Users (Debug)
====================================== */
router.get("/users", async (req, res) => {
  try {

    const users = await User.find();

    res.json({
      success: true,
      users,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});

module.exports = router;