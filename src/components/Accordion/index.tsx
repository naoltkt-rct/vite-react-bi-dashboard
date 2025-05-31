// import
import { assignInlineVars } from '@vanilla-extract/dynamic'

// styles
import {
  accordion,
  accordionBody,
  accordionBodyHeight,
  accordionIcon,
  accordionTrigger,
} from '@/components/Accordion/styles.css'

// hooks
import useAccordion from '@/components/Accordion/hooks'

// types
type Props = {
  trigger: string
  children: React.ReactNode
}

export default function Accordion({ trigger, children }: Props) {
  // hooks
  const { isOpen, setIsOpen, isVisible, heights, refs, handleOnTransitionEnd } =
    useAccordion()

  return (
    <div className={accordion}>
      <button
        type="button"
        onClick={(event: React.MouseEvent) => {
          event.stopPropagation()
          setIsOpen(!isOpen)
        }}
        className={accordionTrigger}
      >
        {trigger}
        <span className={accordionIcon[isOpen ? 'open' : 'close']} />
      </button>
      {(isOpen || isVisible) && (
        <div
          onTransitionEnd={handleOnTransitionEnd}
          ref={refs}
          className={accordionBody[isOpen ? 'open' : 'close']}
          style={assignInlineVars({
            [accordionBodyHeight]: `${heights}px`,
          })}
        >
          {children}
        </div>
      )}
    </div>
  )
}
