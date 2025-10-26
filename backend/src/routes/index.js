import express from "express"
import { loginUser, registerUser } from "../controllers/authController.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"
import User from "../models/User.js"

const router = express.Router()

/**
 * @swagger
 * /:
 *   get:
 *     summary: Health check
 *     description: Returns a simple welcome message to confirm API works.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Welcome to Credit Jambo Client API
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password, deviceId]
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: secret123
 *
 *     responses:
 *       201:
 *         description: User registered successfully
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password, deviceId]
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: secret123
 *
 *     responses:
 *       200:
 *         description: Login successful (returns JWT)
 */

// Auth routes
router.post("/auth/register", registerUser)
router.post("/auth/login", loginUser)

router.get("/users", async (req, res) => {
  try {
    const users = await User.findAll()
    res.json({ users })
  } catch (error) {
    console.error("Error fetching users:", error)
    res.status(500).json({ message: "Server error" })
  }
})

router.get("/", (req, res) => {
  res.json({ message: "Welcome to Credit Jambo Client API" })
})

router.get("/protected", authMiddleware, (req, res) => {
  res.json({
    message: `Welcome, ${req.user.name}! You are authorized.`
  })
})

export default router
