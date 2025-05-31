// packages
import { style } from '@vanilla-extract/css'

// styles
import { toolbarButton, toolbarIcon } from '@/components/Toolbar/styles.css'
import { container } from '@/styles/layouts/container.css'
import { mixins as m } from '@/styles/mixins'
import { COLORS } from '@/styles/themes'

export const formContainer = style([
  container.narrow,
  {
    backgroundColor: COLORS.white,
    borderRadius: '0.5em',
    marginBottom: '1em',
    paddingBlock: '3em',
  },
])

export const formTitle = style([
  container.narrow,
  {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingInline: 0,
  },
])

export const formHeading = style({
  fontSize: m.mdv(24),
  fontWeight: 700,
  paddingBlock: '1em',
})

export const formDeleteButton = style([toolbarButton.delete])

export const formDeleteIcon = style([toolbarIcon.delete])

export const fieldItem = style({
  selectors: {
    '&:not(:first-of-type)': {
      marginBlock: '1.5em',
    },
  },
})

export const fieldArrayWrapper = style({
  width: '100%',
})

export const fieldArrayItem = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  columnGap: '2em',
  borderTop: `2px solid ${m.hexToRgba(COLORS.border, 0.5)}`,
  paddingTop: '1.5em',
  selectors: {
    '&:not(:first-of-type)': {
      marginBlock: '1.5em',
    },
  },
})

export const fieldArrayField = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
})
export const fieldArrayFieldItem = style({
  marginBlock: '0.5em',
})

export const fieldArrayRemove = style({
  flexShrink: 0,
})

export const fieldArrayAppendWrapper = style({
  marginBlock: '1.5em',
})

export const fieldArrayAppend = style({
  marginBlock: '1em',
})

export const fieldArrayAppendCaution = style({
  textAlign: 'center',
  color: COLORS.error,
  paddingTop: '0.5em',
})

export const fieldArrayNoData = style({
  textAlign: 'center',
})
