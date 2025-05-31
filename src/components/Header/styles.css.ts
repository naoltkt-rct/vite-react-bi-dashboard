// packages
import { style } from '@vanilla-extract/css'

// styles
import { mixins as m } from '@/styles/mixins'
import { BUTTON, COLORS, EASINGS } from '@/styles/themes'

export const header = style({
  position: 'relative',
  selectors: {
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '2px',
      backgroundColor: COLORS.primary,
      pointerEvents: 'none',
    },
  },
})

export const container = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

export const logo = style({
  display: 'inline-flex',
  alignItems: 'center',
  columnGap: '1em',
})

export const link = style({
  display: 'block',
  width: m.mdv(BUTTON.pc.size * 1.5),
  height: m.mdv(BUTTON.pc.size * 1.5),
  backgroundColor: COLORS.primary,
  padding: m.mdv((BUTTON.pc.size * 1.5 - BUTTON.pc.size) / 2),
})

export const image = style({
  width: m.mdv(BUTTON.pc.size),
  height: m.mdv(BUTTON.pc.size),
  filter: 'brightness(0) invert(1)',
})

export const label = style({
  display: 'inline-block',
  backgroundColor: 'hsla(0, 0%, 0%, 0.1)',
  padding: '0.25em 0.5em',
})

export const utilities = style({
  display: 'inline-flex',
  alignItems: 'center',
  columnGap: '1em',
  padding: `${m.mdv((BUTTON.pc.size * 1.5 - BUTTON.pc.size) / 2)} 1em`,
})

export const avatarIcon = style({
  display: 'block',
  position: 'relative',
  width: m.mdv(BUTTON.pc.size),
  height: m.mdv(BUTTON.pc.size),
  borderRadius: '50%',
  overflow: 'hidden',
  backgroundColor: 'hsla(0, 0%, 0%, 0.1)',
})

export const avatarImage = style({
  display: 'block',
  position: 'absolute',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
})

export const button = style({
  padding: '1em',
  transition: `opacity 0.3s ${EASINGS.easeInOutSine}`,
  selectors: {
    '&:hover': {
      opacity: 0.75,
    },
  },
})
