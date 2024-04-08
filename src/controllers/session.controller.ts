import { Request, Response } from "express"

import { SessionService } from "../services/session.service"
import { CreateSessionDTO } from "../dtos"

const sessionService = new SessionService()

export class SessionController {
  public async store(request: Request, response: Response) {
    try {
      const { userId, csrfToken } = request.body

      const newSession: CreateSessionDTO = { userId, csrfToken }

      const result = await sessionService.create(newSession)
    } catch (error) {
      console.log(error)

      return response.status(500).json({
        message: `Erro interno do servidor.`
      })
    }
  }
}
