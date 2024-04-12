import { NextFunction, Request, Response } from "express"

const validateUpdateFields = (fields: Record<string, any>) => {
  const isEmpty = Object.values(fields).some((value) => value?.trim() === "")
  const isMissing = Object.values(fields).every((value) => value === undefined)
  return { isEmpty, isMissing }
}

export async function validateCreateTask(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { title, description } = request.body

    if (!title?.trim() || !description?.trim()) {
      return response.status(400).json({
        message: "Preencha todos os campos obrigatórios."
      })
    }

    request.body.title = title.trim()
    request.body.description = description.trim()

    next()
  } catch (error) {
    console.log(error)

    return response.status(500).json({
      message: "Erro interno do servidor."
    })
  }
}

export async function validateUpdateUser(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { title, description, status } = request.body

    const { isEmpty, isMissing } = validateUpdateFields({
      title,
      description,
      status
    })

    if (isMissing) {
      return response.status(400).json({
        message: "Nenhum campo enviado para atualização."
      })
    }

    if (isEmpty) {
      return response.status(400).json({
        message: "Os campos a serem atualizados não podem estar vazios."
      })
    }

    request.body.name = title?.trim()
    request.body.email = description?.trim()
    request.body.password = status?.trim()

    next()
  } catch (error) {
    console.log(error)

    return response.status(500).json({
      message: "Erro interno do servidor."
    })
  }
}
