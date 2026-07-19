const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const role = require("../middleware/role");

router.get("/profile", auth, role("customer"), (req,res)=>{
    res.send("Customer Profile");
});

router.post("/complaint", auth, role("customer"), (req,res)=>{
    res.send("Complaint Raised");
});

module.exports = router;