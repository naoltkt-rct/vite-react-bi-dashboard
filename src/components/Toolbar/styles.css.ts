// packages
import { style, styleVariants } from '@vanilla-extract/css'

// styles
import { mixins as m } from '@/styles/mixins'
import { COLORS, EASINGS } from '@/styles/themes'

export const toolbar = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  columnGap: '1em',
  paddingBlock: '1em',
})

export const defaultToolbarContent = style({
  display: 'inline-flex',
  alignItems: 'center',
})

export const toolbarContent = styleVariants({
  controller: [
    defaultToolbarContent,
    {
      columnGap: '1em',
    },
  ],
  pagination: [
    defaultToolbarContent,
    {
      columnGap: '0.5em',
    },
  ],
})

export const defaultToolbarButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  columnGap: '0.5em',
  backgroundColor: 'transparent',
  border: `${m.mdv(2)} solid ${COLORS.border}`,
  borderRadius: 9999,
  padding: '0.25em 1em 0.25em 0.5em',
  transition: `color 0.3s ${EASINGS.easeInOutSine}, background 0.3s ${EASINGS.easeInOutSine}`,
  selectors: {
    '&:hover': {
      color: COLORS.white,
      backgroundColor: COLORS.border,
    },
  },
})

export const toolbarButton = styleVariants({
  default: [defaultToolbarButton],
  edit: [
    defaultToolbarButton,
    {
      color: COLORS.primary,
      borderColor: COLORS.primary,
      selectors: {
        '&:hover': {
          backgroundColor: COLORS.primary,
        },
      },
    },
  ],
  delete: [
    defaultToolbarButton,
    {
      color: COLORS.error,
      borderColor: COLORS.error,
      selectors: {
        '&:hover': {
          backgroundColor: COLORS.error,
        },
      },
    },
  ],
})

export const defaultToolbarIcon = style({
  width: m.mdv(24),
  height: m.mdv(24),
  transition: `filter 0.3s ${EASINGS.easeInOutSine}`,
  selectors: {
    [`${defaultToolbarButton}:hover &`]: {
      filter: 'brightness(0) invert(1)',
    },
  },
})

export const toolbarIcon = styleVariants({
  default: [defaultToolbarIcon],
  edit: [
    defaultToolbarIcon,
    {
      filter:
        'brightness(0) saturate(100%) invert(38%) sepia(10%) saturate(336%) hue-rotate(151deg) brightness(93%) contrast(85%)',
    },
  ],
  delete: [
    defaultToolbarIcon,
    {
      filter:
        'brightness(0) saturate(100%) invert(15%) sepia(46%) saturate(4356%) hue-rotate(345deg) brightness(131%) contrast(121%)',
    },
  ],
})

export const pagination = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '2em',
  height: '2em',
  selectors: {
    '&:disabled': {
      opacity: 0.25,
      pointerEvents: 'none',
    },
  },
})

export const paginationButton = style({
  display: 'block',
  padding: '0.5em 1em',
  transition: `opacity 0.3s ${EASINGS.easeInOutSine}`,
  selectors: {
    '&:hover': {
      opacity: 0.75,
    },
    '&:disabled': {
      opacity: 0.25,
    },
  },
})

export const defaultPaginationArrow = style({
  width: '100%',
  height: '100%',
  transition: `transform 0.3s ${EASINGS.easeInOutSine}`,
})

export const paginationArrow = styleVariants({
  previous: [
    defaultPaginationArrow,
    {
      transform: 'rotate(180deg)',
      selectors: {
        '&:hover': {
          transform: 'rotate(180deg) translateX(0.125em)',
        },
      },
    },
  ],
  next: [
    defaultPaginationArrow,
    {
      selectors: {
        '&:hover': {
          transform: 'translateX(0.125em)',
        },
      },
    },
  ],
})
