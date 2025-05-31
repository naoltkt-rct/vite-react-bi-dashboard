// packages
import { createVar, style } from '@vanilla-extract/css'

// styles
import { COLORS } from '@/styles/themes'

// createVar
export const errorAdjustment = createVar()

export const error = style({
  position: 'relative',
  color: COLORS.error,
  width: errorAdjustment,
  marginBlock: '0.5em',
  marginLeft: 'auto',
  paddingLeft: '1.5em',
})

export const icon = style({
  position: 'absolute',
  top: '0.25em',
  left: '0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '1em',
  height: '1em',
  backgroundColor: COLORS.error,
  borderRadius: '50%',
})

export const image = style({
  filter: 'brightness(0) invert(1)',
})
