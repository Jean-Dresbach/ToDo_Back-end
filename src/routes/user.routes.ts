import express from "express"

import { UserController } from "../controllers/user.controller"
import { validateLoginToken, validateUserCreate } from "../middlewares"

export const userRoutes = express.Router()

const userController = new UserController()

userRoutes.post("/users", validateUserCreate, userController.store)

userRoutes.get("/users/:userId", validateLoginToken, userController.show)

userRoutes.put("/users/:userId", validateLoginToken, userController.update)

userRoutes.delete("/users/:userId", validateLoginToken, userController.delete)
