import jwt from "jsonwebtoken"
import Device from "../models/Device.js"
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

    const deviceId =
      req.headers["x-device-id"] || req.body.deviceId || req.query.deviceId

    if (!deviceId) {
      return res.status(400).json({
        message: "Device ID missing. Include x-device-id header."
      })
    }

    const device = await Device.findByUserAndDevice(user.id, deviceId)

    if (!device) {
      return res.status(403).json({
        message: "Device not registered",
        deviceId
      })
    }

    if (!device.is_verified) {
      return res.status(403).json({
        message: "Device not verified. Please verify your device.",
        deviceId
      })
    }

    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      deviceId
    }

    Device.markSeen(deviceId, req.ip, req.get("User-Agent")).catch(
      console.error
    )

    next()
  } catch (error) {
    console.error("Auth Middleware Error:", error)
    return res.status(401).json({ message: "Unauthorized or invalid token" })
  }
}
