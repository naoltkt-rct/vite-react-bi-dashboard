// packages
import { style, styleVariants } from '@vanilla-extract/css'

// styles
import { mixins as m } from '@/styles/mixins'
import { BUTTON, COLORS, EASINGS } from '@/styles/themes'

export const defaultWrapper = style({
  display: 'flex',
  minHeight: `calc(100dvh - ${m.mdv(BUTTON.pc.size * 1.5)})`,
  backgroundColor: COLORS.background,
})

export const wrapper = styleVariants({
  open: [defaultWrapper],
  close: [defaultWrapper],
})

export const main = style({
  paddingInline: '1em',
  transition: `width 0.3s ${EASINGS.easeInOutSine}`,
  overflow: 'hidden',
  selectors: {
    [`${wrapper.open} &`]: {
      width: `calc(100% - ${m.mdv(BUTTON.pc.size * 5)})`,
    },
    [`${wrapper.close} &`]: {
      width: `calc(100% - ${m.mdv(BUTTON.pc.size * 1.5)})`,
    },
  },
})
