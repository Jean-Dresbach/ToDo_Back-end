import { repository } from "../database/prisma.connection"

import { CreateSessionDTO, ResponseDTO } from "../dtos"

export class SessionService {
  public async create(
    createSessionDTO: CreateSessionDTO
  ): Promise<ResponseDTO> {
    const newSession = await repository.session.create({
      data: {
        csrfToken: createSessionDTO.csrfToken,
        userId: createSessionDTO.userId
      },
      select: {
        id: true,
        csrfToken: true,
        userId: true
      }
    })

    return {
      code: 201,
      message: "Sessão criada com sucesso.",
      data: newSession
    }
  }

  public async delete(sessionId: string): Promise<ResponseDTO> {
    const session = await repository.session.findUnique({
      where: {
        id: sessionId
      }
    })

    if (!session) {
      return {
        code: 404,
        message: "Sessão não encontrada."
      }
    }

    const deletedSession = await repository.session.delete({
      where: {
        id: sessionId
      },
      select: {
        id: true,
        csrfToken: true,
        userId: true
      }
    })

    return {
      code: 404,
      message: "Sessão deletada com sucesso.",
      data: deletedSession
    }
  }
}
