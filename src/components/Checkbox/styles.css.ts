// packages
import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

// styles
import { COLORS } from '@/styles/themes'

export const checkbox = recipe({
  base: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    width: '1em',
    height: '1em',
    selectors: {
      '&::before, &::after': {
        content: '',
        display: 'block',
      },
      '&::before': {
        width: '100%',
        height: '100%',
        border: `1px solid ${COLORS.primary}`,
        borderRadius: '0.25em',
      },
      '&::after': {
        position: 'absolute',
        top: '50%',
        left: '50%',
        opacity: 0,
      },
    },
  },
  variants: {
    checked: {
      true: {
        selectors: {
          '&::before': {
            backgroundColor: COLORS.primary,
          },
          '&::after': {
            opacity: 1,
          },
        },
      },
      false: {},
    },
    icon: {
      check: {
        selectors: {
          '&::after': {
            width: '0.5em',
            paddingTop: '0.25em',
            borderLeft: `2px solid #fff`,
            borderBottom: `2px solid #fff`,
            transform: 'translate(-50%, calc(-50% - 1px)) rotate(-45deg)',
          },
        },
      },
      minus: {
        selectors: {
          '&::before': {
            backgroundColor: COLORS.white,
          },
          '&::after': {
            width: '0.5em',
            borderBottom: `2px solid ${COLORS.primary}`,
            transform: 'translate(-50%, -50%)',
          },
        },
      },
    },
  },
})

export const input = style({
  display: 'none',
})
