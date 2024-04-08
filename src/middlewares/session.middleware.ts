import { NextFunction, Request, Response } from "express"
import { repository } from "../database/prisma.connection"

export async function validateLoginToken(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { sessionId } = request.cookies
    const { csrfToken, userId } = request.body

    if (!sessionId || !csrfToken || !userId) {
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

    if (session.csrfToken !== csrfToken) {
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
