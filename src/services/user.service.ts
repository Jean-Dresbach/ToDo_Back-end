import { repository } from "../database/prisma.connection"

import { CreateUserDTO, UpdateUserDTO } from "../dtos/user.dto"
import { ResponseUserDTO } from "../dtos/response.dto"

export class UserService {
  public async create(userDTO: CreateUserDTO): Promise<ResponseUserDTO> {
    const { email, name, password } = userDTO

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

    const newUser = await repository.user.create({
      data: {
        name,
        email,
        password
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true
      }
    })

    return {
      code: 201,
      message: "Usuário criado com sucesso.",
      data: newUser
    }
  }

  public async findById(id: string): Promise<ResponseUserDTO> {
    const user = await repository.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        password: true
      }
    })

    if (!user) {
      return {
        code: 404,
        message: "Usuário não encontrado."
      }
    }

    return {
      code: 200,
      message: "Usuário encontrado com sucesso.",
      data: user
    }
  }

  public async update(userDTO: UpdateUserDTO): Promise<ResponseUserDTO> {
    const { userId, email, name, password } = userDTO

    const user = await repository.user.findUnique({
      where: {
        id: userId
      }
    })

    if (!user) {
      return {
        code: 404,
        message: "Usuário não encontrado."
      }
    }

    const updatedUser = await repository.user.update({
      where: {
        id: userId
      },
      data: {
        name: name,
        email: email,
        password: password
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true
      }
    })

    return {
      code: 200,
      message: "Usuário atualizado com sucesso.",
      data: updatedUser
    }
  }

  public async delete(id: string): Promise<ResponseUserDTO> {
    const user = await repository.user.findUnique({
      where: { id }
    })

    if (!user) {
      return {
        code: 404,
        message: "Usuário não encontrado."
      }
    }

    const deletedUser = await repository.user.delete({
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
      message: "Usuário removido com sucesso.",
      data: deletedUser
    }
  }
}
