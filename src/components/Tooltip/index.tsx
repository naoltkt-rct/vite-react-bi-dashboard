// packages
import { assignInlineVars } from '@vanilla-extract/dynamic'
import { createPortal } from 'react-dom'

// hooks
import { useTooltip } from '@/components/Tooltip/hooks'

// styles
import {
  balloonLeft,
  content,
  contentLeft,
  contentTop,
  icon,
  tooltipColor,
} from '@/components/Tooltip/styles.css'
import { COLORS } from '@/styles/themes'

// types
type Props = {
  trigger: React.ReactNode
  placements?: 'top' | 'bottom'
  color?: string
  children: React.ReactNode
}

export default function Tooltip({
  trigger,
  placements = 'top',
  color = COLORS.primary,
  children,
}: Props) {
  const {
    isOpen,
    isVisible,
    position,
    balloonPositions,
    triggerRefs,
    tooltipRefs,
    handleMouseEnter,
    handleMouseLeave,
  } = useTooltip(placements)

  return (
    <>
      <button
        type="button"
        ref={triggerRefs}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={icon}
        style={assignInlineVars({
          [tooltipColor]: color,
        })}
      >
        {trigger}
      </button>
      {isOpen &&
        createPortal(
          <div
            ref={tooltipRefs}
            className={content({ visible: isVisible, placements: placements })}
            style={assignInlineVars({
              [tooltipColor]: color,
              [contentTop]: `${position.top}px`,
              [contentLeft]: `${position.left}px`,
              [balloonLeft]: balloonPositions ? `${balloonPositions}px` : '50%',
            })}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {children}
          </div>,
          document.body,
        )}
    </>
  )
}
