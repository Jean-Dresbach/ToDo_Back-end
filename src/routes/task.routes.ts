import express from "express"

import { TaskController } from "../controllers/task.controller"
import { validateLoginToken } from "../middlewares/session.middleware"
import {
  validateCreateTask,
  validateUpdateUser
} from "../middlewares/task.middleware"

const router = express.Router()

const taskController = new TaskController()

router.get("/tasks/:userId/create", validateLoginToken, taskController.index)

router.post(
  "/tasks/:userId/findMany",
  validateLoginToken,
  validateCreateTask,
  taskController.store
)

router.put(
  "/tasks/:userId/updateTask/:taskId",
  validateLoginToken,
  validateUpdateUser,
  taskController.update
)

router.delete(
  "/tasks/:userId/deleteTask/:taskId",
  validateLoginToken,
  taskController.delete
)

export default router
