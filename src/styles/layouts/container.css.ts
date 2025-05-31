// packages
import { style, styleVariants } from '@vanilla-extract/css'

// styles
import { mixins as m } from '@/styles/mixins'
import { CONTAINER_WIDTH, WIDTH_PC } from '@/styles/themes'

export const defaultContainer = style({
  width: m.mdv(WIDTH_PC),
  maxWidth: '100%',
  marginInline: 'auto',
  paddingInline: `${m.mdv((WIDTH_PC - CONTAINER_WIDTH.default) / 2)}`,
})

export const container = styleVariants({
  default: [defaultContainer],
  narrow: [
    defaultContainer,
    {
      width: m.mdv(
        ((WIDTH_PC - CONTAINER_WIDTH.default) as number) +
          CONTAINER_WIDTH.narrow,
      ),
    },
  ],
})
