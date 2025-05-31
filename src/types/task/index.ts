export type Task = {
  total: number
  items: TaskItems[]
}

export type TaskPriority = 'high' | 'middle' | 'low'

export type TaskStatus = 'waiting' | 'processing' | 'completed' | 'done'

export type TaskItems = {
  id: string
  name: string
  priority: TaskPriority
  status: TaskStatus
  startDate: string
  endDate: string
  companyName: string
  clientName: string
  remarks: string
  assignments: TaskAssignment[]
}

export type TaskAssignment = {
  id: string
  parentAssignmentName?: string
  parentAssignmentId?: string
  parentAssignmentPriority?: TaskPriority
  assignmentName: string
  status: TaskStatus
  jobType: string
  startDate: string
  endDate: string
  assignmentId?: string
}

// request
export type RequestPostTask = {
  name: string
  priority: TaskPriority
  status: TaskStatus
  startDate: string
  endDate: string
  companyName: string
  clientName: string
  remarks?: string
}
