import { Request, Response } from "express"

import { SessionService } from "../services"

const sessionService = new SessionService()

export class SessionController {
  public async login(request: Request, response: Response) {
    try {
      const email = request.body.emailOrUsername.trim()
      const password = request.body.password.trim()

      request.body.emailOrUsername = email
      request.body.password = password

      if (!email || !password) {
        return response.status(400).json({
          message: "Preencha os campos obrigatórios."
        })
      }

      const result = await sessionService.login(email, password)

      return response
        .cookie("sessionId", result.data?.id, {
          secure: true,
          httpOnly: true,
          sameSite: "none"
        })
        .status(result.code)
        .json({
          csrfToken: result.data?.csrfToken,
          message: result.message
        })
    } catch (error) {
      console.log(error)

      return response.status(500).json({
        message: `Erro interno do servidor.`
      })
    }
  }

  public async logout(request: Request, response: Response) {
    try {
      const { sessionId } = request.cookies

      const result = await sessionService.logout(sessionId)

      return response.status(result.code).json(result)
    } catch (error) {
      console.log(error)

      return response.status(500).json({
        code: 500,
        message: `Erro interno do servidor.`
      })
    }
  }
}