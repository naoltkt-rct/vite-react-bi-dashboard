// packages
import { createVar, style, styleVariants } from '@vanilla-extract/css'

// styles
import { mixins as m } from '@/styles/mixins'
import { COLORS, EASINGS } from '@/styles/themes'

// createVar
export const bodyHeight = createVar()
export const contentWidth = createVar()

export const table = style({
  background: COLORS.white,
  borderRadius: '0.5em',
  overflow: 'hidden',
})

export const body = style({
  display: 'block',
  position: 'relative',
  height: '100dvh',
  maxHeight: bodyHeight,
  overflowY: 'auto',
  scrollbarGutter: 'stable',
})

export const caution = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  columnGap: '1em',
  backgroundColor: m.hexToRgba(COLORS.border, 0.5),
  padding: '1em',
  overflow: 'hidden',
})

export const cautionButton = style({
  padding: '0.5em',
  borderRadius: '0.25em',
  transition: `background 0.3s ${EASINGS.easeInOutSine}`,
  selectors: {
    '&:hover': {
      backgroundColor: m.hexToRgba(COLORS.primary, 0.25),
    },
  },
})

export const defaultTr = style({
  display: 'flex',
  transition: `box-shadow 0.3s ${EASINGS.easeInOutSine}`,
})

export const tr = styleVariants({
  thead: [
    defaultTr,
    {
      overflowY: 'auto',
      scrollbarGutter: 'stable',
    },
  ],
  scrolled: [
    defaultTr,
    {
      overflowY: 'auto',
      scrollbarGutter: 'stable',
      boxShadow: `0px 0.5em 0.5em 0px ${m.hexToRgba(COLORS.border, 0.1)}`,
    },
  ],
  tbody: [defaultTr],
})

export const defaultContent = style({
  width: contentWidth,
  padding: '1.5em 0.25em',
})
export const content = styleVariants({
  th: [defaultContent],
  td: [defaultContent],
  checkbox: [
    defaultContent,
    {
      paddingInline: '1em',
    },
  ],
})

export const empty = style({
  display: 'block',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color: m.hexToRgba(COLORS.border, 0.5),
})
