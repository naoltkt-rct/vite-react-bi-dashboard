// packages
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

// constants
import { API_URL, APP_URL } from '@/constants'

// hooks
import { useCustomContext } from '@/components/ContextProvider/hooks'

export function useUsersDetail(id?: string | undefined) {
  // hooks
  const { setIsLoading } = useCustomContext()

  // react-router-dom
  const navigate = useNavigate()

  // useState
  // 案件情報
  const [users, setUsers] = useState<any | null>(null)
  // 削除モーダル
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(isModalOpen)

  // useForm
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { isDirty, isSubmitting, isValid, errors },
  } = useForm({
    mode: !id ? 'onSubmit' : 'onChange',
    // バリデーションの実行タイミングは submit 実行時のみ
    // @see https://react-hook-form.com/docs/useform#reValidateMode
    reValidateMode: !id ? 'onChange' : 'onSubmit',
    // 全てのエラーを取得
    // @see https://react-hook-form.com/docs/useform#criteriaMode
    criteriaMode: 'all',
    // フォームの初期値
    defaultValues: {
      id: '',
      username: '',
      gender: '',
      age: '',
      department: '',
      job: '',
      startDate: '',
      endDate: null,
      remarks: '',
    },
  })

  // users/edit の場合、初期値を設定
  useEffect(() => {
    if (id) getUser(id)
  }, [id])
  useEffect(() => {
    if (users) {
      reset({
        id: users.id ?? '',
        username: users.username ?? '',
        gender: users.gender ?? '',
        age: users.age ?? '',
        department: users.department ?? '',
        job: users.job ?? '',
        startDate: users.startDate ?? '',
        endDate: users.endDate ?? null,
        remarks: users.remarks ?? '',
      })
    }
  }, [reset, users])

  async function getUser(id: string) {
    try {
      // ローディング開始
      setIsLoading(true)
      // ユーザー情報を取得
      const response = await fetch(API_URL.USER.GET(id))
      if (!response.ok)
        throw new Error(`Failed to fetch data: ${response.status}`)
      const data = await response.json()
      // ユーザー情報を更新
      setUsers(data)
    } catch (error) {
      console.error('Failed to fetch data', error)
    } finally {
      // ローディング終了
      setIsLoading(false)
    }
  }

  const onSubmit: SubmitHandler<any> = async (data) => {
    // 日付のフォーマット
    data.startDate = format(data.startDate, 'yyyy-MM-dd')
    if (data.endDate) {
      data.endDate = format(data.endDate, 'yyyy-MM-dd')
    } else {
      delete data.endDate
    }
    // 空文字の場合は削除
    if (!data.remarks) delete data.remarks

    // 登録 または 更新
    try {
      // ローディング開始
      setIsLoading(true)
      // 登録時は POST, 更新時は PUT で送る
      const response = await fetch(
        `${!id ? API_URL.USER.POST : API_URL.USER.PUT}`,
        {
          method: !id ? 'POST' : 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      )
      if (!response.ok)
        throw new Error(`Failed to post data: ${response.status}`)
      //
      const result = await response.json()

      // 初回登録時のみ、編集ページに遷移
      if (!id && result.id) navigate(`/users/edit/${result.id}`)
    } catch (error) {
      console.error('Failed to post data', error)
    } finally {
      // ローディング終了
      setIsLoading(false)
    }
  }

  // 選択した項目を削除
  async function handleUsersDelete(
    event: React.MouseEvent<HTMLButtonElement>,
  ): Promise<void> {
    // ボタンを無効化
    ;(event.currentTarget as HTMLButtonElement).disabled = true
    try {
      // // ローディング開始
      setIsLoading(true)
      // データ削除
      const response = await fetch(`${API_URL.USER.DELETE}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: [id] }),
      })
      if (!response.ok)
        throw new Error(`Failed to delete data: ${response.status}`)
    } catch (error) {
      console.error('Failed to delete data', error)
    } finally {
      // ローディング終了
      setIsLoading(false)
    }
    // 削除モーダルを閉じる
    setIsModalVisible(false)
    // 削除後、一覧ページに遷移
    await navigate(APP_URL.USERS.path as string)
  }

  return {
    register,
    control,
    handleSubmit,
    onSubmit,
    isDirty,
    isSubmitting,
    isValid,
    errors,
    isModalOpen,
    setIsModalOpen,
    isModalVisible,
    setIsModalVisible,
    handleUsersDelete,
  }
}
