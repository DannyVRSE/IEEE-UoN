import express from 'express';
import memberController from '../../Controllers/memberController.js';
import saveMember from '../../Middlewares/memberAuth.js';
import authenticate from '../../Middlewares/passport.js';

const router = express.Router();
const { signUp, verifyEmail, login, getAuthStatus, joinSociety, modifyMemberInfo } = memberController

//sign up
router.post("/signup", saveMember, signUp);
//email verification
router.get("/verify-email/:id/:token", verifyEmail);
//join society
router.post("/memberships", authenticate, joinSociety);
//auth status
router.get("/auth-status", authenticate, getAuthStatus );
//log in
router.post("/login", login);
//modify member info
router.patch("/", authenticate, modifyMemberInfo);

export default router;