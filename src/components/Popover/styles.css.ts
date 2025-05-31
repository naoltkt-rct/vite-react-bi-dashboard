// packages
import { createVar, style, styleVariants } from '@vanilla-extract/css'

// styles
import { mixins as m } from '@/styles/mixins'
import { COLORS, EASINGS } from '@/styles/themes'

// createVar
export const positionTop = createVar()
export const positionLeft = createVar()

export const defaultPopoverTrigger = style({
  display: 'block',
  padding: '0.5em',
  borderRadius: '0.25em',
  transition: `background 0.3s ${EASINGS.easeInOutSine}`,
  selectors: {
    '&:hover': {
      backgroundColor: m.hexToRgba(COLORS.primary, 0.25),
    },
    '&:disabled': {
      opacity: 0.25,
      pointerEvents: 'none',
    },
  },
})

export const popoverTrigger = styleVariants({
  visible: [
    defaultPopoverTrigger,
    {
      backgroundColor: m.hexToRgba(COLORS.primary, 0.25),
    },
  ],
  hidden: [defaultPopoverTrigger],
})

export const defaultPopover = style({
  position: 'absolute',
  top: positionTop,
  left: positionLeft,
  zIndex: 8,
  width: 'max-content',
  background: COLORS.white,
  boxShadow: `0 0.5em 1em 0 ${m.hexToRgba(COLORS.text, 0.1)}`,
  marginTop: '0.5em',
  transition: `opacity 0.3s ${EASINGS.easeInOutSine}, transform 0.3s ${EASINGS.easeInOutSine}`,
})

export const popover = styleVariants({
  visible: [defaultPopover, { opacity: 1, transform: 'translateY(0)' }],
  hidden: [
    defaultPopover,
    { opacity: 0, transform: `translateY(${m.mdv(10)})` },
  ],
})
