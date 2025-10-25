import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import rateLimit from "express-rate-limit"
import helmet from "helmet"
import router from "./routes/index.js"

dotenv.config()
const app = express()

// Middleware
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }))

app.use("/api", router)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`))
