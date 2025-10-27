export const transactionDTO = (t) => ({
  id: t.id,
  type: t.type,
  amount: Number(parseFloat(t.amount).toFixed(2)),
  description: t.description || null,
  userId: t.user_id || t.userId,
  userName: t.userName || null,
  oldBalance:
    t.oldBalance !== undefined
      ? Number(parseFloat(t.oldBalance).toFixed(2))
      : null,
  newBalance:
    t.newBalance !== undefined
      ? Number(parseFloat(t.newBalance).toFixed(2))
      : t.new_balance
      ? Number(parseFloat(t.new_balance).toFixed(2))
      : null,
  deviceId: t.device_id || t.deviceId || null,
  createdAt: t.created_at || t.createdAt
})
