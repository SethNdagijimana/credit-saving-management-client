import jwt from "jsonwebtoken"
import User from "../models/User.js"

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Authorization token missing or invalid" })
    }

    const token = authHeader.split(" ")[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findById(decoded.id)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    if (!user.verified) {
      return res.status(403).json({
        message: "Device not verified by admin",
        deviceId: user.device_id
      })
    }

    // Assign clean user object to req.user
    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      verified: user.verified,
      deviceId: user.device_id
    }

    next()
  } catch (error) {
    console.error("Auth Middleware Error:", error)
    return res.status(401).json({ message: "Unauthorized or invalid token" })
  }
}
