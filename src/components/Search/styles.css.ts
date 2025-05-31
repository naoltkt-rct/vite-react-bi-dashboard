// packages
import { style, styleVariants } from '@vanilla-extract/css'

// styles
import { mixins as m } from '@/styles/mixins'
import { COLORS, EASINGS, WIDTH_PC } from '@/styles/themes'

export const defaultSearch = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '0.25em',
  width: m.mdv(WIDTH_PC / 2),
  backgroundColor: m.hexToRgba(COLORS.border, 0.25),
  borderRadius: 9999,
  paddingInline: m.mdv(4),
  transition: `background 0.3s ${EASINGS.easeInOutSine}`,
})

export const search = styleVariants({
  default: [defaultSearch],
  typing: [
    defaultSearch,
    {
      backgroundColor: COLORS.white,
    },
  ],
})

export const searchInput = style({
  width: '100%',
  outline: 'none',
  paddingBlock: '0.5em',
  selectors: {
    '&::placeholder': {
      color: COLORS.border,
    },
    '&::-webkit-search-cancel-button': {
      appearance: 'none',
    },
  },
})

export const searchButton = style({
  flexShrink: 0,
  width: m.mdv(32),
  height: m.mdv(32),
  display: 'flex',
  borderRadius: '50%',
  padding: '0.25em',
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

export const searchButtonIcon = style({
  width: '100%',
})
