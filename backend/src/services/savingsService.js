import Notification from "../models/Notification.js"
import Transaction from "../models/Transaction.js"
import pool from "../utils/db.js"

export const depositService = async (userId, amount, description, deviceId) => {
  if (Number(amount) <= 0) throw new Error("Amount must be greater than 0")

  const userResult = await pool.query(
    "SELECT balance FROM users WHERE id = $1",
    [userId]
  )
  const oldBalanceRaw = userResult.rows[0]?.balance ?? "0"
  const oldBalance = parseFloat(oldBalanceRaw) || 0

  const depositAmount = parseFloat(amount)
  if (Number.isNaN(depositAmount)) throw new Error("Invalid amount")

  const newBalance = Number((oldBalance + depositAmount).toFixed(2))

  // Persist new balance
  await pool.query("UPDATE users SET balance = $1 WHERE id = $2", [
    newBalance,
    userId
  ])

  const transaction = await Transaction.create({
    userId,
    type: "deposit",
    amount: depositAmount,
    description,
    deviceId,
    newBalance
  })
  if (newBalance < 100) {
    await Notification.create({
      userId,
      type: "low_balance",
      message: `⚠️ Your balance is low: ${newBalance}`
    })
  }

  await Notification.create({
    userId,
    type: "deposit",
    message: `Deposit of ${depositAmount} was successful`
  })

  return { oldBalance, newBalance, transaction }
}

export const withdrawService = async (
  userId,
  amount,
  description,
  deviceId
) => {
  if (Number(amount) <= 0) throw new Error("Amount must be greater than 0")

  const userResult = await pool.query(
    "SELECT balance FROM users WHERE id = $1",
    [userId]
  )
  const oldBalance = parseFloat(userResult.rows[0]?.balance ?? "0") || 0
  const withdrawAmount = parseFloat(amount)

  if (oldBalance < withdrawAmount) throw new Error("Insufficient balance")

  const newBalance = Number((oldBalance - withdrawAmount).toFixed(2))

  await pool.query("UPDATE users SET balance = $1 WHERE id = $2", [
    newBalance,
    userId
  ])

  const transaction = await Transaction.create({
    userId,
    type: "withdraw",
    amount: withdrawAmount,
    description,
    deviceId,
    newBalance
  })

  await Notification.create({
    userId,
    type: "withdraw",
    message: `Withdrawal of ${withdrawAmount} was successful`
  })

  return { oldBalance, newBalance, transaction }
}

export const getTransactionsService = async (userId, page = 1, limit = 10) => {
  const offset = (page - 1) * limit

  const totalResult = await pool.query(
    "SELECT COUNT(*) FROM transactions WHERE user_id = $1",
    [userId]
  )

  const total = parseInt(totalResult.rows[0].count)

  const result = await pool.query(
    `SELECT * FROM transactions
     WHERE user_id = $1
     ORDER BY created_at DESC
     LIMIT $2 OFFSET $3`,
    [userId, limit, offset]
  )

  return {
    transactions: result.rows,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  }
}
