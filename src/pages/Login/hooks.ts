// packages
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

// constants
import { API_URL, APP_URL } from '@/constants'

// hooks
import { useCustomContext } from '@/components/ContextProvider/hooks'

// types
import type { RequestPostLogin } from '@/types/user/login'

export function useLogin() {
  // hooks
  const { setIsLoading } = useCustomContext()

  // react-router-dom
  const navigate = useNavigate()

  // useState
  const [errorMessage, setErrorMessage] = useState<string>('')

  // useForm
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<RequestPostLogin>({
    // フォームの初期値
    defaultValues: { username: '', password: '' },
    // バリデーションの実行タイミングは submit 実行時のみ
    // @see https://react-hook-form.com/docs/useform#reValidateMode
    reValidateMode: 'onSubmit',
    // 全てのエラーを取得
    // @see https://react-hook-form.com/docs/useform#criteriaMode
    criteriaMode: 'all',
  })

  //
  const onSubmit: SubmitHandler<RequestPostLogin> = async (data) => {
    try {
      // ローディング開始
      setIsLoading(true)
      // データ取得
      const response = await fetch(API_URL.USER.POST_LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      //
      const result = await response.json()
      //
      !response.ok
        ? setErrorMessage(result.message)
        : navigate(APP_URL.HOME.path as string)
    } catch (error) {
      setErrorMessage('An error occurred while logging in')
    } finally {
      // ローディング終了
      setIsLoading(false)
    }
  }
  return {
    errorMessage,
    register,
    handleSubmit,
    isSubmitting,
    errors,
    onSubmit,
  }
}
