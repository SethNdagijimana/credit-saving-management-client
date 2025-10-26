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

    req.user = user

    next()
  } catch (error) {
    console.error("Auth Middleware Error:", error)
    return res.status(401).json({ message: "Unauthorized or invalid token" })
  }
}
