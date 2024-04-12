import { Request, Response } from "express"

import { SessionService } from "../services/session.service"

const sessionService = new SessionService()

export class SessionController {
  public async login(request: Request, response: Response) {
    try {
      const { email, password } = request.body

      const result = await sessionService.login(email, password)

      if (result.code !== 200) {
        return response.status(result.code).json(result)
      }

      return response
        .cookie("sessionId", result.data.id, {
          secure: true,
          httpOnly: true,
          sameSite: "none",
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        })
        .status(result.code)
        .json({
          message: result.message,
          code: result.code,
          data: { userId: result.data.userId, csrfToken: result.data.csrfToken }
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
