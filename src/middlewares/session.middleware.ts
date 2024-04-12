import { NextFunction, Request, Response } from "express"
import { repository } from "../database/prisma.connection"

export async function validateLogin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { email, password } = request.body

    if (!email || !password) {
      return response.status(400).json({
        message: "Preencha os campos obrigatórios."
      })
    }

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

export async function validateLoginToken(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { sessionId } = request.cookies
    const { userId } = request.params
    const { authorization } = request.headers

    if (!sessionId || !authorization) {
      return response.status(401).json({
        message: "Não autorizado."
      })
    }

    const user = await repository.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      return response.status(404).json({
        message: "Usuário não encontrado."
      })
    }

    const session = await repository.session.findUnique({
      where: { id: sessionId }
    })

    if (!session) {
      return response.status(401).json({
        message: "Não autorizado."
      })
    }

    if (session.csrfToken !== authorization) {
      return response.status(401).json({
        message: "Não autorizado."
      })
    }

    if (session.userId !== userId) {
      return response.status(401).json({
        message: "Não autorizado."
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
