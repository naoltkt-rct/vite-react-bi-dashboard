// packages
import { useCallback, useEffect, useRef } from 'react'

export function useModal(
  isOpen: boolean,
  onClose: () => void,
  isVisible: boolean,
  setIsVisible: (isVisible: boolean) => void,
) {
  // useRef
  const modalRefs = useRef<HTMLDialogElement>(null)
  const containerRefs = useRef<HTMLDivElement>(null)

  // useCallback
  // モーダル外のクリックを検知して閉じる
  const handleOnCloseModal = useCallback((event: MouseEvent) => {
    if (
      containerRefs.current &&
      !containerRefs.current.contains(event.target as Node)
    )
      setIsVisible(false)
  }, [])

  // useEffect
  // click イベントを監視
  useEffect(() => {
    if (isOpen) document.addEventListener('click', handleOnCloseModal)
    setIsVisible(isOpen)
    return () => {
      document.removeEventListener('click', handleOnCloseModal)
    }
  }, [isOpen, handleOnCloseModal])

  // transitionend イベントを監視
  useEffect(() => {
    if (modalRefs.current)
      modalRefs.current.addEventListener('transitionend', handleOnTransitionEnd)
    return () => {
      if (modalRefs.current)
        modalRefs.current.removeEventListener(
          'transitionend',
          handleOnTransitionEnd,
        )
    }
  }, [isVisible, onClose])

  // transitionend イベントが完了後、クローズ処理を行う
  function handleOnTransitionEnd() {
    if (!isVisible) onClose()
  }

  return {
    modalRefs,
    containerRefs,
    isVisible,
    setIsVisible,
  }
}
