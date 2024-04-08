import { NextFunction, Request, Response } from "express"

export async function validateCreateTask(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { title, description } = request.body

    if (!title || !description) {
      return response.status(400).json({
        message: "Preencha todos os campos obrigatórios."
      })
    }

    next()
  } catch (error) {
    console.log(error)

    return response.status(500).json({
      message: "Erro interno do servidor."
    })
  }
}

export async function validateTaskId(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { taskId } = request.params

    if (!taskId) {
      return response.status(400).json({
        message: "Id da task não informado."
      })
    }

    next()
  } catch (error) {
    console.log(error)

    return response.status(500).json({
      message: "Erro interno do servidor."
    })
  }
}
