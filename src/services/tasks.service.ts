import { repository } from "../database/prisma.connection"

import { ResponseDTO } from "../dtos/response.dto"
import { CreateTaskDTO, UpdateTaskDTO } from "../dtos/tasks.dto"

export class TaskService {
  public async findAll(userId: string): Promise<ResponseDTO> {
    const tasks = await repository.task.findMany({
      where: { userId },
      select: {
        id: true,
        title: true,
        description: true,
        status: true
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    return {
      code: 200,
      message: "Tarefas do usuário listadas com sucesso.",
      data: tasks
    }
  }

  public async create({
    title,
    description,
    userId,
    status
  }: CreateTaskDTO): Promise<ResponseDTO> {
    await repository.task.create({
      data: {
        title,
        description,
        userId,
        status
      }
    })

    return {
      code: 201,
      message: "Tarefa criada com sucesso."
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
        message: "Tarefa não encontrada."
      }
    }

    await repository.task.update({
      where: { id },
      data: {
        title,
        description,
        status
      }
    })

    return {
      code: 200,
      message: "Tarefa atualizada com sucesso."
    }
  }

  public async delete(id: string): Promise<ResponseDTO> {
    const task = await repository.task.findUnique({
      where: { id }
    })

    if (!task) {
      return {
        code: 404,
        message: "Tarefa não encontrada."
      }
    }

    await repository.task.delete({
      where: { id }
    })

    return {
      code: 200,
      message: "Tarefa removida com sucesso."
    }
  }
}
