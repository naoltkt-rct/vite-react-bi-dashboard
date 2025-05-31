// packages
import { style, styleVariants } from '@vanilla-extract/css'

// styles
import { mixins as m } from '@/styles/mixins'
import { COLORS } from '@/styles/themes'

export const wrapper = style({
  width: m.mdv(130),
  border: `1px solid ${COLORS.border}`,
})

export const defaultInput = style({
  width: '100%',
  padding: '0.5em',
  cursor: 'pointer',
  outline: 'none',
  selectors: {
    '&::placeholder': {
      color: COLORS.border,
    },
  },
})

export const input = styleVariants({
  default: [defaultInput],
  error: [
    defaultInput,
    {
      borderColor: COLORS.error,
      borderWidth: '2px',
    },
  ],
})
