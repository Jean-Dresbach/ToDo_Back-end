import { Request, Response } from "express"

import { TaskService } from "../services/tasks.service"
import { CreateTaskDTO, UpdateTaskDTO } from "../dtos/tasks.dto"

const taskService = new TaskService()

export class TaskController {
  public async index(request: Request, response: Response) {
    try {
      const { userId } = request.params

      const result = await taskService.findAll(userId)

      return response.status(result.code).json(result)
    } catch (error) {
      console.log(error)

      return response.status(500).json({
        message: "Erro interno do servidor."
      })
    }
  }

  public async store(request: Request, response: Response) {
    try {
      const { userId } = request.params
      const { title, description } = request.body

      const createTaskDTO: CreateTaskDTO = {
        title,
        description,
        userId
      }

      const result = await taskService.create(createTaskDTO)

      return response.status(result.code).json(result)
    } catch (error) {
      console.log(error)

      return response.status(500).json({
        message: "Erro interno do servidor."
      })
    }
  }

  public async update(request: Request, response: Response) {
    try {
      const { taskId } = request.params
      const { description, status, title } = request.body

      const updateTaskDTO: UpdateTaskDTO = {
        id: taskId,
        description,
        status,
        title
      }

      const result = await taskService.update(updateTaskDTO)

      response.status(result.code).json(result)
    } catch (error) {
      console.log(error)

      return response.status(500).json({
        message: "Erro interno do servidor."
      })
    }
  }

  public async delete(request: Request, response: Response) {
    try {
      const { taskId } = request.params

      const result = await taskService.delete(taskId)

      response.status(result.code).json(result)
    } catch (error) {
      console.log(error)

      return response.status(500).json({
        message: "Erro interno do servidor."
      })
    }
  }
}
