type TaskStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED"

export interface CreateTaskDTO {
  title: string
  description: string
  status?: TaskStatus
  userId: string
}

export interface UpdateTaskDTO {
  id: string
  title?: string
  description?: string
  status?: TaskStatus
}
