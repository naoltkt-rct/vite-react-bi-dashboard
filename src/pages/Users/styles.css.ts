// packages
import { style } from '@vanilla-extract/css'

// styles
import { COLORS, EASINGS } from '@/styles/themes'

export const name = style({
  transition: `opacity 0.3s ${EASINGS.easeInOutSine}`,
  selectors: {
    '&:hover': {
      opacity: 0.75,
    },
  },
})

export const totalOccupancyRateOver = style({
  fontWeight: 700,
  color: COLORS.error,
})
