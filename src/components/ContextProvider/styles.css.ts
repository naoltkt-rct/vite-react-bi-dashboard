// packages
import { keyframes, style, styleVariants } from '@vanilla-extract/css'

// styles
import { mixins as m } from '@/styles/mixins'
import { COLORS, EASINGS } from '@/styles/themes'

// keyframes
export const loadingKeyframes = keyframes({
  '0%, 60%': {
    top: '40%',
    bottom: '40%',
  },
  '20%': {
    top: 0,
    bottom: '40%',
  },
  '40%': {
    top: '40%',
    bottom: 0,
  },
})

export const wrapper = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 9,
  width: '100%',
  height: '100%',
  minHeight: '100dvh',
  color: COLORS.white,
  backgroundColor: m.hexToRgba(COLORS.text, 0.5),
})

export const loading = style({
  position: 'relative',
  width: m.mdv(80 * 1.7),
  height: m.mdv(80),
})

const ats: number = 1.5
export const defaultBars = style({
  position: 'absolute',
  top: '40%',
  bottom: '40%',
  width: '7%',
  backgroundColor: COLORS.white,
  animation: `${loadingKeyframes} ${ats}s infinite ${EASINGS.easeInOutSine}`,
})

export const bars = styleVariants(
  Object.assign(m.forLoopClasses('facade', 6), m.forLoopClasses('back', 6)),
  (value: number, key: string) => {
    return key.includes('facade')
      ? [
          defaultBars,
          {
            left: `${value * 18.6}%`,
            animationDelay: `${value * 0.1}s`,
          },
        ]
      : [
          defaultBars,
          {
            backgroundColor: m.hexToRgba(COLORS.white, 0.4),
            left: `${value * 18.6}%`,
            animationDelay: `${value * 0.1 + ats / 3}s`,
          },
        ]
  },
)
