// packages
import { useNavigate } from 'react-router-dom'

// constants
import { API_URL, APP_URL } from '@/constants'

// hooks
import { useCustomContext } from '@/components/ContextProvider/hooks'

export function useHeader() {
  // hooks
  const { setIsLoading } = useCustomContext()

  // react-router-dom
  const navigate = useNavigate()

  // ログアウト
  async function postLogout() {
    try {
      // ローディング開始
      setIsLoading(true)
      // ログアウト
      const response = await fetch(API_URL.USER.POST_LOGOUT)
      if (!response.ok)
        throw new Error(`Failed to fetch data: ${response.status}`)
      // セッションストレージから認証状態を削除
      await sessionStorage.removeItem('status')
      // セッションストレージからユーザー情報を削除
      await sessionStorage.removeItem('user')
      // セッションストレージからドロワー状態を削除
      await sessionStorage.removeItem('drawer')
    } catch (error) {
      console.error('Failed to fetch data', error)
    } finally {
      // ローディング終了
      setIsLoading(false)
    }
    // ログアウト後、ログインページに遷移
    navigate(APP_URL.LOGIN.path as string)
  }

  return { postLogout }
}
