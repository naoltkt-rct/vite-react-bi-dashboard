// packages
import { style, styleVariants } from '@vanilla-extract/css'

// styles
import { wrapper } from '@/components/Layout/styles.css'
import { mixins as m } from '@/styles/mixins'
import { BUTTON, COLORS, EASINGS } from '@/styles/themes'

export const nav = style({
  backgroundColor: COLORS.white,
  transition: `width 0.3s ${EASINGS.easeInOutSine}`,
  overflow: 'hidden',
  selectors: {
    [`${wrapper.open} &`]: {
      width: m.mdv(BUTTON.pc.size * 5),
    },
    [`${wrapper.close} &`]: {
      width: m.mdv(BUTTON.pc.size * 1.5),
    },
  },
})

export const items = style({
  selectors: {
    '&:not(:last-of-type)': {
      marginBottom: '-0.25em',
    },
  },
})

export const defaultButton = style({
  display: 'flex',
  alignItems: 'center',
  columnGap: '0.5em',
  position: 'relative',
  width: '100%',
  selectors: {
    '&::after': {
      content: '',
      position: 'absolute',
      top: '0.25em',
      left: '0.25em',
      width: 'calc(100% - 0.5em)',
      height: 'calc(100% - 0.5em)',
      backgroundColor: 'transparent',
      borderRadius: '0.25em',
      padding: '0.25em',
      transition: `background 0.3s ${EASINGS.easeInOutSine}`,
    },
    '&:hover::after': {
      backgroundColor: m.hexToRgba(COLORS.text, 0.1),
    },
  },
})

export const button = styleVariants({
  default: [defaultButton],
  active: [
    defaultButton,
    {
      color: COLORS.white,
      selectors: {
        '&::after, &:hover::after': {
          backgroundColor: COLORS.primary,
        },
      },
    },
  ],
})

export const icon = style({
  display: 'inline-flex',
  flexShrink: 0,
  position: 'relative',
  zIndex: 1,
  width: m.mdv(BUTTON.pc.size * 1.5),
  height: m.mdv(BUTTON.pc.size * 1.5),
  padding: m.mdv((BUTTON.pc.size * 1.5 - BUTTON.pc.size) / 2),
})

export const image = style({
  width: m.mdv(BUTTON.pc.size),
  height: m.mdv(BUTTON.pc.size),
  selectors: {
    [`${button['active']} &`]: {
      filter: 'brightness(0) invert(1)',
    },
  },
})

export const menu = style({
  position: 'relative',
  zIndex: 1,
  width: 'max-content',
  whiteSpace: 'nowrap',
})

export const toggle = style({
  selectors: {
    [`${wrapper.open} &`]: {
      transform: 'scale(-1, -1)',
    },
  },
})
