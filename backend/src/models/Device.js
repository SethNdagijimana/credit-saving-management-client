import pool from "../utils/db.js"

class Device {
  static async create({
    userId,
    deviceId,
    deviceType = null,
    deviceName = null,
    ip = null,
    userAgent = null,
    verificationToken = null
  }) {
    const result = await pool.query(
      `INSERT INTO devices
        (user_id, device_id, device_type, device_name, ip_address, user_agent, verification_token)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       RETURNING *`,
      [
        userId,
        deviceId,
        deviceType,
        deviceName,
        ip,
        userAgent,
        verificationToken
      ]
    )
    return result.rows[0]
  }

  static async findByUserAndDevice(userId, deviceId) {
    const result = await pool.query(
      `SELECT * FROM devices WHERE user_id = $1 AND device_id = $2`,
      [userId, deviceId]
    )
    return result.rows[0] || null
  }

  static async findByDeviceId(deviceId) {
    const result = await pool.query(
      `SELECT * FROM devices WHERE device_id = $1`,
      [deviceId]
    )
    return result.rows[0] || null
  }

  static async listByUser(userId) {
    const result = await pool.query(
      `SELECT * FROM devices WHERE user_id = $1 ORDER BY last_seen_at DESC`,
      [userId]
    )
    return result.rows
  }

  static async verify(deviceId) {
    const result = await pool.query(
      `UPDATE devices SET is_verified = TRUE, verified_at = NOW(), verification_token = NULL WHERE device_id = $1 RETURNING *`,
      [deviceId]
    )
    return result.rows[0] || null
  }

  static async markSeen(deviceId, ip = null, userAgent = null) {
    const result = await pool.query(
      `UPDATE devices SET last_seen_at = NOW(), ip_address = COALESCE($2, ip_address), user_agent = COALESCE($3, user_agent) WHERE device_id = $1 RETURNING *`,
      [deviceId, ip, userAgent]
    )
    return result.rows[0] || null
  }

  static async revoke(deviceId) {
    const result = await pool.query(
      `DELETE FROM devices WHERE device_id = $1 RETURNING *`,
      [deviceId]
    )
    return result.rows[0] || null
  }
}

export default Device
