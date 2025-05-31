// packages
import { useEffect, useRef, useState } from 'react'

// utilities
import { wait } from '@/utilities/wait'

// styles
import { SPACINGS } from '@/styles/themes'

export function usePopover(id?: string) {
  // useState
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  })

  // useRef
  const triggerRefs = useRef<HTMLButtonElement | null>(null)
  const popoverRefs = useRef<HTMLDivElement | null>(null)

  // useEffect
  useEffect(() => {
    if (isVisible) {
      // ウィンドウサイズを変更時
      window.addEventListener('resize', calculatePosition)
      // 要素外を押下時
      document.addEventListener('click', handleOnClickOutside)
      calculatePosition()
    }

    return () => {
      // ウィンドウサイズを変更時
      window.removeEventListener('resize', calculatePosition)
      // 要素外を押下時
      document.removeEventListener('click', handleOnClickOutside)
    }
  }, [isVisible])

  // transitionend イベントを監視
  useEffect(() => {
    if (popoverRefs.current)
      popoverRefs.current.addEventListener(
        'transitionend',
        handleOnTransitionEnd,
      )
    return () => {
      if (popoverRefs.current)
        popoverRefs.current.removeEventListener(
          'transitionend',
          handleOnTransitionEnd,
        )
    }
  }, [isVisible, isOpen])

  // 同一画面に複数の要素が表示されている場合
  useEffect(() => {
    if (id && isOpen) {
      Array.from(document.querySelectorAll('[data-popover-id]')).map(
        (popover) => {
          // id が一致しない場合、他の要素を閉じる
          if (popover.getAttribute('data-popover-id') !== id)
            document
              .getElementById(popover.getAttribute('data-popover-id') as string)
              ?.click()
        },
      )
    }
  }, [isOpen])

  // 位置の仮決め
  let tentatives: {
    top: number
    left: number
  } = { top: -9999, left: -9999 }

  // 表示位置の算出
  function calculatePosition() {
    if (!triggerRefs.current || !popoverRefs.current) return

    // 現在位置の取得
    const rects = {
      trigger: triggerRefs.current.getBoundingClientRect(),
      popover: popoverRefs.current.getBoundingClientRect(),
    }

    // 初期位置を設定
    tentatives.top = rects.trigger.bottom + window.scrollY
    tentatives.left = rects.trigger.left + window.scrollX

    // ブラウザ幅を超えた場合の調整
    // 垂直位置
    if (
      tentatives.top + rects.popover.height >
      window.innerHeight + window.scrollY
    )
      tentatives.top = rects.trigger.top + window.scrollY - rects.popover.height
    if (tentatives.top < window.scrollY)
      tentatives.top = window.scrollY + SPACINGS

    // 水平位置
    if (tentatives.left + rects.popover.width > window.innerWidth)
      tentatives.left = window.innerWidth - rects.popover.width - SPACINGS
    if (tentatives.left < 0) tentatives.left = SPACINGS

    setPosition({
      top: tentatives.top,
      left: tentatives.left,
    })
  }

  function handleOnClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation()
    setIsOpen((previous) => !previous)
    wait(0).then(() => setIsVisible((previous) => !previous))
  }

  // 要素外のクリックを検知して閉じる
  function handleOnClickOutside(event: MouseEvent) {
    if (
      !triggerRefs.current ||
      !triggerRefs.current.contains(event.target as Node)
    ) {
      setIsVisible(false)
    }
  }

  // transitionend イベントが完了後、クローズ処理を行う
  function handleOnTransitionEnd() {
    if (!isVisible) setIsOpen(false)
  }

  return {
    isOpen,
    isVisible,
    position,
    setIsVisible,
    handleOnClick,
    triggerRefs,
    popoverRefs,
  }
}
