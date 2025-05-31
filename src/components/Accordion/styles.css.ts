// import
import { createVar, style, styleVariants } from '@vanilla-extract/css'

// styles
import { mixins as m } from '@/styles/mixins'
import { COLORS, EASINGS } from '@/styles/themes'

// createVar
export const accordionBodyHeight = createVar()

export const accordion = style({
  backgroundColor: COLORS.white,
  borderRadius: '0.5em',
})

export const accordionTrigger = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'relative',
  width: '100%',
  padding: '1em',
  transition: `opacity 0.3s ${EASINGS.easeInOutSine}`,
  selectors: {
    '&:hover': {
      opacity: 0.75,
    },
  },
})

export const defaultAccordionIcon = style({
  display: 'block',
  position: 'relative',
  width: '1em',
  height: '1em',
  selectors: {
    '&::before, &::after': {
      content: '',
      display: 'block',
      position: 'absolute',
      top: '50%',
      left: 0,
      width: '100%',
      height: m.mdv(2),
      backgroundColor: COLORS.primary,
      transition: `transform 0.3s ${EASINGS.easeInOutSine}`,
    },
    '&::before': {
      transform: 'translateY(calc(-50% + 1px)) rotate(-90deg)',
    },
  },
})

export const accordionIcon = styleVariants({
  open: [
    defaultAccordionIcon,
    {
      selectors: {
        '&::before': {
          transform: 'translateY(calc(-50% + 1px)) rotate(0)',
        },
      },
    },
  ],
  close: [defaultAccordionIcon],
})

export const defaultAccordionBody = style({
  backgroundColor: m.hexToRgba(COLORS.primary, 0.06),
  maxHeight: 0,
  paddingInline: '1em',
  transition: `max-height 0.3s ${EASINGS.easeInOutSine}`,
  overflow: 'hidden',
})

export const accordionBody = styleVariants({
  open: [
    defaultAccordionBody,
    {
      maxHeight: accordionBodyHeight,
    },
  ],
  close: [
    defaultAccordionBody,
    {
      pointerEvents: 'none',
    },
  ],
})
