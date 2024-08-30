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

//documentation
/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Sign up a new member
 *     description: Registers a new member and sends a verification email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               registrationForm:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   reg_no:
 *                     type: string
 *                   year:
 *                     type: string
 *                   ieee_no:
 *                     type: integer
 *                     nullable: true
 *                   phone:
 *                     type: string
 *                   password:
 *                     type: string
 *     responses:
 *       201:
 *         description: Member created successfully.
 *       400:
 *         description: Invalid data.
 *       409:
 *         description: Details are not correct.
 *
 * /verify-email/{id}/{token}:
 *   get:
 *     summary: Verify member's email
 *     description: Verifies the member's email using the provided token.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Email verified successfully.
 *       400:
 *         description: Verification link may have expired.
 *       401:
 *         description: User not found or already verified.
 *       500:
 *         description: Error verifying email.
 *
 * /memberships:
 *   post:
 *     summary: Join a society
 *     description: Authenticated member joins a society.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               society:
 *                 type: string
 *     responses:
 *       201:
 *         description: Membership created successfully.
 *       500:
 *         description: Error creating membership.
 *
 * /auth-status:
 *   get:
 *     summary: Get authentication status
 *     description: Returns the authentication status and member information.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Authentication status and member info returned.
 *       401:
 *         description: User not authenticated.
 *
 * /login:
 *   post:
 *     summary: Log in a member
 *     description: Authenticates a member and returns a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               loginForm:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                   password:
 *                     type: string
 *     responses:
 *       200:
 *         description: Authentication successful, JWT token returned.
 *       401:
 *         description: Incorrect password or user not verified.
 *       404:
 *         description: User not found.
 *
 * /:
 *   patch:
 *     summary: Modify member information
 *     description: Updates member's personal information.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               modifyProfileForm:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   year:
 *                     type: string
 *                   ieee_no:
 *                     type: integer
 *                     nullable: true
 *                   phone:
 *                     type: string
 *     responses:
 *       200:
 *         description: Member info updated successfully.
 *       400:
 *         description: Invalid data.
 *       500:
 *         description: Error updating member info.
 */


export default router;