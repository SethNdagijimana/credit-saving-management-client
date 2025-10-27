import pool from "../utils/db.js"

class Transaction {
  static async create({
    userId,
    type,
    amount,
    description,
    deviceId,
    newBalance
  }) {
    const result = await pool.query(
      `
      INSERT INTO transactions
        (user_id, type, amount, description, new_balance, device_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
      `,
      [userId, type, amount, description, newBalance, deviceId]
    )

    return result.rows[0]
  }

  static async findByUserId(userId) {
    const result = await pool.query(
      `SELECT * FROM transactions WHERE user_id = $1 ORDER BY created_at DESC`,
      [userId]
    )
    return result.rows
  }

  static async getLastTransaction(userId) {
    const result = await pool.query(
      `
      SELECT * FROM transactions
      WHERE user_id = $1
      ORDER BY created_at DESC
      LIMIT 1
      `,
      [userId]
    )
    return result.rows[0] || null
  }
}

export default Transaction
