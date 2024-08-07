import express from 'express';
import memberController from '../Controllers/memberController.js';
import saveMember from '../Middlewares/memberAuth.js';

const router = express.Router();
const {signUp, verifyEmail}=memberController
//sign up endpoint
router.post("/signup",saveMember, signUp);
//email verification endpoint
router.get("/verify-email/:id/:token", verifyEmail);

export default router;