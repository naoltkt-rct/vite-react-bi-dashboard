// packages
import { createContext, useContext, useEffect, useState } from 'react'

type ContextType = {
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

export const CustomContext = createContext<ContextType | undefined>(undefined)

export function useCustomContextState() {
  // useState
  const [isLoading, setIsLoading] = useState(false)

  // useEffect
  // ローディング実行時の背景固定
  useEffect(() => {
    let scrolled: number = 0
    if (isLoading) {
      // スクロール位置を取得
      scrolled = window.pageYOffset || document.documentElement.scrollTop
      // 背景を固定
      Object.assign(document.body.style, {
        position: 'fixed',
        top: `-${scrolled}px`,
        width: '100%',
        overflow: 'hidden',
      })
    } else {
      // スクロール位置を取得
      scrolled = parseInt(document.body.style.top)
      // 背景の固定を解除
      Object.assign(document.body.style, {
        position: '',
        top: '',
        width: '',
        overflow: '',
      })
      // スクロール位置を戻す
      window.scrollTo(0, scrolled * -1)
    }
  }, [isLoading])

  return { isLoading, setIsLoading }
}

export function useCustomContext() {
  const context = useContext(CustomContext)
  if (context === undefined)
    throw new Error('useContextProvider must be used within a ContextProvider')
  return context
}
