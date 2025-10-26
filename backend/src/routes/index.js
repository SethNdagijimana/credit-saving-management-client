import express from "express"
import { loginUser, registerUser } from "../controllers/authController.js"
import User from "../models/User.js"

const router = express.Router()

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

export default router
