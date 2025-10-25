import express from "express"
const router = express.Router()

router.get("/", (req, res) => {
  res.json({ message: "Welcome to Credit Jambo Client API" })
})

export default router
