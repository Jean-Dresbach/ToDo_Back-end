import { repository } from "../database/prisma.connection"

import { ResponseDTO } from "../dtos/response.dto"
import { CreateTaskDTO, UpdateTaskDTO } from "../dtos/tasks.dto"

export class TweetService {
  public async findAll(userId: string): Promise<ResponseDTO> {
    const tasks = await repository.task.findMany({
      where: { userId },
      select: {
        id: true,
        title: true,
        description: true,
        userId: true
      }
    })

    return {
      code: 200,
      message: "Tasks do usuário listadas com sucesso.",
      data: tasks
    }
  }

  public async create({
    title,
    description,
    status,
    userId
  }: CreateTaskDTO): Promise<ResponseDTO> {
    const newTask = await repository.task.create({
      data: {
        title,
        description,
        status,
        userId
      },
      select: {
        id: true,
        title: true,
        description: true,
        userId: true
      }
    })

    return {
      code: 201,
      message: "Task criada com sucesso.",
      data: newTask
    }
  }

  public async findById(id: string): Promise<ResponseDTO> {
    const task = await repository.task.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        userId: true
      }
    })

    if (!task) {
      return {
        code: 404,
        message: "Task não encontrada."
      }
    }

    return {
      code: 200,
      message: "Task encontrada com sucesso.",
      data: task
    }
  }

  public async update({
    id,
    description,
    status,
    title
  }: UpdateTaskDTO): Promise<ResponseDTO> {
    const task = await repository.task.findUnique({
      where: { id }
    })

    if (!task) {
      return {
        code: 404,
        message: "Task não encontrada."
      }
    }

    const updatedTask = await repository.task.update({
      where: { id },
      data: {
        title,
        description,
        status
      },
      select: {
        id: true,
        title: true,
        description: true,
        userId: true
      }
    })

    return {
      code: 200,
      message: "Task atualizada com sucesso.",
      data: updatedTask
    }
  }

  public async delete(id: string): Promise<ResponseDTO> {
    const task = await repository.task.findUnique({
      where: { id }
    })

    if (!task) {
      return {
        code: 404,
        message: "Task não encontrada."
      }
    }

    const deletedTask = await repository.task.delete({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        userId: true
      }
    })

    return {
      code: 200,
      message: "Task removida com sucesso.",
      data: deletedTask
    }
  }
}
