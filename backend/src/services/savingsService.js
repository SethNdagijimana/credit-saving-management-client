import Transaction from "../models/Transaction.js"
import pool from "../utils/db.js"

export const depositService = async (userId, amount, description, deviceId) => {
  if (amount <= 0) throw new Error("Amount must be greater than 0")

  // Get current balance
  const userResult = await pool.query(
    "SELECT balance FROM users WHERE id = $1",
    [userId]
  )
  const oldBalance = userResult.rows[0]?.balance ?? 0
  const newBalance = oldBalance + Number(amount)

  // Update balance
  await pool.query("UPDATE users SET balance = $1 WHERE id = $2", [
    newBalance,
    userId
  ])

  // Create transaction
  const transaction = await Transaction.create({
    userId,
    type: "deposit",
    amount,
    description,
    deviceId,
    newBalance
  })

  return { oldBalance, newBalance, transaction }
}

export const withdrawService = async (
  userId,
  amount,
  description,
  deviceId
) => {
  if (amount <= 0) throw new Error("Amount must be greater than 0")

  const userResult = await pool.query(
    "SELECT balance FROM users WHERE id = $1",
    [userId]
  )
  const oldBalance = userResult.rows[0]?.balance ?? 0

  if (oldBalance < amount) throw new Error("Insufficient balance")

  const newBalance = oldBalance - Number(amount)

  await pool.query("UPDATE users SET balance = $1 WHERE id = $2", [
    newBalance,
    userId
  ])

  const transaction = await Transaction.create({
    userId,
    type: "withdraw",
    amount,
    description,
    deviceId,
    newBalance
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
