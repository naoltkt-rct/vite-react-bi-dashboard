// mocks
import { mockTaskRepositoryHandlers } from '@/mocks/handlers/task'
import { mockUserRepositoryHandlers } from '@/mocks/handlers/user'

// handlers
export const handlers = [
  ...mockUserRepositoryHandlers,
  ...mockTaskRepositoryHandlers,
]
