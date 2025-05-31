export type User = {
  total: number
  items: UserItems[]
}

export type UserGender = 'MALE' | 'FEMALE' | 'OTHER'
export type UserJob = 'director' | 'designer' | 'frontend' | 'backend'

export type UserItems = {
  id: string
  username: string
  gender: UserGender
  age: number
  department: string
  job: UserJob
  startDate: string
  endDate: string
  totalOccupancyRate: number
  remarks?: string
}

// request
export type RequestPostUser = {
  username: string
  gender: UserGender
  age: number
  department: string
  job: UserJob
  startDate: string
  endDate?: string
  remarks?: string
  // GET api/v1/task
  // assignments[n].assignmentId との紐付け用
  assignments?: RequestPostUserAssignments[]
}

export type RequestPostUserAssignments = {
  assignmentId: string
  jobType: string
}
