// packages
import { style, styleVariants } from '@vanilla-extract/css'

// styles
import { mixins as m } from '@/styles/mixins'
import { COLORS } from '@/styles/themes'

export const defaultFileUpload = style({
  display: 'block',
  position: 'relative',
  border: `2px dashed ${COLORS.border}`,
  padding: '1em',
  cursor: 'pointer',
})

export const fileUpload = styleVariants({
  active: [defaultFileUpload, { backgroundColor: '#e6f3ff' }],
  inactive: [
    defaultFileUpload,
    { backgroundColor: '#f9f9f9', borderColor: '#007bff' },
  ],
})

export const hiddenInput = style({
  display: 'block',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  opacity: 0,
  cursor: 'pointer',
})

export const filePreview = style({
  display: 'inline-flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  columnGap: '1em',
})

export const filePreviewFigure = style({
  display: 'block',
  position: 'relative',
  width: m.mdv(200),
  height: m.mdv(200),
})

export const filePreviewContent = style({
  display: 'inline-flex',
  flexDirection: 'column',
  rowGap: '1em',
})

export const fileImage = style({
  display: 'block',
  position: 'absolute',
  width: '100%',
  height: '100%',
  borderRadius: '50%',
  overflow: 'hidden',
  objectFit: 'cover',
})

export const fileNames = style({
  display: 'block',
})
