// packages
import { useEffect, useState } from 'react'

// constants
import { API_URL } from '@/constants'

// hooks
import { useCustomContext } from '@/components/ContextProvider/hooks'

export default function useHome() {
  // hooks
  const { setIsLoading } = useCustomContext()

  // useState
  const [owns, setOwns] = useState({
    id: '',
    organization: '',
  })
  const [tasks, setTasks] = useState<any[]>([])

  useEffect(() => {
    if (sessionStorage.getItem('user')) {
      // 自分の情報を取得
      setOwns({
        id: JSON.parse(sessionStorage.getItem('user') as string).id,
        organization: JSON.parse(sessionStorage.getItem('user') as string)
          .organization,
      })
    }
    // ユーザー情報を取得
    getsOverCapacity()
  }, [])

  function getsOverCapacity() {
    // ローディング開始
    setIsLoading(true)
    fetch(API_URL.USER.GETS_OVER_CAPACITY)
      .then((response) => response.json())
      .then((data) => {
        // 案件に紐づくユーザー情報を取得
        postTasks(
          data.length > 0
            ? [JSON.parse(sessionStorage.getItem('user') as string).id, ...data]
            : [JSON.parse(sessionStorage.getItem('user') as string).id],
        )
      })
      .catch((error) => console.error('Failed to fetch data', error))
  }

  // ユーザーに紐づく案件情報を取得
  async function postTasks(ids: string[]) {
    try {
      const response = await fetch(API_URL.TASK.POST_ASSIGNMENTS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: ids }),
      })
      if (!response.ok)
        throw new Error(`Failed to fetch data: ${response.status}`)
      const data = await response.json()
      // 案件情報を更新
      setTasks(data)
    } catch (error) {
      console.error('Failed to fetch data', error)
    } finally {
      // ローディング終了
      setIsLoading(false)
    }
  }
  return { owns, tasks }
}
