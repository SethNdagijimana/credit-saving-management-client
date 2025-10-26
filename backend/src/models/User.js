import pool from "../utils/db.js"

class User {
  static async findByEmail(email) {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email
    ])
    return result.rows[0]
  }

  // Find user by ID
  static async findById(id) {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id])
    return result.rows[0]
  }

  // Create new user
  static async create({ name, email, password, deviceId }) {
    const result = await pool.query(
      `INSERT INTO users (name, email, password, device_id, verified)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, email, device_id, verified, created_at`,
      [name, email, password, deviceId, false]
    )
    return result.rows[0]
  }

  // Update user
  static async update(id, updates) {
    const { name, email, verified } = updates
    const result = await pool.query(
      `UPDATE users
       SET name = COALESCE($1, name),
           email = COALESCE($2, email),
           verified = COALESCE($3, verified),
           updated_at = NOW()
       WHERE id = $4
       RETURNING id, name, email, device_id, verified`,
      [name, email, verified, id]
    )
    return result.rows[0]
  }

  // Delete user
  static async delete(id) {
    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING id",
      [id]
    )
    return result.rows[0]
  }

  // Get all users
  static async findAll() {
    const result = await pool.query(
      "SELECT id, name, email, device_id, verified, created_at FROM users ORDER BY created_at DESC"
    )
    return result.rows
  }
}

export default User
