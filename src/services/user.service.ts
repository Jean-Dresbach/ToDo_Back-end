import { repository } from "../database/prisma.connection"

import { CreateUserDTO, UpdateUserDTO } from "../dtos/user.dto"
import { ResponseDTO } from "../dtos/response.dto"

export class UserService {
  public async create({
    email,
    name,
    password
  }: CreateUserDTO): Promise<ResponseDTO> {
    const existingUser = await repository.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return {
        code: 409,
        message: "E-mail já cadastrado.",
        field: "email"
      }
    }

    await repository.user.create({
      data: {
        name,
        email,
        password
      }
    })

    return {
      code: 201,
      message: "Usuário criado com sucesso."
    }
  }

  public async findById(id: string): Promise<ResponseDTO> {
    const user = await repository.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        password: true
      }
    })

    return {
      code: 200,
      message: "Usuário encontrado com sucesso.",
      data: user
    }
  }

  public async update({
    userId,
    email,
    name,
    password
  }: UpdateUserDTO): Promise<ResponseDTO> {
    await repository.user.update({
      where: {
        id: userId
      },
      data: {
        name: name,
        email: email,
        password: password
      }
    })

    return {
      code: 200,
      message: "Usuário atualizado com sucesso."
    }
  }

  public async delete(id: string): Promise<ResponseDTO> {
    await repository.user.delete({
      where: { id }
    })

    return {
      code: 200,
      message: "Usuário removido com sucesso."
    }
  }
}
