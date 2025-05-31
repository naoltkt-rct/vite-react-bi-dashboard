// packages
import { faker } from '@faker-js/faker/locale/ja'
import { delay, http, HttpResponse } from 'msw'

// constants
import { API_URL, USER_STATUS } from '@/constants'

// utilities
import { API_FETCHER_DELAY } from '@/mocks/utilities'

// types
import type { ResponseGetInfo } from '@/types/user/info'

// 返却値
const responses: ResponseGetInfo = {
  id: faker.string.uuid(),
  organization: 'テスト株式会社',
  authority: 'ADMINISTRATOR',
  username: `テストアカウント-${faker.person.fullName()}`,
  email: faker.internet.email(),
  avatar: faker.image.urlLoremFlickr({
    category: 'people',
    width: 200,
    height: 200,
  }),
  status: USER_STATUS.ACTIVE,
}

// GET: api/v1/users/info
const get = http.get(API_URL.USER.GET_INFO, async (): Promise<HttpResponse> => {
  // 遅延
  await delay(API_FETCHER_DELAY)
  // 返却
  return HttpResponse.json(responses, { status: 200 })
})

// PUT: api/v1/users/info
const put = http.put(API_URL.USER.PUT_INFO, async (): Promise<HttpResponse> => {
  // 遅延
  await delay(API_FETCHER_DELAY)
  // 返却
  return HttpResponse.json(null, { status: 200 })
})

export const mockUserInfoRepositoryHandlers = [get, put]
