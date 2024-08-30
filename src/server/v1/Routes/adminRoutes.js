import express from "express";
import authenticate from "../../Middlewares/passport.js";
import adminController from "../../Controllers/adminController.js";

const { getMembers, manageMember } = adminController

const router = express.Router();

/**
 * @swagger
 * /api/v1/admin/{societyName}/members:
 *   get:
 *     summary: Get society members for a given society
 *     description: Retrieves all members of the specified society. Only accessible to users with advanced privileges.
 *     parameters:
 *       - in: path
 *         name: societyName
 *         required: true
 *         schema:
 *           type: string
 *           example: ieee_uon
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved society members.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   member_id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   year:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   role:
 *                     type: string
 *                   privilege_level:
 *                     type: string
 *                   ieee_no:
 *                     type: integer
 *                     nullable: true
 *       403:
 *         description: Forbidden access.
 *       404:
 *         description: Society not found.
 *       500:
 *         description: Internal server error.
 */

router.get("/:societyName/members", authenticate, getMembers);

/**
 * @swagger
 * /api/v1/admin/{societyName}/members:
 *   patch:
 *     summary: Modify a member
 *     description: Updates a member’s role and privilege level for a specific society. Only accessible to users with advanced privileges.
 *     parameters:
 *       - in: path
 *         name: societyName
 *         required: true
 *         schema:
 *           type: string
 *           example: ieee_uon
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               manageForm:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                   role:
 *                     type: string
 *                   society:
 *                     type: string
 *                   privilege:
 *                     type: string
 *     responses:
 *       200:
 *         description: Successfully updated member information.
 *       400:
 *         description: Invalid data provided.
 *       403:
 *         description: Forbidden access.
 *       404:
 *         description: Society or member not found.
 *       500:
 *         description: Internal server error.
 */
router.patch("/:societyName/members", authenticate, manageMember);

export default router;