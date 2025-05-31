// packages
import { recipe } from '@vanilla-extract/recipes'

// styles
import { COLORS, EASINGS } from '@/styles/themes'

export const button = recipe({
  base: {
    display: 'block',
    width: 'max-content',
    borderRadius: '0.25em',
    marginInline: 'auto',
    padding: '0.5em 1em',
    transition: `opacity 0.3s ${EASINGS.easeInOutSine}`,
    selectors: {
      '&:hover': {
        opacity: 0.75,
      },
      '&:disabled': {
        opacity: 0.25,
        cursor: 'not-allowed',
      },
    },
  },
  variants: {
    type: {
      button: {
        border: `2px solid ${COLORS.button}`,
      },
      submit: {
        color: COLORS.white,
        backgroundColor: COLORS.button,
        selectors: {
          '&:disabled': {
            color: COLORS.white,
            backgroundColor: COLORS.disabled,
          },
        },
      },
      rounded: {
        border: `2px solid ${COLORS.button}`,
        borderRadius: 9999,
        transition: `color 0.3s ${EASINGS.easeInOutSine}, background 0.3s ${EASINGS.easeInOutSine}`,
        selectors: {
          '&:hover': {
            color: COLORS.white,
            backgroundColor: COLORS.button,
            opacity: 1,
          },
        },
      },
    },
  },
})
