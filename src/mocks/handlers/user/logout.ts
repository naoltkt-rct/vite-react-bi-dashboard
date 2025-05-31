// packages
import { delay, http, HttpResponse } from 'msw'

// constants
import { API_URL } from '@/constants'

// utilities
import { API_FETCHER_DELAY } from '@/mocks/utilities'

// POST: api/v1/users/logout
const post = http.post(API_URL.USER.POST_LOGOUT, async () => {
  // 遅延
  await delay(API_FETCHER_DELAY)
  // 返却
  return HttpResponse.json(null, { status: 200 })
})

export const mockUserLogoutRepositoryHandlers = [post]
