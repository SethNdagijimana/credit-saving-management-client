export const userDTO = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  phone_number: user.phone_number,
  verified: user.verified
})
