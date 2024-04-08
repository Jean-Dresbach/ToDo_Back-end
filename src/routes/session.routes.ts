import express from "express"

import { SessionController } from "../controllers"
import { validateLoginToken } from "../middlewares/session.middleware"

export const sessionRoutes = express.Router()

const sessionController = new SessionController()

sessionRoutes.post("/login", sessionController.login)

sessionRoutes.post("/logout", validateLoginToken, sessionController.logout)
