import { NextFunction, Request, Response } from "express"

const validateUpdateFields = (fields: Record<string, any>) => {
  const isEmpty = Object.values(fields).some((value) => value?.trim() === "")
  const isMissing = Object.values(fields).every((value) => value === undefined)
  return { isEmpty, isMissing }
}

export async function validateUserCreate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { name, email, password } = request.body

    if (!name || !email || !password) {
      return response.status(400).json({
        message: "Preencha todos os campos obrigatórios."
      })
    }

    request.body.name = name.trim()
    request.body.email = email.trim()
    request.body.password = password.trim()

    next()
  } catch (error) {
    console.log(error)

    return response.status(500).json({
      message: "Erro interno do servidor."
    })
  }
}

export async function validateUserUpdate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { name, email, password } = request.body

    const { isEmpty, isMissing } = validateUpdateFields({
      name,
      email,
      password
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

    request.body.name = name?.trim()
    request.body.email = email?.trim()
    request.body.password = password?.trim()

    next()
  } catch (error) {
    console.log(error)

    return response.status(500).json({
      message: "Erro interno do servidor."
    })
  }
}
