// packages
import { style, styleVariants } from '@vanilla-extract/css'

// styles
import { COLORS } from '@/styles/themes'

export const defaultTextarea = style({
  width: '100%',
  border: `1px solid ${COLORS.border}`,
  padding: '0.5em',
  outline: 'none',
  selectors: {
    '&::placeholder': {
      color: COLORS.border,
    },
  },
})

export const textarea = styleVariants({
  default: [defaultTextarea],
  error: [
    defaultTextarea,
    {
      borderColor: COLORS.error,
      borderWidth: '2px',
    },
  ],
})
