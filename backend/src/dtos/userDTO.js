import Account from "../models/Account.js"

export const userDTO = async (user) => {
  const account = await Account.findByUserId(user.id)

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone_number: user.phone_number,
    verified: user.verified,
    account_number: account?.account_number || null,
    balance: account?.balance || "0.00"
  }
}
