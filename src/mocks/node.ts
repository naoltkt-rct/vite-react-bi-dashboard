// packages
import { setupServer } from 'msw/node'

// mocks
import { handlers } from '@/mocks/handlers'

export const server = setupServer(...handlers)
