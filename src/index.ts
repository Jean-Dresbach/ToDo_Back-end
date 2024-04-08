import express from "express"
import cors from "cors"

import sessionRoutes from "./routes/session.routes"
import userRoutes from "./routes/user.routes"

const app = express()
app.use(express.json())
app.use(cors({ credentials: true }))

app.use(sessionRoutes)
app.use(userRoutes)

app.listen(3333, () => {
  console.log("🚀 Server ready at: http://localhost:3333 🚀")
})
