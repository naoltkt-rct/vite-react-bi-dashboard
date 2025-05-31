// packages
import { format } from 'date-fns'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

// constants
import { APP_URL, TASK_STATUS } from '@/constants'

// components
import Accordion from '@/components/Accordion'
import Layout from '@/components/Layout'
import TableContent from '@/components/TableContent'
import Title from '@/components/Title'

// hooks
import useHome from '@/pages/Home/hooks'

// utilities
import { formatPriorityJA, formatStatusJA } from '@/utilities'

// styles
import { button } from '@/components/Button/styles.css'
import {
  box,
  boxThead,
  content,
  heading,
  items,
  link,
  overCapacityText,
  userItems,
  wrapper,
} from '@/pages/Home/styles.css'
import { ellipsis } from '@/styles/atoms/text.css'
import { CONTAINER_WIDTH } from '@/styles/themes'

// types
import { TaskAssignment } from '@/types/task'

export default function Home() {
  // hooks
  const { owns, tasks } = useHome()

  // 見出し行の設定
  const theads = [
    { key: 'parentAssignmentName', value: '親課題' },
    { key: 'assignmentName', value: '件名', size: 150 },
    { key: 'parentAssignmentPriority', value: '優先度', size: 80 },
    { key: 'status', value: '状態', size: 80 },
    { key: 'endDate', value: '期限日', size: 120 },
  ]

  // 値の整形
  function handleValue(keys: string, values: string, ids?: string) {
    let result: string | JSX.Element = values
    switch (keys) {
      case 'parentAssignmentName':
        result = (
          <Link to={`/tasks/edit/${ids}`} className={ellipsis['default']}>
            {values}
          </Link>
        )

        break
      case 'parentAssignmentPriority':
        result = formatPriorityJA(values)
        break
      case 'status':
        result = formatStatusJA(values || '')
        break
      case 'endDate':
        result = format(values, 'yyyy/MM/dd')
        break
      default:
        result = values
    }
    return result
  }

  function generateOwnTaskCount(data: TaskAssignment[]) {
    const counter = getOwnTaskCount(data)
    return (
      <p>
        担当({data.length}件)
        <br />
        うち、
        {TASK_STATUS.filter((status) => counter[status] > 0)
          .map((status) => `${formatStatusJA(status)}：${counter[status]}件`)
          .join('、')}
      </p>
    )
  }

  function getOwnTaskCount(data: TaskAssignment[]) {
    return data.reduce(
      (accumulator, assignment) => {
        accumulator[assignment.status] =
          (accumulator[assignment.status] || 0) + 1
        return accumulator
      },
      {} as Record<string, number>,
    )
  }

  return (
    <Layout directory="home">
      <Title content={owns.organization} align="center" />
      <div className={wrapper}>
        <div className={box}>
          <h2 className={heading}>私が担当</h2>
          {tasks?.length > 0 &&
          tasks.filter((task) => task.id === owns.id).length > 0 ? (
            <>
              {generateOwnTaskCount(
                tasks.filter((task) => task.id === owns.id)[0].assignments,
              )}
              {/* 見出し行を出力*/}
              <div className={boxThead}>
                {theads.map((thead) => (
                  <Fragment key={thead.key}>
                    <TableContent
                      thead={theads}
                      keys={thead.key}
                      container={((CONTAINER_WIDTH.default / 2) as number) - 32}
                      addClassNames={content['th']}
                    >
                      {thead.value}
                    </TableContent>
                  </Fragment>
                ))}
              </div>
              {/* 本文を出力*/}
              {(
                tasks.filter((task) => task.id === owns.id)[0]
                  .assignments as TaskAssignment[]
              )?.map((assignment: TaskAssignment, index: number) => (
                <div key={`${assignment.id}-${index}`} className={items['own']}>
                  {theads.map((thead) => (
                    <Fragment key={thead.key}>
                      <TableContent
                        thead={theads}
                        keys={thead.key}
                        container={
                          ((CONTAINER_WIDTH.default / 2) as number) - 32
                        }
                        addClassNames={content['own']}
                      >
                        {handleValue(
                          thead.key,
                          assignment[
                            thead.key as keyof TaskAssignment
                          ] as string,
                          assignment.id,
                        )}
                      </TableContent>
                    </Fragment>
                  ))}
                </div>
              ))}
            </>
          ) : (
            <p>担当は割り当てられていません</p>
          )}
          <Link
            to={APP_URL.TASKS.path as string}
            className={`${button({ type: 'rounded' })} ${link}`}
          >
            案件一覧
          </Link>
        </div>
        <div className={box}>
          <h2 className={heading}>業務過多のユーザー</h2>
          {tasks?.length > 0 &&
          tasks.filter((task) => task.id !== owns.id).length > 0 ? (
            <>
              <p className={overCapacityText}>
                以下のユーザーに業務が偏っています。
                <br />
                至急業務調整をおこなってください。
              </p>
              {tasks
                .filter((task) => task.id !== owns.id)
                .map((task) => (
                  <div key={task.id} className={userItems}>
                    <Accordion trigger={task.username}>
                      {/* 見出し行を出力*/}
                      <div className={boxThead}>
                        {theads.map((thead) => (
                          <Fragment key={thead.key}>
                            <TableContent
                              thead={theads}
                              keys={thead.key}
                              container={
                                ((CONTAINER_WIDTH.default / 2) as number) - 32
                              }
                              addClassNames={content['th']}
                            >
                              {thead.value}
                            </TableContent>
                          </Fragment>
                        ))}
                      </div>
                      {/* 本文を出力*/}
                      {task.assignments.map(
                        (assignment: TaskAssignment, index: number) => (
                          <div
                            key={`${assignment.id}-${index}`}
                            className={items['over_capacity']}
                          >
                            {theads.map((thead) => (
                              <Fragment key={thead.key}>
                                <TableContent
                                  thead={theads}
                                  keys={thead.key}
                                  container={
                                    ((CONTAINER_WIDTH.default / 2) as number) -
                                    32
                                  }
                                  addClassNames={content['over_capacity']}
                                >
                                  {handleValue(
                                    thead.key,
                                    assignment[
                                      thead.key as keyof TaskAssignment
                                    ] as string,
                                    assignment.id,
                                  )}
                                </TableContent>
                              </Fragment>
                            ))}
                          </div>
                        ),
                      )}
                    </Accordion>
                  </div>
                ))}
            </>
          ) : (
            <p>業務過多のユーザーはいません</p>
          )}
          <Link
            to={APP_URL.USERS.path as string}
            className={`${button({ type: 'rounded' })} ${link}`}
          >
            ユーザー一覧
          </Link>
        </div>
      </div>
    </Layout>
  )
}
