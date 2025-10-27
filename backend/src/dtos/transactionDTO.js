export const transactionDTO = (t) => ({
  id: t.id,
  type: t.type,
  amount: t.amount,
  description: t.description,
  userId: t.user_id,
  userName: t.userName,
  oldBalance: t.oldBalance,
  newBalance: t.newBalance,
  deviceId: t.device_id,
  createdAt: t.created_at
})
