// packages
import type { RouteProps } from 'react-router-dom'

// pages
import {
  Home,
  Login,
  Settings,
  Tasks,
  TasksDetail,
  Users,
  UsersDetail,
} from '@/pages'

/**
 * ルーティング情報
 * @type {RouteProps & { allowUnauthenticated?: boolean }}
 * 認証が不要なページは allowUnauthenticated に true を設定
 */
export const APP_URL: {
  [key: string]: RouteProps & { allowUnauthenticated?: boolean }
} = {
  // `/`への遷移は、ログイン画面にリダイレクトさせる
  // ログイン画面への遷移前に認証チェックを行わないように、 allowUnauthenticated を true を設定
  DEFAULT: {
    path: '/',
    allowUnauthenticated: true,
    Component: Login,
  },
  HOME: {
    path: '/home',
    Component: Home,
  },
  LOGIN: {
    path: '/login',
    Component: Login,
    allowUnauthenticated: true,
  },
  TASKS: {
    path: '/tasks',
    Component: Tasks,
  },
  TASKS_ADD: {
    path: '/tasks/add',
    Component: TasksDetail,
  },
  TASKS_EDIT: {
    path: `/tasks/edit/:id`,
    Component: TasksDetail,
  },
  USERS: {
    path: '/users',
    Component: Users,
  },
  USERS_ADD: {
    path: '/users/add',
    Component: UsersDetail,
  },
  USERS_EDIT: {
    path: `/users/edit/:id`,
    Component: UsersDetail,
  },
  SETTINGS: {
    path: '/settings',
    Component: Settings,
  },
}

// 認証が不要なページのみを取得
export const ALLOW_UNAUTHENTICATED = Object.entries(APP_URL)
  .map(([_, value]) => {
    if (!value.allowUnauthenticated) return
    return value.path
  })
  .filter((value) => value)

// ナビゲーションメニュー
export const GLOBAL_NAVIGATION = [
  {
    link: APP_URL.HOME.path,
    icon: '/icons/home.svg',
    text: 'HOME',
  },
  { link: APP_URL.TASKS.path, icon: '/icons/tasks.svg', text: '案件一覧' },
  { link: APP_URL.USERS.path, icon: '/icons/users.svg', text: 'ユーザー一覧' },
  {
    link: APP_URL.SETTINGS.path,
    icon: '/icons/settings.svg',
    text: '個人設定',
  },
]
