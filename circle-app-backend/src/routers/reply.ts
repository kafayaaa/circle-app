import express from "express";
import { authenticate } from "../middlewares/auth";
import { getThreadReplies, addThreadReplies } from "../controllers/reply";
import { upload_reply } from "../utils/multer";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reply
 *   description: Reply endpoints
 */

/**
 * @swagger
 * /reply/{thread_id}:
 *   get:
 *     summary: Get thread replies
 *     tags: [Reply]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: thread_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thread replies
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
 *                   type: object
 *                   properties:
 *                     replies:
 *                       type: array
 *                       items:
 *                         type: object
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
router.get("/:thread_id", authenticate, getThreadReplies);

/**
 * @swagger
 * /add-reply/{thread_id}:
 *   post:
 *     summary: Add reply
 *     tags: [Reply]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: thread_id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Reply added successfully
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
 *                   type: object
 *                   properties:
 *                     reply:
 *                       type: object
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
router.post(
  "/add-reply/:thread_id",
  authenticate,
  upload_reply.single("image"),
  addThreadReplies
);

export default router;
