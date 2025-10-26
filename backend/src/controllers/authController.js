import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { v4 as uuidv4 } from "uuid"
import User from "../models/User.js"

// REGISTER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" })
    }

    // Check if email exists (using model) ✅
    const existing = await User.findByEmail(email)
    if (existing) {
      return res.status(400).json({ message: "Email already exists" })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Generate unique device ID
    const deviceId = uuidv4()

    // Create user (using model) ✅
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      deviceId
    })

    res.status(201).json({
      message: "User registered successfully",
      user: newUser
    })
  } catch (error) {
    console.error("Registration error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" })
    }

    // Find user by email (using model) ✅
    const user = await User.findByEmail(email)
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        deviceId: user.device_id,
        verified: user.verified
      }
    })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({ message: "Server error" })
  }
}
