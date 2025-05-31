// packages
import { MouseEvent, useEffect, useRef, useState } from 'react'

// utilities
import { wait } from '@/utilities/wait'

// styles
import { SPACINGS } from '@/styles/themes'

export function useTooltip(defaultPlacements: 'top' | 'bottom' = 'top') {
  // useState
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState<{ top: number; left: number }>({
    // デフォルトの位置は画面外とする
    top: -9999,
    left: -9999,
  })
  const [placements, setPlacements] = useState<'top' | 'bottom'>(
    defaultPlacements,
  )
  const [balloonPositions, setBalloonPositions] = useState<number | null>(null)

  // useRef
  const triggerRefs = useRef<HTMLButtonElement | null>(null)
  const tooltipRefs = useRef<HTMLDivElement | null>(null)

  // useEffect
  useEffect(() => {
    if (isVisible) requestAnimationFrame(calculatePosition)
  }, [isVisible])

  // transitionend イベントを監視
  useEffect(() => {
    if (tooltipRefs.current)
      tooltipRefs.current.addEventListener(
        'transitionend',
        handleOnTransitionEnd,
      )
    return () => {
      if (tooltipRefs.current)
        tooltipRefs.current.removeEventListener(
          'transitionend',
          handleOnTransitionEnd,
        )
    }
  }, [isVisible, isOpen])

  // 位置の仮決め
  let tentatives: {
    top: number
    left: number
    placements: 'top' | 'bottom'
  } = { top: -9999, left: -9999, placements: defaultPlacements }

  // 表示位置の算出
  function calculatePosition() {
    //
    if (!triggerRefs.current || !tooltipRefs.current) return

    // 現在位置の取得
    const rects = {
      trigger: triggerRefs.current.getBoundingClientRect(),
      tooltip: tooltipRefs.current.getBoundingClientRect(),
    }
    // 垂直位置
    const positions = {
      top: rects.trigger.top + window.scrollY - rects.tooltip.height - SPACINGS,
      bottom: rects.trigger.bottom + window.scrollY + SPACINGS,
    }

    // 垂直位置の決定
    if (defaultPlacements === 'top' && positions.top >= 0) {
      tentatives.top = positions.top
    } else if (
      defaultPlacements === 'bottom' &&
      positions.bottom + rects.tooltip.height <= window.innerHeight
    ) {
      tentatives.top = positions.bottom
    } else {
      tentatives.placements = defaultPlacements === 'top' ? 'bottom' : 'top'
      tentatives.top =
        tentatives.placements === 'top' ? positions.top : positions.bottom
    }

    // 水平位置
    tentatives.left =
      rects.trigger.left +
      window.scrollX +
      rects.trigger.width / 2 -
      rects.tooltip.width / 2

    // 水平位置の決定
    tentatives.left = Math.max(
      SPACINGS,
      Math.min(
        tentatives.left,
        window.innerWidth - rects.tooltip.width - SPACINGS,
      ),
    )

    // 更新
    setPosition({ top: tentatives.top, left: tentatives.left })
    setPlacements(tentatives.placements)

    // 吹き出し位置の調整
    setBalloonPositions(
      rects.trigger.left - tentatives.left + rects.trigger.width / 2,
    )
  }

  // tooltipContent 表示
  function handleMouseEnter() {
    setIsOpen(true)
    // isOpen の更新が反映されるまで確実に待つ
    wait(0).then(() => setIsVisible(true))
  }

  // tooltipContent 非表示
  function handleMouseLeave(event: MouseEvent) {
    if (
      tooltipRefs.current?.contains(event.relatedTarget as Node) ||
      triggerRefs.current?.contains(event.relatedTarget as Node)
    )
      return
    setIsVisible(false)
  }

  // transitionend イベントが完了後、クローズ処理を行う
  const handleOnTransitionEnd = () => {
    if (!isVisible) setIsOpen(false)
  }

  return {
    isOpen,
    isVisible,
    position,
    placements,
    balloonPositions,
    triggerRefs,
    tooltipRefs,
    handleMouseEnter,
    handleMouseLeave,
  }
}
