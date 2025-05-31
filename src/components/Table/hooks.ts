// packages
import { useEffect, useRef, useState } from 'react'

export function useTable(tbody: React.ReactNode) {
  // useState
  const [offsetHeight, setOffsetHeight] = useState<number>(0)
  const [scrolled, setScrolled] = useState<boolean>(false)

  // useRef
  const dvh = useRef<HTMLDivElement>(null)

  // useEffect
  useEffect(() => {
    updateHeight()
    requestAnimationFrame(updateHeight)
    window.addEventListener('resize', updateHeight)
    // スクロール位置を監視
    if (dvh.current) dvh.current.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('resize', updateHeight)
      // スクロール位置を監視
      if (dvh.current) dvh.current.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // データ変更時にスクロールを先頭に戻す
  useEffect(() => {
    if (dvh.current) dvh.current?.scrollTo({ top: 0 })
  }, [tbody])

  // 動的にコンテンツの高さを設定
  function updateHeight() {
    if (dvh.current)
      setOffsetHeight(
        window.innerHeight -
          (dvh.current.getBoundingClientRect().top + window.scrollY),
      )
  }

  // スクロール位置を監視
  function handleScroll() {
    if (dvh.current) setScrolled(dvh.current.scrollTop > 0)
  }

  return { offsetHeight, dvh, scrolled }
}
