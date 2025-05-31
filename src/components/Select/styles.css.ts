// packages
import { style, styleVariants } from '@vanilla-extract/css'

// styles
import { mixins as m } from '@/styles/mixins'
import { COLORS, EASINGS } from '@/styles/themes'

export const wrapper = style({
  position: 'relative',
  width: m.mdv(260),
})

export const defaultTrigger = style({
  position: 'relative',
  width: '100%',
  border: `1px solid ${COLORS.border}`,
  padding: '0.5em 2em 0.5em 0.5em',
  cursor: 'pointer',
  selectors: {
    '&:after': {
      content: '▼',
      position: 'absolute',
      top: '50%',
      right: '0.5em',
      transform: 'translateY(-50%)',
    },
    '&[value=""]': {
      color: COLORS.border,
    },
    '&:disabled': {
      color: COLORS.disabled,
      backgroundColor: m.hexToRgba(COLORS.border, 0.5),
      opacity: '0.5',
      cursor: 'not-allowed',
    },
  },
})

export const trigger = styleVariants({
  default: [defaultTrigger],
  error: [
    defaultTrigger,
    {
      borderColor: COLORS.error,
      borderWidth: '2px',
    },
  ],
})

export const defaultSelect = style({
  position: 'absolute',
  zIndex: 1,
  width: '100%',
  background: COLORS.white,
  border: `1px solid ${COLORS.border}`,
  transition: `transform 0.3s ${EASINGS.easeInOutSine}, opacity 0.3s ${EASINGS.easeInOutSine}`,
})

export const select = styleVariants({
  open: [
    defaultSelect,
    {
      maxHeight: m.mdv(220),
      overflowY: 'auto',
      transform: 'translateY(0)',
      opacity: 1,
      visibility: 'visible',
      pointerEvents: 'auto',
    },
  ],
  close: [
    defaultSelect,
    {
      maxHeight: '0',
      transform: 'translateY(0.5em)',
      opacity: 0,
      visibility: 'hidden',
      pointerEvents: 'none',
    },
  ],
})

export const hiddenSelect = style({
  opacity: '0 !important',
  pointerEvents: 'none',
})

export const defaultButton = style({
  display: 'block',
  width: '100%',
  padding: '0.5em',
  cursor: 'pointer',
  selectors: {
    '&[value=""]': {
      color: COLORS.border,
    },
  },
})

export const button = styleVariants({
  selected: [
    defaultButton,
    {
      fontWeight: '700',
      selectors: {
        '&[value=""]': {
          fontWeight: '400',
        },
      },
    },
  ],
  unselected: [defaultButton],
})
