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
import UsersDeleteModal from '@/pages/Users/UsersDeleteModal'

// hooks
import { useUsers } from '@/pages/Users/hooks'

// utilities
import { formatGenderJA, formatJobJA } from '@/utilities'

// styles
import { content, empty, tr } from '@/components/Table/styles.css'
import { name, totalOccupancyRateOver } from '@/pages/Users/styles.css'
import { ellipsis } from '@/styles/atoms/text.css'
import { COLORS } from '@/styles/themes'

export default function Users() {
  // hooks
  const {
    users,
    checkedAll,
    checkedValues,
    setCheckedValues,
    pages,
    setPages,
    isModalOpen,
    setIsModalOpen,
    isModalVisible,
    setIsModalVisible,
    setSearchQuery,
    setSearchTotal,
    inputs,
    handleCheckedPageAll,
    handleCheckedContentAll,
    handleCheckedValues,
    handleUsersDelete,
  } = useUsers()

  // 見出し行の設定
  const theads = [
    { key: 'username', value: '名前', size: 200 },
    { key: 'gender', value: '性別', size: 70 },
    { key: 'age', value: '年齢', size: 60 },
    { key: 'department', value: '所属', size: 70 },
    { key: 'job', value: '職種', size: 200 },
    { key: 'startDate', value: '入社日', size: 120 },
    { key: 'endDate', value: '退社日', size: 120 },
    { key: 'totalOccupancyRate', value: '稼働率', size: 120 },
    { key: 'remarks', value: '備考' },
  ]

  // 本文の出力
  function Tbody(items: any[]) {
    return items.length > 0 ? (
      <ul>
        {items.map((user) => (
          <li key={user.id} className={tr['tbody']}>
            {theads.map((thead, index) => (
              <Fragment key={thead.key}>
                {/* checkbox を表示する場合 */}
                {index === 0 && (
                  <span className={content['checkbox']}>
                    <Checkbox
                      values={user.id}
                      checked={checkedValues.includes(user.id) || false}
                      ref={inputs.current[user.id]}
                      onChange={handleCheckedValues}
                    />
                  </span>
                )}
                {/* 本文を出力 */}
                <TableContent thead={theads} keys={thead.key}>
                  {handleValue(thead.key, user[thead.key], user.id)}
                </TableContent>
              </Fragment>
            ))}
          </li>
        ))}
      </ul>
    ) : (
      <span className={empty}>ユーザーが登録されていません</span>
    )
  }

  // 値の整形
  function handleValue(keys: string, values: string, ids?: string) {
    let result: string | JSX.Element = values
    switch (keys) {
      case 'username':
        result = (
          <Link
            to={`/users/edit/${ids}`}
            className={`${name} ${ellipsis['default']}`}
          >
            {values}
          </Link>
        )
        break
      case 'gender':
        result = formatGenderJA(values)
        break
      case 'job':
        result = (
          <span className={ellipsis['default']}>{formatJobJA(values)}</span>
        )
        break
      case 'startDate':
      case 'endDate':
        result = values !== null ? format(values, 'yyyy/MM/dd') : '-'
        break
      case 'totalOccupancyRate':
        result = (
          <>
            <span
              className={Number(values) > 100 ? totalOccupancyRateOver : ''}
            >
              {values}%
            </span>
            {Number(values) > 100 && (
              <Tooltip trigger="!" color={COLORS.error}>
                稼働率が100%を超えています
              </Tooltip>
            )}
          </>
        )
        break
      case 'remarks':
        result = (
          <>
            <span className={ellipsis['hasIcon']}>{values}</span>
            <Tooltip trigger="?" placements="bottom">
              {values}
            </Tooltip>
          </>
        )
        break
      default:
        result = <span className={ellipsis['default']}>{values}</span>
    }
    return result
  }

  return (
    <Layout directory="users">
      {/* 見出し */}
      <Title content="ユーザー一覧" />
      {/* 検索 */}
      <Search
        setSearchQuery={setSearchQuery}
        setSearchTotal={setSearchTotal}
        placeholder="ユーザー名で検索"
      />
      {/* ツールバー */}
      <Toolbar
        link={{
          add: APP_URL.USERS_ADD.path as string,
          edit: '/users/edit',
        }}
        checkedValues={checkedValues}
        setIsModalOpen={setIsModalOpen}
        pages={pages}
        setPages={setPages}
        data={users}
      />
      {/* 表組み */}
      <Table
        thead={theads}
        tbody={Tbody(users.items)}
        label="ユーザー一覧"
        length={users.items.length}
        per={DEFAULT_DATA_LENGTH}
        total={users.total}
        checkedAll={handleCheckedContentAll}
        checkedValues={checkedValues}
        setCheckedValues={setCheckedValues}
        // checkbox を表示する場合
        useCheckedAll={true}
        checked={checkedAll}
        checkedIcon={
          users.items.length === checkedValues.length ||
          users.total === checkedValues.length
            ? 'check'
            : 'minus'
        }
        checkedOnChange={handleCheckedPageAll}
      />
      {/* 削除モーダル */}
      <UsersDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        onSubmit={handleUsersDelete}
      />
    </Layout>
  )
}
