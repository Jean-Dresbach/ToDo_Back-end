import { Request, Response } from "express"

import { UserService } from "../services/user.service"
import { CreateUserDTO, UpdateUserDTO } from "../dtos/user.dto"

const userService = new UserService()

export class UserController {
  public async store(request: Request, response: Response) {
    try {
      const { name, email, password } = request.body

      const newUser: CreateUserDTO = { name, email, password }

      const result = await userService.create(newUser)

      return response.status(result.code).json(result)
    } catch (error) {
      console.log(error)

      return response.status(500).json({
        message: "Erro interno do servidor."
      })
    }
  }

  public async show(request: Request, response: Response) {
    try {
      const { userId } = request.params

      const result = await userService.findById(userId)

      return response.status(result.code).json(result)
    } catch (error) {
      console.log(error)

      return response.status(500).json({
        message: "Erro interno do servidor."
      })
    }
  }

  public async update(request: Request, response: Response) {
    try {
      const { userId } = request.params
      const { name, email, password } = request.body

      const updatedUser: UpdateUserDTO = { userId, name, email, password }

      const result = await userService.update(updatedUser)

      response.status(result.code).json(result)
    } catch (error) {
      console.log(error)

      return response.status(500).json({
        message: "Erro interno do servidor."
      })
    }
  }

  public async delete(request: Request, response: Response) {
    try {
      const { userId } = request.params

      const result = await userService.delete(userId)

      response.status(result.code).json(result)
    } catch (error) {
      console.log(error)

      return response.status(500).json({
        message: "Erro interno do servidor."
      })
    }
  }
}
