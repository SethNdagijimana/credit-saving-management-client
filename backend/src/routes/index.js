import express from "express"
import { loginUser, registerUser } from "../controllers/authController.js"
import {
  deposit,
  getMyTransactions,
  withdraw
} from "../controllers/savingsController.js"
import { userDTO } from "../dtos/userDTO.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"
import User from "../models/User.js"

// ✅ Validation imports
import { body } from "express-validator"
import { adminMiddleware } from "../middlewares/adminMiddleware.js"
import { validate } from "../middlewares/validationMiddleware.js"

const router = express.Router()

router.post(
  "/auth/register",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").trim().isEmail().withMessage("Valid email required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters")
  ],
  validate,
  registerUser
)

router.post(
  "/auth/login",
  [
    body("email").trim().isEmail().withMessage("Valid email required"),
    body("password").notEmpty().withMessage("Password required")
  ],
  validate,
  loginUser
)

router.post(
  "/savings/deposit",
  authMiddleware,
  [
    body("amount")
      .isFloat({ min: 0.01 })
      .withMessage("Amount must be greater than 0")
  ],
  validate,
  deposit
)

router.post(
  "/savings/withdraw",
  authMiddleware,
  [
    body("amount")
      .isFloat({ min: 0.01 })
      .withMessage("Amount must be greater than 0")
  ],
  validate,
  withdraw
)

router.get("/savings/transactions", authMiddleware, getMyTransactions)

router.get("/users", authMiddleware, adminMiddleware, async (req, res) => {
  const users = await User.findAll()
  res.json({ users: users.map(userDTO) })
})

router.get("/", (req, res) => {
  res.json({ message: "Welcome to Credit Jambo Client API" })
})

export default router
