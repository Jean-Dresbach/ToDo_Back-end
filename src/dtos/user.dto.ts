export interface CreateUserDTO {
  name: string
  email: string
  password: string
}

export interface UpdateUserDTO {
  userId: string
  name?: string
  email?: string
  password?: string
}
