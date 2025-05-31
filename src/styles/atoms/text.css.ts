// packages
import { style, styleVariants } from '@vanilla-extract/css'

export const defaultEllipsis = style({
  display: 'inline-block',
  verticalAlign: 'baseline',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
})

export const ellipsis = styleVariants({
  default: [
    defaultEllipsis,
    {
      maxWidth: '100%',
    },
  ],
  hasIcon: [
    defaultEllipsis,
    { verticalAlign: 'top', maxWidth: 'calc(100% - 2em)' },
  ],
})
