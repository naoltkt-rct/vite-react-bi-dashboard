// packages
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

// constants
import { API_URL } from '@/constants'

// hooks
import { useCustomContext } from '@/components/ContextProvider/hooks'

// utilities
import { fileToBase64, urlToFile } from '@/utilities/format'

export function useSettings() {
  // hooks
  const { setIsLoading } = useCustomContext()

  // useState
  const [files, setFiles] = useState<File | null>(null)

  // useForm
  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { dirtyFields, isSubmitting, isDirty, isValid, errors },
  } = useForm({
    mode: 'onChange',
    // バリデーションの実行タイミングは onChange 実行時
    // @see https://react-hook-form.com/docs/useform#reValidateMode
    reValidateMode: 'onChange',
    // 全てのエラーを取得
    // @see https://react-hook-form.com/docs/useform#criteriaMode
    criteriaMode: 'all',
    defaultValues: {
      id: '',
      organization: '',
      authority: '',
      username: '',
      email: '',
      avatar: '',
    },
  })

  // ユーザー情報を取得
  useEffect(() => {
    if (sessionStorage.getItem('user')) {
      ;(async () => {
        // ローディング開始
        setIsLoading(true)
        // セッションストレージからユーザー情報を取得
        const users = JSON.parse(sessionStorage.getItem('user') as string)
        // 画像を復元
        let images: File | null = users.avatar
          ? await urlToFile(users.avatar, 'avatar.jpg')
          : null
        setFiles(images)
        // ユーザー情報を更新
        let avatar = images ? await fileToBase64(images as File) : ''
        reset({
          id: users.id ?? '',
          organization: users.organization ?? '',
          authority: users.authority ?? '',
          username: users.username ?? '',
          email: users.email ?? '',
          // input 用に base64 に変換
          avatar: avatar,
        })
        // ローディング終了
        setIsLoading(false)
      })()
    }
  }, [])

  // プロフィール画像の更新
  useEffect(() => {
    handleAvatar()
  }, [files])

  const onSubmit: SubmitHandler<any> = async (data) => {
    // 画像のフォーマット
    if (files) {
      data.avatar = await fileToBase64(files)
    } else {
      delete data.avatar
    }
    // ユーザー情報を更新
    try {
      // ローディング開始
      setIsLoading(true)
      // ユーザー情報を更新
      const response = await fetch(API_URL.USER.PUT_INFO, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (!response.ok)
        throw new Error(`Failed to post data: ${response.status}`)
      // セッションストレージを更新
      sessionStorage.setItem(
        'user',
        JSON.stringify({
          id: data.id,
          username: data.username,
          avatar: data.avatar,
          authority: data.authority,
        }),
      )
    } catch (error) {
      console.error('Failed to post data', error)
    } finally {
      // ローディング終了
      setIsLoading(false)
    }
    // セッションストレージを更新
    await sessionStorage.setItem('user', JSON.stringify(data))
  }

  // プロフィール画像の更新
  async function handleAvatar() {
    // value を更新
    setValue('avatar', files ? ((await fileToBase64(files)) ?? '') : '', {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  return {
    files,
    setFiles,
    register,
    control,
    handleSubmit,
    dirtyFields,
    isSubmitting,
    isDirty,
    isValid,
    errors,
    onSubmit,
  }
}
