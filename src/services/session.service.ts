import { randomUUID } from "crypto"
import { repository } from "../database/prisma.connection"

import { ResponseDTO } from "../dtos/response.dto"

export class SessionService {
  constructor() {
    setInterval(async () => {
      await this.clearExpiredSessions()
    }, 24 * 60 * 60 * 1000)
  }

  public async login(email: string, password: string): Promise<ResponseDTO> {
    const user = await repository.user.findFirst({
      where: { email, password },
      select: {
        id: true,
        name: true,
        email: true,
        password: true
      }
    })

    if (!user) {
      return {
        code: 400,
        message: "Credenciais inválidas.",
        field: "all"
      }
    }

    const todayDate = new Date()
    const expiresDate = new Date(todayDate.setDate(todayDate.getDate() + 7))

    const newSession = await repository.session.create({
      data: {
        csrfToken: randomUUID(),
        userId: user.id,
        expiresAt: expiresDate
      },
      select: {
        id: true,
        csrfToken: true
      }
    })

    return {
      code: 200,
      message: "Login realizado com sucesso.",
      data: {
        session: newSession,
        user
      }
    }
  }

  public async logout(id: string): Promise<ResponseDTO> {
    await repository.session.delete({
      where: { id }
    })

    return {
      code: 200,
      message: "Logout realizado com sucesso."
    }
  }

  private async clearExpiredSessions() {
    const expirationLimit = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    await repository.session.deleteMany({
      where: {
        expiresAt: {
          lt: expirationLimit
        }
      }
    })
  }
}
