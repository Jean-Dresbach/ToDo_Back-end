import { NextFunction, Request, Response } from "express"

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
