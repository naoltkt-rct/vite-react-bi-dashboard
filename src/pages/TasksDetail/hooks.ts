// packages
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

// constants
import { API_URL, APP_URL } from '@/constants'

// hooks
import { useCustomContext } from '@/components/ContextProvider/hooks'

// types
import type { TaskAssignment, TaskItems } from '@/types/task'
import type { RequestPostUserAssignments } from '@/types/user'

export function useTasksDetail(id?: string | undefined) {
  // hooks
  const { setIsLoading } = useCustomContext()

  // react-router-dom
  const navigate = useNavigate()

  // useState
  // 案件情報
  const [tasks, setTasks] = useState<TaskItems | null>(null)
  // 子課題
  const [assignmentUsers, setAssignmentUsers] = useState<{
    [key: string]: {
      id: string
      username: string
      job: string
    }[]
  } | null>(null)

  // 削除モーダル
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(isModalOpen)

  // useForm
  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { isDirty, isSubmitting, isValid, errors },
  } = useForm({
    mode: !id ? 'onSubmit' : 'onChange',
    // バリデーションの実行タイミングを id の有無で変更
    // @see https://react-hook-form.com/docs/useform#reValidateMode
    reValidateMode: !id ? 'onChange' : 'onSubmit',
    // 全てのエラーを取得
    // @see https://react-hook-form.com/docs/useform#criteriaMode
    criteriaMode: 'all',
    // フォームの初期値
    defaultValues: {
      id: '',
      name: '',
      priority: '',
      status: '',
      startDate: '',
      endDate: '',
      companyName: '',
      clientName: '',
      remarks: '',
      assignments: [] as TaskAssignment[],
    },
  })

  const { fields, append, remove } = useFieldArray({
    name: 'assignments',
    control,
  })
  const observeAssignments = watch('assignments')

  // useEffect
  useEffect(() => {
    // tasks/edit の場合、初期値を設定
    ;(async () => {
      // ローディング開始
      setIsLoading(true)
      if (id) {
        await getTask(id)
      }
      // tasks/add の場合、最初から子課題の職種を取得
      else {
        await getAssignments([
          {
            assignmentId: '',
            jobType: '',
          },
        ])
      }
      // ローディング終了
      setIsLoading(false)
    })()
  }, [id])

  // tasks/edit の場合、初期値を設定
  useEffect(() => {
    if (tasks) {
      // 子課題がある場合
      ;(async () => {
        // ローディング開始
        setIsLoading(true)
        if (tasks.assignments?.length > 0 && !assignmentUsers)
          await getAssignments(
            tasks.assignments.map((assignment) => {
              return {
                assignmentId: assignment.assignmentId ?? '',
                jobType: assignment.jobType ?? '',
              }
            }),
          )
        // 初期値を設定
        reset({
          id: tasks.id ?? '',
          name: tasks.name ?? '',
          priority: tasks.priority ?? '',
          status: tasks.status ?? '',
          startDate: tasks.startDate ?? null,
          endDate: tasks.endDate ?? null,
          companyName: tasks.companyName ?? '',
          clientName: tasks.clientName ?? '',
          remarks: tasks.remarks ?? '',
          assignments: tasks.assignments ?? [],
        } as TaskItems)
        // ローディング終了
        setIsLoading(false)
      })()
    }
  }, [reset, tasks])

  // 案件情報を取得
  async function getTask(id: string) {
    try {
      // 案件情報を取得
      const response = await fetch(API_URL.TASK.GET(id))
      if (!response.ok)
        throw new Error(`Failed to fetch data: ${response.status}`)
      const data = await response.json()
      // 案件情報を更新
      setTasks(data)
    } catch (error) {
      console.error('Failed to fetch data', error)
    }
  }

  // 子課題情報に紐づくユーザーを取得
  async function getAssignments(assignments: RequestPostUserAssignments[]) {
    try {
      // 子課題情報に紐づくユーザーを取得
      const response = await fetch(API_URL.USER.POST_ASSIGNMENTS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ assignments: assignments }),
      })
      if (!response.ok)
        throw new Error(`Failed to fetch data: ${response.status}`)
      const data = await response.json()
      // 子課題情報に紐づくユーザーを更新
      if (!assignmentUsers) setAssignmentUsers(groupAssignmentsByJobType(data))
    } catch (error) {
      console.error('Failed to fetch data', error)
    }
  }

  // 子課題情報に紐づくユーザーを職種ごとにグループ分けする
  function groupAssignmentsByJobType(assignments: any[]) {
    return assignments.reduce(
      (acc, assignment) => {
        const { job } = assignment
        if (!acc[job]) {
          acc[job] = []
        }
        acc[job].push(assignment)
        return acc
      },
      {} as Record<string, any[]>,
    )
  }

  // 登録または更新
  const onSubmit: SubmitHandler<any> = async (data) => {
    // 日付のフォーマット
    data.startDate = format(data.startDate, 'yyyy-MM-dd')
    data.endDate = format(data.endDate, 'yyyy-MM-dd')
    if (data.assignments.length > 0) {
      data.assignments = data.assignments.map((assignment: TaskAssignment) => ({
        ...assignment,
        startDate: format(assignment.startDate, 'yyyy-MM-dd'),
        endDate: format(assignment.endDate, 'yyyy-MM-dd'),
      }))
    }
    // 空文字の場合は削除
    if (!data.remarks) delete data.remarks

    // 登録 または 更新
    try {
      // ローディング開始
      setIsLoading(true)
      // 登録時は POST, 更新時は PUT で送る
      const response = await fetch(
        `${!id ? API_URL.TASK.POST : API_URL.TASK.PUT}`,
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
      if (!id && result.id) navigate(`/tasks/edit/${result.id}`)
    } catch (error) {
      console.error('Failed to post data', error)
    } finally {
      // ローディング終了
      setIsLoading(false)
    }
  }

  // 子課題の必須項目チェック
  function hasEmptyField() {
    if (!observeAssignments || observeAssignments.length === 0) return false
    return observeAssignments.some((field) => {
      return (
        !field.assignmentName ||
        !field.jobType ||
        !field.startDate ||
        !field.endDate
      )
    })
  }

  // 選択した項目を削除
  async function handleTasksDelete(
    event: React.MouseEvent<HTMLButtonElement>,
  ): Promise<void> {
    // ボタンを無効化
    ;(event.currentTarget as HTMLButtonElement).disabled = true
    try {
      // ローディング開始
      setIsLoading(true)
      // データ削除
      const response = await fetch(`${API_URL.TASK.DELETE}`, {
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
    await navigate(APP_URL.TASKS.path as string)
  }

  // 選択肢を生成
  function generateSelectOptions(
    array: {
      id: string
      username: string
      job: string
    }[],
  ) {
    return array.map((item) => ({
      value: item.id,
      text: item.username,
    }))
  }

  return {
    assignmentUsers,
    register,
    control,
    handleSubmit,
    onSubmit,
    isDirty,
    isSubmitting,
    isValid,
    errors,
    fields,
    append,
    remove,
    observeAssignments,
    hasEmptyField,
    isModalOpen,
    setIsModalOpen,
    isModalVisible,
    setIsModalVisible,
    handleTasksDelete,
    generateSelectOptions,
  }
}
