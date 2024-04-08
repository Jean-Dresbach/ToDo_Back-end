import express from "express"

import { SessionController } from "../controllers/session.controller"
import { validateLoginToken } from "../middlewares/session.middleware"

export const sessionRoutes = express.Router()

const sessionController = new SessionController()

sessionRoutes.post("/login", sessionController.login)

sessionRoutes.post(
  "/logout/:userId",
  validateLoginToken,
  sessionController.logout
)
