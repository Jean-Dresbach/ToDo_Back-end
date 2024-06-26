import express from "express"

import { SessionController } from "../controllers/session.controller"
import {
  validateLogin,
  validateLoginToken
} from "../middlewares/session.middleware"

const router = express.Router()

const sessionController = new SessionController()

router.post("/login", validateLogin, sessionController.login)

router.delete("/logout/:userId", validateLoginToken, sessionController.logout)

export default router
