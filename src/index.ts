import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import swaggerUi from "swagger-ui-express"

import sessionRoutes from "./routes/session.routes"
import userRoutes from "./routes/user.routes"
import taskRoutes from "./routes/task.routes"
import swaggerDocs from "./swagger.json"

const app = express()

app.use(express.json())
app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use(cookieParser())
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use(sessionRoutes)
app.use(userRoutes)
app.use(taskRoutes)

app.listen(3333, () => {
  console.log("🚀 Server ready at: http://localhost:3333 🚀")
})
