import express from "express";
import { authenticate } from "../middlewares/auth";
import { getLike, handleLike } from "../controllers/like";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Like
 *   description: Like endpoints
 */

/**
 * @swagger
 * /likes:
 *   get:
 *     summary: Get all likes
 *     tags: [Like]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all likes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 */
router.get("/likes", authenticate, getLike);

/**
 * @swagger
 * /handle-like:
 *   post:
 *     summary: Handle like
 *     tags: [Like]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Like handled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 */
router.post("/handle-like", authenticate, handleLike);

export default router;
