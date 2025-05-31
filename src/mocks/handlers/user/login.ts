// packages
import { delay, http, HttpResponse } from 'msw'

// constants
import { API_URL } from '@/constants'

// utilities
import {
  API_FETCHER_DELAY,
  DUMMY_PASSWORD,
  DUMMY_USERNAME,
} from '@/mocks/utilities'

// type
import type { RequestPostLogin, ResponsePostLogin } from '@/types/user/login'

// 認証チェックの成否により返却値を生成
const generator = (confirm: boolean): ResponsePostLogin[] => {
  return [
    { message: confirm ? '' : '無効なユーザー名またはパスワードです' },
    { status: confirm ? 200 : 401 },
  ]
}

// POST: api/v1/users/login
const post = http.post(
  API_URL.USER.POST_LOGIN,
  async ({ request }): Promise<HttpResponse> => {
    // request 取得
    const { username, password } = (await request.json()) as RequestPostLogin
    // 遅延
    await delay(API_FETCHER_DELAY)
    // 返却
    return HttpResponse.json(
      ...generator(username === DUMMY_USERNAME && password === DUMMY_PASSWORD),
    )
  },
)

export const mockUserLoginRepositoryHandlers = [post]
