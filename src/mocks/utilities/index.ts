// mocks api 用 ユーザー名
export const DUMMY_USERNAME = 'username'

// mocks api 用 パスワード
export const DUMMY_PASSWORD = 'password1234'

// 返却を遅延させる
export const API_FETCHER_DELAY = 1000

// mocks api 用 上限
export const DUMMY_DATA_LIMIT = 92

// ランダムな配列（文字列）を生成
function getRandomValue(array: string[]) {
  return array[Math.floor(Math.random() * array.length)]
}

// ランダムな値を生成
function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// 検索キーワードを含む値を生成
function getContainSearchKeyword(target: string, query: string) {
  const randoms = Math.floor(Math.random() * (target.length - query.length))
  return query
    ? target.slice(0, randoms) + query + target.slice(randoms)
    : target
}

// 合計値の割り振り
function divideTotalInt(total: number, length: number, decimal: number) {
  // ランダムな値を生成
  const randomValues = Array.from({ length: length }, () => Math.random())
  // ランダムな値の合計を計算
  const randomValuesSum = randomValues.reduce((sum, value) => sum + value, 0)
  // ランダムな値をスケーリングしてそれぞれの値を計算
  let result = randomValues.map((value) => (value / randomValuesSum) * total)
  // 小数点第1位に丸める
  result = result.map((value) => Number.parseFloat(value.toFixed(decimal)))
  // 丸めた後の合計を計算
  const roundedSum = result.reduce((sum, value) => sum + value, 0)
  // 差分を調整
  const difference = total - roundedSum
  result[result.length - 1] += Number.parseFloat(difference.toFixed(decimal))
  return result
}

/**
 * export functions
 */
export { divideTotalInt, getContainSearchKeyword, getRandomInt, getRandomValue }
