import jwt from "jsonwebtoken"
import { v4 as uuidv4 } from "uuid"
import { userDTO } from "../dtos/userDTO.js"
import Device from "../models/Device.js"
import {
  loginUserService,
  registerUserService
} from "../services/userService.js"

export const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone_number,
      deviceId,
      deviceType,
      deviceName
    } = req.body

    if (!name || !email || !password || !phone_number)
      return res.status(400).json({ message: "All fields are required" })

    const clientDeviceId = deviceId || uuidv4()

    const { user: newUser, account } = await registerUserService(
      name,
      email,
      password,
      phone_number
    )

    await Device.create({
      userId: newUser.id,
      deviceId: clientDeviceId,
      deviceType: deviceType || null,
      deviceName: deviceName || null,
      ip: req.ip,
      userAgent: req.get("User-Agent"),
      verificationToken: null,
      is_verified: newUser.verified
    })

    res.status(201).json({
      message: "User registered successfully",
      user: await userDTO(newUser),
      deviceId: clientDeviceId
    })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

export const loginUser = async (req, res) => {
  try {
    const { email, password, deviceId: deviceIdFromBody } = req.body

    const headerDeviceId = req.headers["x-device-id"]
    const deviceId = deviceIdFromBody || headerDeviceId

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" })
    }

    const { user } = await loginUserService(email, password)

    let clientDeviceId = deviceId
    if (!clientDeviceId) {
      clientDeviceId = uuidv4()
    }

    let device = await Device.findByUserAndDevice(user.id, clientDeviceId)
    if (!device) {
      device = await Device.create({
        userId: user.id,
        deviceId: clientDeviceId,
        ip: req.ip,
        userAgent: req.get("User-Agent"),
        verificationToken: null
      })
    }

    if (user.verified && !device.is_verified) {
      await Device.verify(clientDeviceId)
      device.is_verified = true
    }

    Device.markSeen(clientDeviceId, req.ip, req.get("User-Agent")).catch(
      console.error
    )

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h"
    })

    res.json({
      message: "Login successful",
      token,
      deviceId: clientDeviceId,
      user: await userDTO(user)
    })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}
