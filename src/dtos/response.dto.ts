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
