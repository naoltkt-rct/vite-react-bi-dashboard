// packages
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

// constants
import {
  ALLOW_UNAUTHENTICATED,
  API_URL,
  APP_URL,
  USER_STATUS,
} from '@/constants'

// hooks
import { useCustomContext } from '@/components/ContextProvider/hooks'

export function useLoginRouteGuard() {
  // hooks
  const { setIsLoading } = useCustomContext()

  // react-router-dom
  const location = useLocation()
  const navigate = useNavigate()

  // useState
  const [authorized, setAuthorized] = useState<boolean>(false)

  // useEffect
  useEffect(() => {
    // 認証が不要なページの場合、ログインチェックをスキップ
    if (!ALLOW_UNAUTHENTICATED.includes(location.pathname))
      confirmAuthorizedStatus()
  }, [location.pathname])

  async function confirmAuthorizedStatus() {
    // ローディング開始
    setIsLoading(true)
    // セッションストレージから認証状態を取得
    const session = JSON.parse(sessionStorage.getItem('status') as string)
    // 処理実行
    session ? confirmAuthorized(session) : await confirmLoggedIn()
    // ローディング終了
    setIsLoading(false)
  }

  // ログイン状態
  async function confirmLoggedIn() {
    // ログイン状態の初期値
    let isAuthorized = false
    try {
      // データ取得
      const response = await fetch(API_URL.USER.GET_INFO)
      if (!response.ok)
        throw new Error(`Failed to fetch data: ${response.status}`)
      const data = await response.json()
      // ログイン状態を更新
      isAuthorized = data.status === USER_STATUS.ACTIVE
      // ログイン状態をセッションストレージに保存
      sessionStorage.setItem(
        'status',
        data.status === USER_STATUS.ACTIVE ? 'true' : 'false',
      )
    } catch (error) {
      console.error('Failed to fetch data', error)
      // エラー時は未ログイン扱いにする
      isAuthorized = false
    }
    // ログイン状態に応じた認証確認を実行
    confirmAuthorized(isAuthorized)
  }

  // 認証状態
  function confirmAuthorized(isAuthorized: boolean) {
    // 認証状態を更新
    setAuthorized(isAuthorized)
    // 未認証の場合はログイン画面にリダイレクト
    if (!isAuthorized) navigate(APP_URL.LOGIN.path as string)
  }

  return {
    authorized,
  }
}
