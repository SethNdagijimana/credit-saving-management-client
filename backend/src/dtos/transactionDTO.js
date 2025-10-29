const safeNum = (v) => {
  if (v === undefined || v === null) return null
  const n = Number(v)
  if (Number.isNaN(n)) return null
  return Number(n.toFixed(2))
}

export const transactionDTO = (t) => ({
  id: t.id,
  type: t.type,
  amount: safeNum(t.amount),
  description: t.description || null,

  userId: t.user_id || t.userId || null,
  userName: t.userName || null,

  accountNumber: t.account_number || t.accountNumber || null,

  oldBalance:
    t.oldBalance !== undefined
      ? safeNum(t.oldBalance)
      : t.old_balance !== undefined
      ? safeNum(t.old_balance)
      : null,

  newBalance:
    t.newBalance !== undefined
      ? safeNum(t.newBalance)
      : t.new_balance !== undefined
      ? safeNum(t.new_balance)
      : null,

  deviceId: t.device_id || t.deviceId || null,

  createdAt:
    t.created_at || t.createdAt
      ? new Date(t.created_at || t.createdAt).toISOString()
      : null
})
