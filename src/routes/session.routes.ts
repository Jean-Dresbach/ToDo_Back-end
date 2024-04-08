import express from "express"

import { SessionController } from "../controllers/session.controller"
import { validateLoginToken } from "../middlewares/session.middleware"

export const router = express.Router()

const sessionController = new SessionController()

router.post("/login", sessionController.login)

router.post("/logout/:userId", validateLoginToken, sessionController.logout)

export default router
