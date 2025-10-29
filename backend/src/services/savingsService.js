import pool from "../utils/db.js"

export const depositService = async (userId, amount, description, deviceId) => {
  if (Number(amount) <= 0) throw new Error("Amount must be greater than 0")

  const client = await pool.connect()
  try {
    await client.query("BEGIN")

    const accRes = await client.query(
      `SELECT id, balance, account_number FROM accounts WHERE user_id = $1 FOR UPDATE`,
      [userId]
    )
    if (accRes.rowCount === 0) throw new Error("Account not found")

    const account = accRes.rows[0]
    const oldBalance = parseFloat(account.balance || 0)
    const depositAmount = parseFloat(amount)
    if (Number.isNaN(depositAmount)) throw new Error("Invalid amount")

    const newBalance = Number((oldBalance + depositAmount).toFixed(2))

    await client.query(
      `UPDATE accounts SET balance = $1, updated_at = NOW() WHERE id = $2`,
      [newBalance, account.id]
    )

    const trxRes = await client.query(
      `INSERT INTO transactions
         (user_id, type, amount, description, old_balance, new_balance, device_id, created_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,NOW())
       RETURNING *`,
      [
        userId,
        "deposit",
        depositAmount,
        description,
        oldBalance,
        newBalance,
        deviceId
      ]
    )
    const transaction = trxRes.rows[0]

    if (newBalance < 100) {
      await client.query(
        `INSERT INTO notifications (user_id, type, message, created_at) VALUES ($1,$2,$3,NOW())`,
        [userId, "low_balance", `⚠️ Your balance is low: ${newBalance}`]
      )
    }

    await client.query(
      `INSERT INTO notifications (user_id, type, message, created_at) VALUES ($1,$2,$3,NOW())`,
      [userId, "deposit", `Deposit of ${depositAmount} was successful`]
    )

    await client.query("COMMIT")
    return {
      oldBalance,
      newBalance,
      transaction,
      account: {
        account_number: account.account_number,
        balance: newBalance
      }
    }
  } catch (err) {
    await client.query("ROLLBACK").catch(() => {})
    throw err
  } finally {
    client.release()
  }
}

export const withdrawService = async (
  userId,
  amount,
  description,
  deviceId
) => {
  if (Number(amount) <= 0) throw new Error("Amount must be greater than 0")

  const client = await pool.connect()
  try {
    await client.query("BEGIN")

    const accRes = await client.query(
      `SELECT id, balance, account_number FROM accounts WHERE user_id = $1 FOR UPDATE`,
      [userId]
    )
    if (accRes.rowCount === 0) throw new Error("Account not found")

    const account = accRes.rows[0]
    const oldBalance = parseFloat(account.balance || 0)
    const withdrawAmount = parseFloat(amount)

    if (Number.isNaN(withdrawAmount)) throw new Error("Invalid amount")
    if (oldBalance < withdrawAmount) throw new Error("Insufficient balance")

    const newBalance = Number((oldBalance - withdrawAmount).toFixed(2))

    await client.query(
      `UPDATE accounts SET balance = $1, updated_at = NOW() WHERE id = $2`,
      [newBalance, account.id]
    )

    const trxRes = await client.query(
      `INSERT INTO transactions
         (user_id, type, amount, description, old_balance, new_balance, device_id, created_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,NOW())
       RETURNING *`,
      [
        userId,
        "withdraw",
        withdrawAmount,
        description,
        oldBalance,
        newBalance,
        deviceId
      ]
    )
    const transaction = trxRes.rows[0]

    await client.query(
      `INSERT INTO notifications (user_id, type, message, created_at)
       VALUES ($1,$2,$3,NOW())`,
      [userId, "withdraw", `Withdrawal of ${withdrawAmount} was successful`]
    )

    await client.query("COMMIT")
    return {
      oldBalance,
      newBalance,
      transaction,
      account: {
        account_number: account.account_number,
        balance: newBalance
      }
    }
  } catch (err) {
    await client.query("ROLLBACK").catch(() => {})
    throw err
  } finally {
    client.release()
  }
}

export const getTransactionsService = async (userId, page = 1, limit = 10) => {
  const offset = (page - 1) * limit

  const accRes = await pool.query(
    "SELECT account_number, balance FROM accounts WHERE user_id = $1",
    [userId]
  )
  const account = accRes.rows[0] || { account_number: null, balance: null }

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
    transactions: result.rows.map((t) => ({
      ...t,
      account_number: account.account_number,
      balance: account.balance
    })),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    },
    account
  }
}
