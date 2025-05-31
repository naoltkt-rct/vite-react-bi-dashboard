// packages
import { recipe } from '@vanilla-extract/recipes'

// styles
import { container } from '@/styles/layouts/container.css'
import { mixins as m } from '@/styles/mixins'

export const title = recipe({
  base: {
    display: 'block',
    fontSize: m.mdv(24),
    fontWeight: 700,
    paddingInline: 0,
    paddingBlock: '1em',
  },
  variants: {
    type: {
      default: {},
      narrow: [container.narrow],
    },
    align: {
      left: {
        textAlign: 'left',
      },
      center: {
        textAlign: 'center',
      },
      right: {
        textAlign: 'right',
      },
    },
  },
})
