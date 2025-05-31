// packages
import { useEffect, useRef, useState } from 'react'

export default function useAccordion() {
  // useState
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [heights, setHeights] = useState(0)

  // useRef
  const refs = useRef<HTMLDivElement>(null)

  // useEffect
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      setHeights(refs.current ? refs.current?.scrollHeight : 0)
    } else {
      setHeights(0)
    }
  }, [isOpen])

  // transitionend イベントが完了後、クローズ処理を行う
  const handleOnTransitionEnd = () => {
    if (!isOpen) setIsVisible(false)
  }

  return {
    isOpen,
    setIsOpen,
    isVisible,
    heights,
    refs,
    handleOnTransitionEnd,
  }
}
