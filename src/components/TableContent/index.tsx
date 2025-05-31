// packages
import { assignInlineVars } from '@vanilla-extract/dynamic'

// styles
import { content, contentWidth } from '@/components/Table/styles.css'
import { CONTAINER_WIDTH } from '@/styles/themes'

// types
import type { Thead } from '@/types/table'
type Props = {
  thead: Thead[]
  keys: string
  container?: number
  addClassNames?: string
  children: React.ReactNode
}

export default function TableContent({
  thead,
  keys,
  container = CONTAINER_WIDTH.default,
  addClassNames,
  children,
}: Props) {
  return (
    <div
      className={`${content['td']} ${addClassNames ?? ''}`}
      style={assignInlineVars({
        [contentWidth]: thead.filter((item) => item.key === keys)[0].size
          ? `${((thead.filter((item) => item.key === keys)[0].size as number) / container) * 100}%`
          : `${(((container - thead.reduce((sum, item) => sum + (item.size ?? 0), 0)) as number) / container) * 100}%`,
      })}
    >
      {children}
    </div>
  )
}
