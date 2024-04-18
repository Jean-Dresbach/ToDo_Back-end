type TaskStatus = "PENDENTE" | "EM_PROGRESSO" | "COMPLETA"

export interface CreateTaskDTO {
  title: string
  description: string
  userId: string
}

export interface UpdateTaskDTO {
  id: string
  title?: string
  description?: string
  status?: TaskStatus
}
