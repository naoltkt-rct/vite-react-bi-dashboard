// packages
import { setupWorker } from 'msw/browser'

// mocks
import { handlers } from '@/mocks/handlers'

export const worker = setupWorker(...handlers)
