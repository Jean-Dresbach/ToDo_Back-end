import express from "express"

import { TaskController } from "../controllers/task.controller"
import { validateLoginToken } from "../middlewares/session.middleware"
import {
  validateCreateTask,
  validateTaskId
} from "../middlewares/task.middleware"

export const router = express.Router()

const taskController = new TaskController()

router.get("/tasks/:userId", validateLoginToken, taskController.index)

router.post(
  "/tasks/:userId",
  validateLoginToken,
  validateCreateTask,
  taskController.store
)

router.get(
  "/tasks/:userId/task/:taskId",
  validateLoginToken,
  validateTaskId,
  taskController.show
)

router.put(
  "/tasks/:userId/task/:taskId",
  validateLoginToken,
  validateTaskId,
  taskController.update
)

router.delete(
  "/tasks/:userId/task/:taskId",
  validateLoginToken,
  validateTaskId,
  taskController.delete
)

export default router
