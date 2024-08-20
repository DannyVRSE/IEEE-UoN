import express from "express";
import authenticate from "../Middlewares/passport.js";
import adminController from "../Controllers/adminController.js";

const {getMembers}= adminController

const router=express.Router();

router.get("/:societyName/members", authenticate, getMembers);

export default router;