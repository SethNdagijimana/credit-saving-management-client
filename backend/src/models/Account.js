import pool from "../utils/db.js"

class Account {
  static async createForUser(userId, currency = "RWF") {
    const result = await pool.query(
      `INSERT INTO accounts (user_id, account_number, currency)
       VALUES ($1, nextval('account_number_seq')::bigint, $2)
       RETURNING *`,
      [userId, currency]
    )
    return result.rows[0]
  }

  static async findByUserId(userId) {
    const result = await pool.query(
      `SELECT * FROM accounts WHERE user_id = $1`,
      [userId]
    )
    return result.rows[0] || null
  }

  static async updateBalance(accountId, newBalance) {
    const result = await pool.query(
      `UPDATE accounts SET balance = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
      [newBalance, accountId]
    )
    return result.rows[0] || null
  }
}

export default Account
