import { randomUUID } from "crypto"
import { repository } from "../database/prisma.connection"

import { ResponseSessionDTO } from "../dtos/response.dto"

export class SessionService {
  public async login(
    email: string,
    password: string
  ): Promise<ResponseSessionDTO> {
    const user = await repository.user.findFirst({
      where: { email, password }
    })

    if (!user) {
      return {
        code: 400,
        message: "Credenciais inválidas."
      }
    }

    const newSession = await repository.session.create({
      data: {
        csrfToken: randomUUID(),
        userId: user.id
      },
      select: {
        id: true,
        csrfToken: true,
        userId: true
      }
    })

    return {
      code: 200,
      message: "Login realizado com sucesso.",
      data: newSession
    }
  }

  public async logout(id: string): Promise<ResponseSessionDTO> {
    const session = await repository.session.findUnique({
      where: { id }
    })

    if (!session) {
      return {
        code: 404,
        message: "Sessão não encontrada."
      }
    }

    const deletedSession = await repository.session.delete({
      where: { id },
      select: {
        id: true,
        csrfToken: true,
        userId: true
      }
    })

    return {
      code: 200,
      message: "Logout realizado com sucesso.",
      data: deletedSession
    }
  }
}
