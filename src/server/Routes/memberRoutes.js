import express from 'express';
import memberController from '../Controllers/memberController.js';
import saveMember from '../Middlewares/memberAuth.js';
import authenticate from '../Middlewares/passport.js';

const router = express.Router();
const { signUp, verifyEmail, login } = memberController
//sign up endpoint
router.post("/signup", saveMember, signUp);
//email verification endpoint
router.get("/verify-email/:id/:token", verifyEmail);
//auth status
router.get("/auth-status", authenticate, (req, res) => {
    if (req.user) {
        res.status(200).json({user: {name: req.user.name, email:req.user.email, accessTier: req.user.privilege_level}});
    } else {
        res.status(401).json({ auth: "false" });
    }
});

router.post("/login", login);

export default router;