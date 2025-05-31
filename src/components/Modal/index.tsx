// packages
import { createPortal } from 'react-dom'

// hooks
import { useModal } from '@/components/Modal/hooks'

// styles
import { close, container, modal } from '@/components/Modal/styles.css'

// types
type Props = {
  isOpen: boolean
  onClose: () => void
  isVisible: boolean
  setIsVisible: (isVisible: boolean) => void
  children: React.ReactNode
}

export default function Modal({
  isOpen,
  onClose,
  isVisible,
  setIsVisible,
  children,
}: Props) {
  // hooks
  const { modalRefs, containerRefs } = useModal(
    isOpen,
    onClose,
    isVisible,
    setIsVisible,
  )

  return (
    isOpen &&
    createPortal(
      <dialog
        open={isVisible}
        ref={modalRefs}
        className={modal[isVisible ? 'open' : 'close']}
      >
        <button
          type="button"
          onClick={() => setIsVisible(false)}
          className={close}
        >
          <img src="/icons/close.svg" alt="" />
          CLOSE
        </button>
        <div
          ref={containerRefs}
          className={container[isVisible ? 'open' : 'close']}
        >
          {children}
        </div>
      </dialog>,
      document.body,
    )
  )
}
