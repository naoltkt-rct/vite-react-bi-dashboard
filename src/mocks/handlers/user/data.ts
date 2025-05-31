// packages
import { faker } from '@faker-js/faker/locale/ja'
import { delay, http, HttpResponse } from 'msw'

// constants
import { API_URL, USER_GENDERS, USER_JOBS } from '@/constants'

// utilities
import {
  API_FETCHER_DELAY,
  DUMMY_DATA_LIMIT,
  getContainSearchKeyword,
  getRandomInt,
  getRandomValue,
} from '@/mocks/utilities'

// types
import { RequestPostUser } from '@/types/user'

// mocks api 用 離職率
const DUMMY_ATTRITION_RATE = 15

// GET: api/v1/users
const gets = http.get(API_URL.USER.GETS, async ({ request }) => {
  // request 取得
  const uri = new URL(request.url)

  // 開始番号
  const start = uri.searchParams.get('page')
    ? (Number(uri.searchParams.get('page')) - 1) *
      Number(uri.searchParams.get('limit'))
    : 0

  // 検索キーワードを取得
  const query = uri.searchParams.get('query') || ''

  // 上限
  // 検索キーワードがある場合は上限を変更
  const hasQueryTotal = uri.searchParams.get('total')
    ? Number(uri.searchParams.get('total'))
    : Math.floor(Math.random() * (DUMMY_DATA_LIMIT / 5))
  const limit = uri.searchParams.get('limit')
    ? start + Number(uri.searchParams.get('limit'))
    : DUMMY_DATA_LIMIT

  // 退職日の有無
  const attritionIndices = new Set(
    Array.from(
      { length: Math.floor(DUMMY_DATA_LIMIT * (DUMMY_ATTRITION_RATE / 100)) },
      () => Math.floor(Math.random() * DUMMY_DATA_LIMIT),
    ),
  )
  // 生成
  const items = []
  for (let i = start; i < limit; i++) {
    // 上限を超えたら抜ける
    if (i >= DUMMY_DATA_LIMIT || (query && i >= hasQueryTotal)) break
    const gender = getRandomValue(USER_GENDERS)
    // オブジェクトを生成
    items.push({
      id: `users_uuid_${i + 1}`,
      username: getContainSearchKeyword(
        `テストアカウント-${faker.person.fullName({ sex: gender !== 'OTHER' ? (gender.toLowerCase() as 'male' | 'female') : undefined })}`,
        query,
      ),
      gender: gender,
      age: getRandomInt(18, 60),
      department: faker.commerce.department(),
      job: getRandomValue(USER_JOBS),
      startDate: faker.date.past().toISOString(),
      endDate: attritionIndices.has(i - start)
        ? faker.date.future().toISOString()
        : null,
      totalOccupancyRate: faker.number.float({
        min: 10,
        max: 120,
        fractionDigits: 1,
      }),
      remarks: faker.lorem.words(10),
    })
  }
  // 返却を遅延させる
  await delay(API_FETCHER_DELAY)
  // 返却
  return HttpResponse.json({
    total: uri.searchParams.get('query') ? hasQueryTotal : DUMMY_DATA_LIMIT,
    items: items,
  })
})

// GET: api/v1/users/:id
const get = http.get(API_URL.USER.GET(':id'), async ({ params }) => {
  const { id } = params
  // 性別
  const gender = getRandomValue(USER_GENDERS)
  // 返却を遅延させる
  await delay(API_FETCHER_DELAY)
  // 返却
  return HttpResponse.json({
    id: id,
    username: `テストアカウント-${faker.person.fullName({ sex: gender !== 'OTHER' ? (gender.toLowerCase() as 'male' | 'female') : undefined })}`,
    gender: gender,
    age: getRandomInt(18, 60),
    department: faker.commerce.department(),
    job: getRandomValue(USER_JOBS),
    startDate: faker.date.past().toISOString(),
    endDate:
      Math.random() * 100 < DUMMY_ATTRITION_RATE
        ? faker.date.future().toISOString()
        : null,
    remarks: faker.lorem.words(10),
  })
})

// POST: api/v1/users
const post = http.post(API_URL.USER.POST, async () => {
  // 返却を遅延させる
  await delay(API_FETCHER_DELAY)
  // 返却
  return HttpResponse.json({
    id: faker.string.uuid(),
  })
})

// PUT: api/v1/users
const put = http.put(API_URL.USER.PUT, async () => {
  // 返却を遅延させる
  await delay(API_FETCHER_DELAY)
  // 返却
  return HttpResponse.json(null, { status: 200 })
})

// POST: api/v1/users/assignments
const postAssignments = http.post(
  API_URL.USER.POST_ASSIGNMENTS,
  async ({ request }) => {
    const body = (await request.json()) as RequestPostUser
    // 生成
    let items = []
    // assignments が指定されている場合
    if (body.assignments && body.assignments.length > 0) {
      for (let i = 0; i < DUMMY_DATA_LIMIT; i++) {
        const gender = getRandomValue(USER_GENDERS)
        items.push({
          id: faker.string.uuid(),
          username: `テストアカウント-${faker.person.fullName({ sex: gender !== 'OTHER' ? (gender.toLowerCase() as 'male' | 'female') : undefined })}`,
          job: getRandomValue(USER_JOBS),
        })
      }
      // body.assignments の数だけランダムに items を上書き
      const indices = Array.from({ length: items.length }, (_, i) => i)
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[indices[i], indices[j]] = [indices[j], indices[i]]
      }
      // id と job を差し替える
      for (let i = 0; i < body.assignments.length; i++) {
        items[indices[i]].id =
          body.assignments[i].assignmentId || faker.string.uuid()
        items[indices[i]].job = body.assignments[i].jobType
      }
    }

    // 返却を遅延させる
    await delay(API_FETCHER_DELAY)
    // 返却
    return HttpResponse.json(
      body.assignments && body.assignments.length > 0 ? items : null,
      { status: 200 },
    )
  },
)

// GET: api/v1/users/over-capacity
const getsOverCapacity = http.get(API_URL.USER.GETS_OVER_CAPACITY, async () => {
  // 生成
  const items = []
  const max = getRandomInt(0, 5)
  for (let i = 0; i < max; i++) {
    items.push(faker.string.uuid())
  }
  // 返却を遅延させる
  await delay(API_FETCHER_DELAY)
  // 返却
  return HttpResponse.json(items, { status: 200 })
})

// DELETE: api/v1/users
const deletes = http.delete(API_URL.USER.DELETE, async () => {
  // 返却を遅延させる
  await delay(API_FETCHER_DELAY)
  // 返却
  return HttpResponse.json(null, { status: 200 })
})

export const mockUserDataRepositoryHandlers = [
  gets,
  // get より後方に配置すると response が get の内容に上書きされるため、上部に配置
  getsOverCapacity,
  // getsOverCapacity より前方に配置すると response を上書きするため、後方に配置
  get,
  put,
  post,
  postAssignments,
  deletes,
]
