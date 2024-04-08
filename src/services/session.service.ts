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
      }
    })

    return {
      code: 201,
      message: "Sessão criada com sucesso.",
      data: newSession
    }
  }
}
