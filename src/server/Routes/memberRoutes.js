import express from 'express';
import memberController from '../Controllers/memberController.js';
import saveMember from '../Middlewares/memberAuth.js';
import authenticate from '../Middlewares/passport.js';

const router = express.Router();
const { signUp, verifyEmail, login, getAuthStatus, joinSociety } = memberController
//sign up endpoint
router.post("/signup", saveMember, signUp);
//email verification endpoint
router.get("/verify-email/:id/:token", verifyEmail);
//join society endpoint
router.post("/memberships", authenticate, joinSociety);
//auth status
//modify and test 🚩
router.get("/auth-status", authenticate, getAuthStatus );

router.post("/login", login);

export default router;