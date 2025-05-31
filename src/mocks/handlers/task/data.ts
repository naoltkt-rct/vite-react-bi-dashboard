// packages
import { faker } from '@faker-js/faker/locale/ja'
import { addDays, differenceInDays, format } from 'date-fns'
import { delay, http, HttpResponse } from 'msw'

// constants
import {
  API_URL,
  TASK_PRIORITIES,
  TASK_STATUS,
  USER_GENDERS,
  USER_JOBS,
} from '@/constants'

// utilities
import {
  API_FETCHER_DELAY,
  DUMMY_DATA_LIMIT,
  getContainSearchKeyword,
  getRandomInt,
  getRandomValue,
} from '@/mocks/utilities'

// types

// GET: api/v1/tasks
const gets = http.get(API_URL.TASK.GETS, async ({ request }) => {
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

  // 生成
  const items = []
  for (let i = start; i < limit; i++) {
    // 上限を超えたら抜ける
    if (i >= DUMMY_DATA_LIMIT || (query && i >= hasQueryTotal)) break
    // オブジェクトを生成
    items.push({
      id: `tasks_uuid_${i + 1}`,
      name: getContainSearchKeyword(
        `#{案件名_${i + 1}_${faker.string.alphanumeric(8)}}`,
        query,
      ),
      priority: getRandomValue(TASK_PRIORITIES),
      status: getRandomValue(TASK_STATUS),
      startDate: faker.date.past().toISOString(),
      endDate: faker.date.future().toISOString(),
      companyName: faker.company.name(),
      clientName: faker.person.fullName(),
      remarks: faker.lorem.words({ min: 2, max: 10 }),
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

// GET: api/v1/tasks/:id
const get = http.get(API_URL.TASK.GET(':id'), async ({ params }) => {
  const { id } = params
  // 開始日
  const sd: Date = faker.date.past()
  // 期限日
  const ed: Date = faker.date.future()
  //  開始日と終了日の間の日数
  const days: number = differenceInDays(ed, sd)
  // 返却を遅延させる
  await delay(API_FETCHER_DELAY)
  // 返却
  return HttpResponse.json({
    id: id,
    name: `#{案件名_${id}_${faker.string.alphanumeric(8)}}`,
    priority: getRandomValue(TASK_PRIORITIES),
    status: getRandomValue(TASK_STATUS),
    startDate: format(sd, 'yyyy-MM-dd'),
    endDate: format(ed, 'yyyy-MM-dd'),
    companyName: faker.company.name(),
    clientName: faker.person.fullName(),
    remarks: faker.lorem.words(10),
    assignments: getAssignmentArray(sd, days, null),
  })
})

// POST: api/v1/tasks/assignments
const postAssignments = http.post(
  API_URL.TASK.POST_ASSIGNMENTS,
  async ({ request }) => {
    // request 取得
    const body = (await request.json()) as { ids: string[] }
    // 開始日
    const sd: Date = faker.date.past()
    // 期限日
    const ed: Date = faker.date.future()
    //  開始日と終了日の間の日数
    const days: number = differenceInDays(ed, sd)
    // 生成
    const items = []
    for (let i = 0; i < body?.ids?.length; i++) {
      const gender = getRandomValue(USER_GENDERS)
      items.push({
        id: body?.ids[i],
        username: `テストアカウント-${faker.person.fullName({ sex: gender !== 'OTHER' ? (gender.toLowerCase() as 'male' | 'female') : undefined })}`,
        gender: getRandomValue(USER_GENDERS),
        assignments: getAssignmentArray(sd, days, body?.ids[i]),
      })
    }
    // 返却を遅延させる
    await delay(API_FETCHER_DELAY)
    // 返却
    return HttpResponse.json(items, { status: 200 })
  },
)

// assignments 生成
const getAssignmentArray = (sd: Date, days: number, id: string | null) => {
  const result = []
  // id が存在する場合は 1 件から、それ以外は 0 件 から 5 件までをランダムに生成
  const max = getRandomInt(id ? 1 : 0, 5)
  for (let i = 0; i < max; i++) {
    const offset = getRandomInt(0, days - 1)
    const start = addDays(sd, offset)
    const end = addDays(start, getRandomInt(1, days - offset))
    result.push({
      id: faker.string.uuid(),
      ...(id && {
        parentAssignmentName: `#{案件名_${i + 1}_${faker.string.alphanumeric(8)}}`,
        parentAssignmentId: `tasks_uuid_${i + 1}`,
        parentAssignmentPriority: getRandomValue(TASK_PRIORITIES),
      }),
      assignmentName: `#{子課題_${faker.string.alphanumeric(4)}}`,
      status: getRandomValue(TASK_STATUS),
      jobType: getRandomValue(USER_JOBS),
      startDate: format(start, 'yyyy-MM-dd'),
      endDate: format(end, 'yyyy-MM-dd'),
      assignmentId: id ?? faker.string.uuid(),
    })
  }
  return result
}

// POST: api/v1/tasks
const post = http.post(API_URL.TASK.POST, async () => {
  // 返却を遅延させる
  await delay(API_FETCHER_DELAY)
  // 返却
  return HttpResponse.json({
    id: faker.string.uuid(),
  })
})

// PUT: api/v1/tasks
const put = http.put(API_URL.TASK.PUT, async () => {
  // 返却を遅延させる
  await delay(API_FETCHER_DELAY)
  // 返却
  return HttpResponse.json(null, { status: 200 })
})

// DELETE: api/v1/tasks
const deletes = http.delete(API_URL.TASK.DELETE, async () => {
  // 返却を遅延させる
  await delay(API_FETCHER_DELAY)
  // 返却
  return HttpResponse.json(null, { status: 200 })
})

export const mockTaskDataRepositoryHandlers = [
  gets,
  get,
  put,
  post,
  deletes,
  postAssignments,
]
