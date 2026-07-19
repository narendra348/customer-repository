const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const ComplaintHistory = require("../models/ComplaintHistory");

router.get("/:id", auth, async (req, res) => {

  try {

    const history = await ComplaintHistory.find({
      complaint: req.params.id,
    })
      .populate("user", "name")
      .sort({ createdAt: 1 });

    res.json({
      success: true,
      history,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

});

module.exports = router;