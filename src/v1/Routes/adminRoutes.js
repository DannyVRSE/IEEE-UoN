import express from "express";
import authenticate from "../../server/Middlewares/passport.js";
import adminController from "../../server/Controllers/adminController.js";

const {getMembers, manageMember}= adminController

const router=express.Router();

router.get("/:societyName/members", authenticate, getMembers);
router.patch("/:societyName/members", authenticate, manageMember);

export default router;