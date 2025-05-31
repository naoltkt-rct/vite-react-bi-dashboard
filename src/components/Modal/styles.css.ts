// packages
import { style, styleVariants } from '@vanilla-extract/css'

// styles
import { mixins as m } from '@/styles/mixins'
import { COLORS, EASINGS } from '@/styles/themes'

export const defaultModal = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 9,
  width: '100dvw',
  height: '100dvh',
  backgroundColor: m.hexToRgba(COLORS.text, 0.75),
  transition: `opacity 0.3s ${EASINGS.easeInOutSine}, visibility 0.3s ${EASINGS.easeInOutSine}`,
})

export const modal = styleVariants({
  open: [defaultModal, { opacity: 1, visibility: 'visible' }],
  close: [defaultModal, { opacity: 0, visibility: 'hidden' }],
})

export const close = style({
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  top: '1em',
  right: '1em',
  border: 'none',
  padding: '0.5em',
  filter: 'brightness(0) invert(1)',
  cursor: 'pointer',
})

export const defaultContainer = style({
  textAlign: 'center',
  backgroundColor: COLORS.white,
  borderRadius: '0.25em',
  boxShadow: `0 0.5em 1em 0 ${m.hexToRgba(COLORS.text, 0.1)}`,
  padding: '1em 2em 2em',
  transition: `transform 0.3s ${EASINGS.easeInOutSine}`,
})

export const container = styleVariants({
  open: [defaultContainer, { transform: 'translateY(0)' }],
  close: [defaultContainer, { transform: `translateY(${m.mdv(20)})` }],
})

export const modalButtons = style({
  display: 'flex',
  width: 'max-content',
  marginInline: 'auto',
  justifyContent: 'center',
  columnGap: '1em',
  paddingTop: '2em',
})
