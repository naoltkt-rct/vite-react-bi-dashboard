// mocks
import { mockUserDataRepositoryHandlers } from '@/mocks/handlers/user/data'
import { mockUserInfoRepositoryHandlers } from '@/mocks/handlers/user/info'
import { mockUserLoginRepositoryHandlers } from '@/mocks/handlers/user/login'

// handlers
export const mockUserRepositoryHandlers = [
  ...mockUserInfoRepositoryHandlers,
  ...mockUserLoginRepositoryHandlers,
  ...mockUserDataRepositoryHandlers,
]
