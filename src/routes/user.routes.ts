import express from "express"

import { UserController } from "../controllers/user.controller"
import { validateLoginToken } from "../middlewares/session.middleware"
import {
  validateCreateUser,
  validateUpdateUser
} from "../middlewares/user.middleware"

const router = express.Router()

const userController = new UserController()

router.post("/users/create", validateCreateUser, userController.store)

router.get("/users/:userId/findById", validateLoginToken, userController.show)

router.put(
  "/users/:userId/update",
  validateLoginToken,
  validateUpdateUser,
  userController.update
)

router.delete(
  "/users/:userId/delete",
  validateLoginToken,
  userController.delete
)

export default router
