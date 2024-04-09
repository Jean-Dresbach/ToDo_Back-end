import express from "express"

import { UserController } from "../controllers/user.controller"
import { validateLoginToken } from "../middlewares/session.middleware"
import {
  validateUserCreate,
  validateUserUpdate
} from "../middlewares/user.middleware"

export const router = express.Router()

const userController = new UserController()

router.post("/users", validateUserCreate, userController.store)

router.get("/users/:userId", validateLoginToken, userController.show)

router.put(
  "/users/:userId",
  validateLoginToken,
  validateUserUpdate,
  userController.update
)

router.delete("/users/:userId", validateLoginToken, userController.delete)

export default router
