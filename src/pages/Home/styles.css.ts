// packages
import { style, styleVariants } from '@vanilla-extract/css'

// styles
import { mixins as m } from '@/styles/mixins'
import { COLORS } from '@/styles/themes'

export const wrapper = style({
  display: 'flex',
  gap: '2em',
})

export const box = style({
  width: '100%',
})

export const boxThead = style({
  display: 'flex',
  paddingInline: '1em',
})

export const heading = style({
  display: 'block',
  fontSize: m.mdv(20),
  fontWeight: 700,
  paddingInline: 0,
  paddingBlock: '0.5em',
})

export const userItems = style({
  marginBottom: '0.5em',
})

export const defaultItems = style({
  display: 'flex',
  borderRadius: '0.5em',
  backgroundColor: COLORS.white,
  marginBottom: '0.5em',
  paddingInline: '0.75em',
})

export const items = styleVariants({
  own: [
    defaultItems,
    {
      position: 'relative',
      overflow: 'hidden',
      selectors: {
        '&::after': {
          content: '',
          display: 'block',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: m.hexToRgba(COLORS.primary, 0.03),
          pointerEvents: 'none',
        },
      },
    },
  ],
  over_capacity: [
    defaultItems,
    {
      backgroundColor: m.hexToRgba(COLORS.error, 0.1),
      selectors: {
        '&:last-of-type': {
          marginBottom: '0.75em',
        },
      },
    },
  ],
})

export const defaultContent = style({
  paddingBlock: '0.5em',
})

export const content = styleVariants({
  th: [
    defaultContent,
    {
      fontSize: m.mdv(14),
      fontWeight: 700,
    },
  ],
  own: [
    defaultContent,
    {
      paddingBlock: '1em',
    },
  ],
  over_capacity: [
    defaultContent,
    {
      paddingBlock: '0.5em',
    },
  ],
})

export const overCapacityText = style({
  color: COLORS.error,
  marginBottom: '1em',
})

export const link = style({
  width: m.mdv(160),
  textAlign: 'center',
  marginTop: '2em',
})
