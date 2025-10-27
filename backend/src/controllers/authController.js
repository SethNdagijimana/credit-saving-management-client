import jwt from "jsonwebtoken"
import { v4 as uuidv4 } from "uuid"
import { userDTO } from "../dtos/userDTO.js"
import {
  loginUserService,
  registerUserService
} from "../services/userService.js"

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" })

    const deviceId = uuidv4()
    const newUser = await registerUserService(name, email, password, deviceId)

    res.status(201).json({
      message: "User registered successfully",
      user: userDTO(newUser)
    })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    const result = await loginUserService(email, password)

    if (result.notVerified) {
      return res.status(403).json({
        message: "Device not verified. Wait for admin approval.",
        deviceId: result.deviceId
      })
    }

    const token = jwt.sign({ id: result.user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h"
    })

    res.json({
      message: "Login successful",
      token,
      user: userDTO(result.user)
    })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}
