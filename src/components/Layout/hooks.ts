// packages
import { useEffect, useState } from 'react'

// constants
import { API_URL, GLOBAL_NAVIGATION } from '@/constants'

export function useLayout(directory?: string, title?: string) {
  // useState
  // ユーザー情報
  const [ids, setIds] = useState<string | null>(null)
  const [avatars, setAvatars] = useState<string | null>(null)
  const [usernames, setUsernames] = useState<string | null>(null)
  const [authorities, setAuthorities] = useState<string | null>(null)
  const [drawers, setDrawers] = useState<boolean>(
    JSON.parse(sessionStorage.getItem('drawer') as string) ?? false,
  )

  // useEffect
  // ページタイトルの更新
  useEffect(() => {
    document.title = `${title ? `${title} | ` : ''}${
      GLOBAL_NAVIGATION.find(
        (item) => item.link?.split('/').pop() === directory,
      )?.text ?? ''
    } | Vite + React + TypeScript + Vanilla Extract`
  }, [directory, title])

  // ユーザー情報の取得
  useEffect(() => {
    if (sessionStorage.getItem('user') !== null) {
      // セッションストレージからユーザー情報を取得
      const users = JSON.parse(sessionStorage.getItem('user') as string)
      // ユーザー情報を更新
      setIds(users.id ?? null)
      setAvatars(users.avatar ?? null)
      setUsernames(users.username ?? null)
      setAuthorities(users.authority ?? null)
    } else {
      getUserInfo()
    }
  }, [sessionStorage.getItem('user')])

  // ドロワー状態を更新
  useEffect(() => {
    // ドロワー状態を取得
    if (sessionStorage.getItem('drawer') !== null) {
      // セッションストレージからドロワー状態を取得
      setDrawers(
        JSON.parse(sessionStorage.getItem('drawer') as string) ?? false,
      )
    }
  }, [sessionStorage.getItem('drawer')])

  // ユーザー情報を取得
  async function getUserInfo() {
    try {
      // データ取得
      const response = await fetch(API_URL.USER.GET_INFO)
      if (!response.ok)
        throw new Error(`Failed to fetch data: ${response.status}`)
      const data = await response.json()
      // ユーザー情報を更新
      setIds(data.id)
      setAvatars(data.avatar)
      setUsernames(data.username)
      setAuthorities(data.authority)

      // セッションストレージにユーザー情報を保存
      sessionStorage.setItem('user', JSON.stringify(data))
    } catch (error) {
      console.error('Failed to fetch data', error)
    }
  }

  // ドロワー開閉
  function toggleDrawer() {
    sessionStorage.setItem('drawer', JSON.stringify(!drawers))
    setDrawers(!drawers)
  }

  return { ids, avatars, usernames, authorities, drawers, toggleDrawer }
}
