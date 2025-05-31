// packages
import { createVar, style } from '@vanilla-extract/css'

// styles
import { COLORS } from '@/styles/themes'

// createVar
export const labelSize = createVar()

export const container = style({
  display: 'flex',
  alignItems: 'center',
})

export const label = style({
  minWidth: labelSize,
  flexShrink: 0,
})

export const requiredIcon = style({
  color: COLORS.required,
})
