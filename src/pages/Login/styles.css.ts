// packages
import { style } from '@vanilla-extract/css'

// styles
import { mixins as m } from '@/styles/mixins'
import { COLORS, WIDTH_PC } from '@/styles/themes'

export const wrapper = style({
  alignContent: 'center',
  minHeight: '100dvh',
  paddingBlock: '2em',
})

export const box = style({
  width: m.mdv(WIDTH_PC / 3),
  marginInline: 'auto',
  padding: '2em',
  boxShadow: `0 0.5em 1em 0 ${m.hexToRgba(COLORS.text, 0.1)}`,
})

export const logo = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 100,
  height: 100,
  backgroundColor: COLORS.primary,
  marginBottom: '2em',
  marginInline: 'auto',
})

export const image = style({
  width: 66,
  height: 66,
  filter: 'brightness(0) invert(1)',
})

export const title = style({
  fontSize: m.mdv(24),
  textAlign: 'center',
  marginBottom: '1em',
})

export const content = style({
  marginBlock: '1em',
})

export const entryField = style({
  marginBlock: '1em',
})

export const inputField = style({
  marginBlock: '0.5em',
})
