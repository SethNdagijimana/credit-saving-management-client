import crypto from "crypto"

const ITERATIONS = 100000
const KEY_LENGTH = 64
const DIGEST = "sha512"

export const hashPassword = (password) => {
  const salt = crypto.randomBytes(16).toString("hex")

  const hash = crypto
    .pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST)
    .toString("hex")

  return { hash, salt }
}

export const verifyPassword = (password, salt, storedHash) => {
  const hashAttempt = crypto
    .pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST)
    .toString("hex")

  return hashAttempt === storedHash
}
