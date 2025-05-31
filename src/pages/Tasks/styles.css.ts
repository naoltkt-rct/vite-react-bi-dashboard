// packages
import { style } from '@vanilla-extract/css'

// styles
import { EASINGS } from '@/styles/themes'

export const name = style({
  transition: `opacity 0.3s ${EASINGS.easeInOutSine}`,
  selectors: {
    '&:hover': {
      opacity: 0.75,
    },
  },
})

export const priority = style({
  display: 'inline-block',
  verticalAlign: 'baseline',
})
