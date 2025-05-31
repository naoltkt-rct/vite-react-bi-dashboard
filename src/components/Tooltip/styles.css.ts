// packages
import { createVar, style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

// styles
import { mixins as m } from '@/styles/mixins'
import { COLORS, EASINGS } from '@/styles/themes'

// createVar
export const tooltipColor = createVar()
export const contentTop = createVar()
export const contentLeft = createVar()
export const balloonLeft = createVar()

export const icon = style({
  display: 'inline-block',
  verticalAlign: 'baseline',
  width: '1em',
  height: '1em',
  textAlign: 'center',
  color: COLORS.white,
  lineHeight: 1,
  backgroundColor: tooltipColor,
  borderRadius: '50%',
  marginInline: '0.5em',
  cursor: 'pointer',
})

export const content = recipe({
  base: {
    position: 'absolute',
    top: contentTop,
    left: contentLeft,
    zIndex: 10,
    fontSize: m.mdv(12),
    color: COLORS.white,
    whiteSpace: 'nowrap',
    background: tooltipColor,
    borderRadius: m.mdv(4),
    padding: `${m.mdv(5)} ${m.mdv(10)}`,
    transition: `opacity 0.3s ${EASINGS.easeInOutSine}, transform 0.3s ${EASINGS.easeInOutSine}`,
    transform: `translateY(${m.mdv(10)})`,
    selectors: {
      '&::before, &::after': {
        content: '',
        position: 'absolute',
        transition: `top 0.3s ${EASINGS.easeInOutSine}`,
      },
      '&::before': {
        left: balloonLeft,
        zIndex: -1,
        border: '0.5em solid transparent',
        marginLeft: '-0.5em',
      },
      '&::after': {
        left: 0,
        width: '100%',
        height: m.mdv(10),
      },
    },
  },
  variants: {
    visible: {
      true: {
        opacity: 1,
        transform: 'translateY(0)',
      },
      false: {
        opacity: 0,
        transform: `translateY(${m.mdv(10)})`,
        selectors: {
          '&::before': {
            top: 0,
          },
        },
      },
    },
    placements: {
      top: {
        selectors: {
          '&::before': {
            borderTop: `0.5em solid ${tooltipColor}`,
          },
        },
      },
      bottom: {
        selectors: {
          '&::before': {
            borderBottom: `0.5em solid ${tooltipColor}`,
          },
        },
      },
    },
  },
  compoundVariants: [
    {
      variants: {
        visible: true,
        placements: 'top',
      },
      style: {
        selectors: {
          '&::before': {
            top: '100%',
          },
        },
      },
    },
    {
      variants: {
        visible: true,
        placements: 'bottom',
      },
      style: {
        selectors: {
          '&::before': {
            top: '-1em',
          },
        },
      },
    },
  ],
})
