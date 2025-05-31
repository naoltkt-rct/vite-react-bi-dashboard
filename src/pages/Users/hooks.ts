// packages
import {
  ChangeEvent,
  RefObject,
  createRef,
  useEffect,
  useRef,
  useState,
} from 'react'

// constants
import { API_URL, DEFAULT_DATA_LENGTH } from '@/constants'

// hooks
import { useCustomContext } from '@/components/ContextProvider/hooks'

// types
import type { User, UserItems } from '@/types/user'

export function useUsers() {
  // hooks
  const { setIsLoading } = useCustomContext()

  // useState
  // ユーザー情報
  const [users, setUsers] = useState<User>({
    total: 0,
    items: [],
  })
  // 選択/解除
  const [checkedAll, setCheckedAll] = useState<boolean>(false)
  const [checkedValues, setCheckedValues] = useState<string[]>([])
  // ページ番号
  const [pages, setPages] = useState<number>(0)
  // 削除モーダル
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(isModalOpen)
  // 検索キーワード
  const [searchQuery, setSearchQuery] = useState<string>('')
  // 検索実行時の合計値
  const [searchTotal, setSearchTotal] = useState<number | null>(null)

  // useRef
  const inputs = useRef<RefObject<HTMLInputElement>[]>([])

  // useEffect
  useEffect(() => {
    getsUser(pages, DEFAULT_DATA_LENGTH)
  }, [])
  // refの再発行
  useEffect(() => {
    users.items.map((user) => (inputs.current[user.id as any] = createRef()))
  }, [users])
  // ページ切り替え
  useEffect(() => {
    getsUser(pages, DEFAULT_DATA_LENGTH, searchQuery, searchTotal)
  }, [pages])
  // 全選択の制御
  useEffect(() => {
    setCheckedAll(
      users.items
        .map((user: UserItems) => user.id)
        .some((item) => checkedValues.includes(item)),
    )
  }, [users, checkedValues])
  // 検索を実行
  useEffect(() => {
    // 選択の解除
    setCheckedAll(false)
    setCheckedValues([])
    // ページ番号を初期化
    setPages(0)
    // 検索を実行
    getsUser(0, DEFAULT_DATA_LENGTH, searchQuery, null)
  }, [searchQuery])

  // ユーザー情報を取得
  async function getsUser(
    page?: number,
    limit?: number,
    query?: string,
    total?: number | null,
  ) {
    try {
      // ローディング開始
      setIsLoading(true)
      // データ取得
      const ep = `${API_URL.USER.GETS}${Number.isFinite(page) && `?page=${(page as number) + 1}`}${limit && `&limit=${limit}`}${query ? `&query=${query}` : ''}${total !== null ? `&total=${total}` : ''}`
      const response = await fetch(ep)
      if (!response.ok)
        throw new Error(`Failed to fetch data: ${response.status}`)
      const data = await response.json()
      // ユーザー情報を更新
      setUsers(data)
      // 検索キーワードがあって、合計値が未設定の場合、合計値を更新
      setSearchTotal(
        query?.trim() === '' ? null : total === null ? data.total : total,
      )
    } catch (error) {
      console.error('Failed to fetch data', error)
    } finally {
      // ローディング終了
      setIsLoading(false)
    }
  }

  // 全選択（ページごと）
  function handleCheckedPageAll(event: ChangeEvent<HTMLInputElement>) {
    setCheckedValues(
      event.target.checked
        ? getUserIds()
        : users.items.length !== checkedValues.length
          ? getUserIds()
          : [],
    )
    // 全選択を解除
    if (users.items.length === checkedValues.length) {
      setCheckedAll(false)
      setCheckedValues([])
    }
  }
  // 全選択
  async function handleCheckedContentAll() {
    let result: string[] = []
    try {
      // ローディング開始
      setIsLoading(true)
      // データ取得
      const ep = `${API_URL.USER.GETS}${searchQuery ? `?query=${searchQuery}` : ''}${searchTotal !== null ? `&total=${searchTotal}` : ''}`
      const response = await fetch(ep)
      if (!response.ok)
        throw new Error(`Failed to fetch data: ${response.status}`)
      const data = await response.json()
      data.items.map((item: any) => result.push(item.id))
    } catch (error) {
      console.error('Failed to fetch data', error)
    } finally {
      // ローディング終了
      setIsLoading(false)
    }
    //
    setCheckedValues(result)
  }

  // 選択/解除
  function handleCheckedValues(event: ChangeEvent<HTMLInputElement>) {
    setCheckedValues((previous) => {
      if (previous.includes(event.target.value)) {
        return previous.filter((value) => value !== event.target.value)
      } else {
        return [...previous, event.target.value]
      }
    })
  }
  // 選択した項目の id を取得
  function getUserIds() {
    return users.items.map((user: UserItems) => user.id)
  }

  // 選択した項目を削除
  async function handleUsersDelete(
    event: React.MouseEvent<HTMLButtonElement>,
  ): Promise<void> {
    // ボタンを無効化
    ;(event.currentTarget as HTMLButtonElement).disabled = true
    try {
      // ローディング開始
      setIsLoading(true)
      // データ削除
      const response = await fetch(`${API_URL.USER.DELETE}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: checkedValues }),
      })
      if (!response.ok)
        throw new Error(`Failed to delete data: ${response.status}`)
    } catch (error) {
      console.error('Failed to delete data', error)
    } finally {
      // ローディング終了
      setIsLoading(false)
    }
    // 選択の解除
    setCheckedAll(false)
    setCheckedValues([])
    // ページ番号を初期化
    setPages(0)
    // ユーザー情報の更新
    await getsUser(pages, DEFAULT_DATA_LENGTH)
    // 削除モーダルを閉じる
    setIsModalVisible(false)
  }

  return {
    users,
    checkedAll,
    checkedValues,
    setCheckedValues,
    pages,
    setPages,
    isModalOpen,
    setIsModalOpen,
    isModalVisible,
    setIsModalVisible,
    setSearchQuery,
    setSearchTotal,
    inputs,
    handleCheckedPageAll,
    handleCheckedContentAll,
    handleCheckedValues,
    handleUsersDelete,
  }
}
