import Account from "../models/Account.js"
import User from "../models/User.js"
import { hashPassword, verifyPassword } from "../utils/passwordUtils.js"

export const registerUserService = async (
  name,
  email,
  password,
  phone_number
) => {
  const existing = await User.findByEmail(email)
  if (existing) throw new Error("Email already exists")

  const { hash, salt } = hashPassword(password)

  const newUser = await User.create({
    name,
    email,
    password: hash,
    phone_number,
    salt
  })

  const account = await Account.createForUser(newUser.id)

  return { user: newUser, account }
}

export const loginUserService = async (email, password) => {
  const user = await User.findByEmail(email)
  if (!user) throw new Error("Invalid credentials")

  const valid = verifyPassword(password, user.salt, user.password)
  if (!valid) throw new Error("Invalid credentials")

  return { user }
}
