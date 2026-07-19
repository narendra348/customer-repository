const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const Comment = require("../models/Comment");


// Add Comment
router.post("/", auth, async (req,res)=>{

    try{

        const comment=await Comment.create({

            complaint:req.body.complaintId,
            user:req.user.id,
            message:req.body.message

        });

        res.status(201).json({

            success:true,
            message:"Comment Added Successfully",
            comment

        });

    }

    catch(error){

        res.status(500).json({

            success:false,
            message:error.message

        });

    }

});


// Get Comments
router.get("/:complaintId",auth,async(req,res)=>{

    try{

        const comments=await Comment.find({

            complaint:req.params.complaintId

        })
        .populate("user","name role")
        .sort({createdAt:1});

        res.json({

            success:true,
            comments

        });

    }

    catch(error){

        res.status(500).json({

            success:false,
            message:error.message

        });

    }

});

module.exports=router;