import express from "express";
import { authenticate } from "../middlewares/auth";

import {
  getFollowers,
  addFollow,
  getFollowings,
  unfollow,
  getMyFollowings,
  getMyFollowers,
} from "../controllers/follow";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Follow
 *   description: Follow endpoints
 */

/**
 * @swagger
 * /followers:
 *   get:
 *     summary: Get followers
 *     tags: [Follow]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of followers
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
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  code:
 *                    type: integer
 *                  status:
 *                    type: string
 *                  message:
 *                    type: string
 */
router.get("/followers", authenticate, getFollowers);

/**
 * @swagger
 * /followings:
 *   get:
 *     summary: Get followings
 *     tags: [Follow]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of followings
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
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  code:
 *                    type: integer
 *                  status:
 *                    type: string
 *                  message:
 *                    type: string
 */
router.get("/followings", authenticate, getFollowings);

/**
 * @swagger
 * /add-follow:
 *   post:
 *     summary: Add follow
 *     tags: [Follow]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Follow added successfully
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
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  code:
 *                    type: integer
 *                  status:
 *                    type: string
 *                  message:
 *                    type: string
 */
router.post("/add-follow", authenticate, addFollow);

/**
 * @swagger
 * /unfollow:
 *   delete:
 *     summary: Unfollow
 *     tags: [Follow]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully unfollow
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
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  code:
 *                    type: integer
 *                  status:
 *                    type: string
 *                  message:
 *                    type: string
 */
router.delete("/unfollow", authenticate, unfollow);

/**
 * @swagger
 * /me:
 *   get:
 *     summary: Get my followings
 *     tags: [Follow]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of my followings
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
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  code:
 *                    type: integer
 *                  status:
 *                    type: string
 *                  message:
 *                    type: string
 */
router.get("/me", authenticate, getMyFollowings);

/**
 * @swagger
 * /me-followers:
 *   get:
 *     summary: Get my followers
 *     tags: [Follow]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of my followers
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
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  code:
 *                    type: integer
 *                  status:
 *                    type: string
 *                  message:
 *                    type: string
 */
router.get("/me-followers", authenticate, getMyFollowers);

export default router;
