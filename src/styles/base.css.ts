// packages
import { globalStyle } from '@vanilla-extract/css'

// styles
import '@/styles/layers.css'
import { mixins as m } from '@/styles/mixins'
import { COLORS } from '@/styles/themes'

globalStyle('body', {
  '@layer': {
    base: {
      fontFamily: 'Noto Sans JP, sans-serif',
      fontSize: m.mdv(16),
      lineHeight: Math.round((24 / 16) * 10) / 10,
      color: COLORS.text,
    },
  },
})

globalStyle('p:not(:last-of-type)', {
  marginBottom: '1em',
})
