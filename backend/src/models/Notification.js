import pool from "../utils/db.js"

class Notification {
  static async create({ userId, type, message }) {
    await pool.query(
      "INSERT INTO notifications (user_id, type, message) VALUES ($1, $2, $3)",
      [userId, type, message]
    )
  }

  static async getByUser(userId) {
    const result = await pool.query(
      `SELECT * FROM notifications
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [userId]
    )
    return result.rows
  }

  static async markAllRead(userId) {
    await pool.query(
      `UPDATE notifications
     SET is_read = TRUE
     WHERE user_id = $1`,
      [userId]
    )
  }
}

export default Notification
