// packages
import { format } from 'date-fns'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

// constants
import { APP_URL, DEFAULT_DATA_LENGTH } from '@/constants'

// components
import { Checkbox } from '@/components/Checkbox'
import Layout from '@/components/Layout'
import Search from '@/components/Search'
import Table from '@/components/Table'
import TableContent from '@/components/TableContent'
import Title from '@/components/Title'
import Toolbar from '@/components/Toolbar'
import Tooltip from '@/components/Tooltip'

// pages
import TasksDeleteModal from '@/pages/Tasks/TasksDeleteModal'

// hooks
import { useTasks } from '@/pages/Tasks/hooks'

// utilities
import { formatPriorityJA, formatStatusJA } from '@/utilities'

// styles
import { content, empty, tr } from '@/components/Table/styles.css'
import { name, priority } from '@/pages/Tasks/styles.css'
import { ellipsis } from '@/styles/atoms/text.css'

export default function Tasks() {
  // hooks
  const {
    tasks,
    checkedAll,
    pages,
    setPages,
    checkedValues,
    setCheckedValues,
    inputs,
    isModalOpen,
    setIsModalOpen,
    setSearchQuery,
    setSearchTotal,
    isModalVisible,
    setIsModalVisible,
    handleCheckedPageAll,
    handleCheckedContentAll,
    handleCheckedValues,
    handleTasksDelete,
  } = useTasks()

  // 見出し行の設定
  const theads = [
    { key: 'name', value: '案件名', size: 240 },
    { key: 'priority', value: '優先度', size: 80 },
    { key: 'status', value: '状態', size: 100 },
    { key: 'startDate', value: '開始日', size: 120 },
    { key: 'endDate', value: '期限日', size: 120 },
    { key: 'companyName', value: '依頼元（会社）', size: 160 },
    { key: 'clientName', value: '依頼元（名前）', size: 140 },
    { key: 'remarks', value: '備考' },
  ]

  // 本文の出力
  function Tbody(items: any[]) {
    return items.length > 0 ? (
      <ul>
        {items.map((task) => (
          <li key={task.id} className={tr['tbody']}>
            {theads.map((thead, index) => (
              <Fragment key={thead.key}>
                {/* checkbox を表示する場合 */}
                {index === 0 && (
                  <div className={content['checkbox']}>
                    <Checkbox
                      values={task.id}
                      checked={checkedValues.includes(task.id) || false}
                      ref={inputs.current[task.id]}
                      onChange={handleCheckedValues}
                    />
                  </div>
                )}
                {/* 本文を出力 */}
                <TableContent thead={theads} keys={thead.key}>
                  {handleValue(thead.key, task[thead.key], task.id)}
                </TableContent>
              </Fragment>
            ))}
          </li>
        ))}
      </ul>
    ) : (
      <span className={empty}>案件が登録されていません</span>
    )
  }

  // 値の整形
  function handleValue(keys: string, values: string, ids?: string) {
    let result: string | JSX.Element = values
    switch (keys) {
      case 'name':
        result = (
          <Link
            to={`/tasks/edit/${ids}`}
            className={`${name} ${ellipsis['default']}`}
          >
            {values}
          </Link>
        )
        break
      case 'priority':
        result = (
          <>
            <span className={priority}>{formatPriorityJA(values)}</span>
            <Tooltip trigger="?">
              優先度は{formatPriorityJA(values)}です。
            </Tooltip>
          </>
        )
        break
      case 'status':
        result = formatStatusJA(values)
        break
      case 'startDate':
      case 'endDate':
        result = format(values, 'yyyy/MM/dd')
        break
      case 'remarks':
        result = (
          <>
            <span className={ellipsis['hasIcon']}>{values}</span>
            <Tooltip trigger="?">{values}</Tooltip>
          </>
        )
        break
      default:
        result = <span className={ellipsis['default']}>{values}</span>
    }
    return result
  }

  return (
    <Layout directory="tasks">
      {/* 見出し */}
      <Title content="案件一覧" />
      {/* 検索 */}
      <Search
        setSearchQuery={setSearchQuery}
        setSearchTotal={setSearchTotal}
        placeholder="案件名で検索"
      />
      {/* ツールバー */}
      <Toolbar
        link={{
          add: APP_URL.TASKS_ADD.path as string,
          edit: '/tasks/edit',
        }}
        checkedValues={checkedValues}
        setIsModalOpen={setIsModalOpen}
        pages={pages}
        setPages={setPages}
        data={tasks}
      />
      {/* 表組み */}
      <Table
        thead={theads}
        tbody={Tbody(tasks.items)}
        label="案件一覧"
        length={tasks.items.length}
        per={DEFAULT_DATA_LENGTH}
        total={tasks.total}
        checkedAll={handleCheckedContentAll}
        checkedValues={checkedValues}
        setCheckedValues={setCheckedValues}
        // checkbox を表示する場合
        useCheckedAll={true}
        checked={checkedAll}
        checkedIcon={
          tasks.items.length === checkedValues.length ||
          tasks.total === checkedValues.length
            ? 'check'
            : 'minus'
        }
        checkedOnChange={handleCheckedPageAll}
      />
      {/* 削除モーダル */}
      <TasksDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        onSubmit={handleTasksDelete}
      />
    </Layout>
  )
}
