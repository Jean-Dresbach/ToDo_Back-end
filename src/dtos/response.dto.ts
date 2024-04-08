interface SessionData {
  id: string
  csrfToken: string
  userId: string
}

export interface ResponseSessionDTO {
  code: number
  message: string
  data?: SessionData
}

export interface ResponseUserDTO {
  code: number
  message: string
  data?: any
  field?: string
}
