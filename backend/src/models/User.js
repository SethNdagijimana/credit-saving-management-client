import pool from "../utils/db.js"

class User {
  static async findByEmail(email) {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email
    ])
    return result.rows[0]
  }

  static async findById(id) {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id])
    return result.rows[0]
  }

  static async create({ name, email, password, phone_number, salt, deviceId }) {
    const result = await pool.query(
      `INSERT INTO users (name, email, password, phone_number, salt, device_id, verified)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING id, name, email, phone_number, device_id, verified, created_at`,
      [name, email, password, phone_number, salt, deviceId, false]
    )
    return result.rows[0]
  }

  static async update(id, updates) {
    const { name, email, phone_number, verified } = updates
    const result = await pool.query(
      `UPDATE users
       SET name = COALESCE($1, name),
           email = COALESCE($2, email),
           phone_number= COALESCE($3, phone_number),
           verified = COALESCE($4, verified),
           updated_at = NOW()
       WHERE id = $4
       RETURNING id, name, email, phone_number, device_id, verified`,
      [name, email, phone_number, verified, id]
    )
    return result.rows[0]
  }

  static async delete(id) {
    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING id",
      [id]
    )
    return result.rows[0]
  }

  static async findAll() {
    const result = await pool.query(
      "SELECT id, name, email, phone_number, device_id, verified, created_at FROM users ORDER BY created_at DESC"
    )
    return result.rows
  }
}

export default User
