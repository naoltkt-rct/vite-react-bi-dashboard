// packages
import { assignInlineVars } from '@vanilla-extract/dynamic'
import { createPortal } from 'react-dom'

// hooks
import { usePopover } from '@/components/Popover/hooks'

// styles
import {
  popover,
  popoverTrigger,
  positionLeft,
  positionTop,
} from '@/components/Popover/styles.css'

// types
type Props = {
  trigger: React.ReactNode
  type?: 'icon' | 'text'
  disabled?: boolean
  children: React.ReactNode
}

export default function Popover({
  trigger,
  type = 'icon',
  disabled = false,
  children,
}: Props) {
  const uid = `popover-${Math.random().toString(36).substring(2)}`

  const {
    isOpen,
    isVisible,
    position,
    triggerRefs,
    popoverRefs,
    handleOnClick,
  } = usePopover(uid)

  return (
    <>
      <button
        type="button"
        id={uid}
        onClick={handleOnClick}
        disabled={disabled}
        ref={triggerRefs}
        className={
          type === 'text'
            ? popoverTrigger[isVisible ? 'visible' : 'hidden']
            : ''
        }
      >
        {trigger}
      </button>
      {isOpen &&
        createPortal(
          <div
            data-popover-id={uid}
            ref={popoverRefs}
            className={popover[isVisible ? 'visible' : 'hidden']}
            style={assignInlineVars({
              [positionTop]: `${position.top}px`,
              [positionLeft]: `${position.left}px`,
            })}
          >
            {children}
          </div>,
          document.body,
        )}
    </>
  )
}
