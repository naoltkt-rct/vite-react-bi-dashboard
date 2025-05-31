// packages
import { Link } from 'react-router-dom'

// components
import Popover from '@/components/Popover'

// constants
import { DEFAULT_DATA_LENGTH } from '@/constants'

// styles
import {
  pagination,
  paginationArrow,
  paginationButton,
  toolbar,
  toolbarButton,
  toolbarContent,
  toolbarIcon,
} from '@/components/Toolbar/styles.css'

// types
type Props = {
  link: {
    add: string
    edit: string
  }
  checkedValues: string[]
  setIsModalOpen: (open: boolean) => void
  pages: number
  setPages: (pages: number) => void
  data: {
    total: number
    items: any[]
  }
}

export default function Toolbar({
  link,
  checkedValues,
  setIsModalOpen,
  pages,
  setPages,
  data,
}: Props) {
  // 表示中の最終番号
  const lastNumber =
    (pages > 0 ? pages * DEFAULT_DATA_LENGTH + 1 : pages + 1) +
    DEFAULT_DATA_LENGTH -
    1
  return (
    <div className={toolbar}>
      <div className={toolbarContent['controller']}>
        <Link to={link.add} className={toolbarButton['default']}>
          <img src="/icons/add.svg" alt="" className={toolbarIcon['default']} />
          新規
        </Link>
        {/* 編集 および 削除 */}
        {checkedValues.length > 0 && (
          <>
            {checkedValues.length === 1 && (
              <Link
                to={`${link.edit}/${checkedValues[0]}`}
                className={toolbarButton['edit']}
              >
                <img
                  src="/icons/edit.svg"
                  alt=""
                  className={toolbarIcon['edit']}
                />
                編集
              </Link>
            )}
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                setIsModalOpen(true)
              }}
              className={toolbarButton['delete']}
            >
              <img
                src="/icons/delete.svg"
                alt=""
                className={toolbarIcon['delete']}
              />
              {checkedValues.length > 1 && <>{checkedValues.length}件</>}
              削除
            </button>
          </>
        )}
      </div>
      <div className={toolbarContent['pagination']}>
        <Popover
          trigger={
            <>
              <span>
                {pages > 0 ? pages * DEFAULT_DATA_LENGTH + 1 : pages + 1}
              </span>
              -<span>{data.total > lastNumber ? lastNumber : data.total}</span>/
              <span>{data.total}</span>件
            </>
          }
          type="text"
          disabled={data.total === 0}
        >
          <button
            type="button"
            disabled={pages === 0}
            onClick={() => setPages(0)}
            className={paginationButton}
          >
            最初
          </button>
          <button
            type="button"
            onClick={() =>
              setPages(Math.ceil(data.total / DEFAULT_DATA_LENGTH) - 1)
            }
            disabled={pages === Math.ceil(data.total / DEFAULT_DATA_LENGTH) - 1}
            className={paginationButton}
          >
            最後
          </button>
        </Popover>

        <button
          type="button"
          disabled={pages === 0 || data.total === 0}
          onClick={() => setPages(pages - 1)}
          className={pagination}
        >
          <img
            src="/icons/arrow.svg"
            alt=""
            className={paginationArrow['previous']}
          />
        </button>
        <button
          type="button"
          disabled={
            pages === Math.ceil(data.total / DEFAULT_DATA_LENGTH) - 1 ||
            data.total === 0
          }
          onClick={() => setPages(pages + 1)}
          className={pagination}
        >
          <img
            src="/icons/arrow.svg"
            alt=""
            className={paginationArrow['next']}
          />
        </button>
      </div>
    </div>
  )
}
