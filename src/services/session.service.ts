import { randomUUID } from "crypto"
import { repository } from "../database/prisma.connection"

import { ResponseDTO } from "../dtos/response.dto"

export class SessionService {
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

    const newSession = await repository.session.create({
      data: {
        csrfToken: randomUUID(),
        userId: user.id
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
    const session = await repository.session.findUnique({
      where: { id }
    })

    if (!session) {
      return {
        code: 404,
        message: "Sessão não encontrada."
      }
    }

    await repository.session.delete({
      where: { id }
    })

    return {
      code: 200,
      message: "Logout realizado com sucesso."
    }
  }
}
