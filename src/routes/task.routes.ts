import express from "express"

import { TaskController } from "../controllers/task.controller"
import { validateLoginToken } from "../middlewares/session.middleware"
import {
  validateCreateTask,
  validateUpdateTask
} from "../middlewares/task.middleware"

const router = express.Router()

const taskController = new TaskController()

router.get("/tasks/:userId/findMany", validateLoginToken, taskController.index)

router.post(
  "/tasks/:userId/create",
  validateLoginToken,
  validateCreateTask,
  taskController.store
)

router.put(
  "/tasks/:userId/update/:taskId",
  validateLoginToken,
  validateUpdateTask,
  taskController.update
)

router.delete(
  "/tasks/:userId/delete/:taskId",
  validateLoginToken,
  taskController.delete
)

export default router
