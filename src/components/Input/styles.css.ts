// packages
import { style, styleVariants } from '@vanilla-extract/css'

// styles
import { COLORS } from '@/styles/themes'

export const defaultInput = style({
  appearance: 'none',
  width: '100%',
  border: `1px solid ${COLORS.border}`,
  padding: '0.5em',
  outline: 'none',
  selectors: {
    '&:-webkit-autofill': {
      boxShadow: '0 0 0px 1000px #fff inset',
    },
    '&:-webkit-autofill:hover': {
      boxShadow: '0 0 0px 1000px #fff inset',
    },
    '&:-webkit-autofill:focus': {
      boxShadow: '0 0 0px 1000px #fff inset',
    },
    '&:-webkit-autofill:active': {
      boxShadow: '0 0 0px 1000px #fff inset',
    },
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
