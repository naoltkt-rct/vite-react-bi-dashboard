// packages
import { assignInlineVars } from '@vanilla-extract/dynamic'
import { Fragment } from 'react'

// hooks
import { useTable } from '@/components/Table/hooks'

// components
import { Checkbox } from '@/components/Checkbox'

// styles
import {
  body,
  bodyHeight,
  caution,
  cautionButton,
  content,
  contentWidth,
  table,
  tr,
} from '@/components/Table/styles.css'
import { CONTAINER_WIDTH } from '@/styles/themes'

// types
import type { Thead } from '@/types/table'
type Props = {
  thead: Thead[]
  tbody: React.ReactNode
  label?: string
  length?: number
  per?: number
  total?: number
  checkedAll?: () => void
  checkedValues?: string[]
  setCheckedValues?: React.Dispatch<React.SetStateAction<string[]>>
  // checkbox を表示する場合
  useCheckedAll?: boolean
  checked?: boolean
  checkedIcon?: 'check' | 'minus'
  checkedOnChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Table({
  thead,
  tbody,
  label,
  length,
  per,
  total,
  checkedAll,
  checkedValues,
  setCheckedValues,
  useCheckedAll,
  checked,
  checkedIcon,
  checkedOnChange,
}: Props) {
  const { offsetHeight, dvh, scrolled } = useTable(tbody)
  // size が設定されている要素の合計値を取得
  const sums = thead.reduce((sum, item) => sum + (item.size ?? 0), 0)
  return (
    <div className={table}>
      <div className={tr[scrolled ? 'scrolled' : 'thead']}>
        {thead.map((item, index) => (
          <Fragment key={item.key}>
            {/* checkbox を表示する場合 */}
            {index === 0 && useCheckedAll && (
              <div className={content['checkbox']}>
                <Checkbox
                  values={item.key}
                  checked={checked}
                  icon={checkedIcon}
                  onChange={checkedOnChange}
                />
              </div>
            )}
            {/* 見出し行を出力 */}
            <div
              key={item.key}
              className={content['th']}
              style={assignInlineVars({
                [contentWidth]: item.size
                  ? `${(item.size / CONTAINER_WIDTH.default) * 100}%`
                  : `${((CONTAINER_WIDTH.default - sums) / CONTAINER_WIDTH.default) * 100}%`,
              })}
            >
              {item.value}
            </div>
          </Fragment>
        ))}
      </div>
      <div
        ref={dvh}
        className={body}
        style={assignInlineVars({
          [bodyHeight]: offsetHeight ? `calc(${offsetHeight}px - 1em)` : 'auto',
        })}
      >
        {checked && (
          <>
            {(checkedValues?.length === length ||
              checkedValues?.length === per ||
              checkedValues?.length === total) && (
              <div className={caution}>
                {checkedValues?.length === total && setCheckedValues ? (
                  <>
                    {total} 件すべてが選択されています。
                    <button
                      type="button"
                      onClick={(event) => {
                        event.preventDefault()
                        setCheckedValues([])
                      }}
                      className={cautionButton}
                    >
                      選択解除
                    </button>
                  </>
                ) : (
                  <>
                    このページ内の {length} 件すべてが選択されています。
                    <button
                      type="button"
                      onClick={checkedAll}
                      className={cautionButton}
                    >
                      {label} の {total} 件をすべて選択
                    </button>
                  </>
                )}
              </div>
            )}
          </>
        )}
        {/* 本文を出力 */}
        {tbody}
      </div>
    </div>
  )
}
