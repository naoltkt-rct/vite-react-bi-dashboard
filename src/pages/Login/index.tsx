// constants
import { VALIDATION } from '@/constants'

// components
import Button from '@/components/Button'
import Input from '@/components/Input'

// hooks
import { useLogin } from '@/pages/Login/hooks'

// mocks
import { DUMMY_PASSWORD, DUMMY_USERNAME } from '@/mocks/utilities'

import ErrorMessage from '@/components/ErrorMessage'
// styles
import {
  box,
  content,
  entryField,
  image,
  inputField,
  logo,
  title,
  wrapper,
} from '@/pages/Login/styles.css'

export default function Login() {
  // hooks
  const {
    errorMessage,
    register,
    handleSubmit,
    isSubmitting,
    errors,
    onSubmit,
  } = useLogin()

  return (
    <div className={wrapper}>
      <div className={box}>
        <figure className={logo}>
          <img src="/icons/logo.svg" alt="LOGO" className={image} />
        </figure>
        <h1 className={title}>ログイン</h1>
        <div className={content}>
          <p>
            Vite + React + TypeScript + Vanilla Extract
            を用いた練習用アプリケーションです。
            <br />
            下記の入力値でログインできます。
          </p>
          <p>
            ユーザー名：{DUMMY_USERNAME}
            <br />
            パスワード：{DUMMY_PASSWORD}
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={entryField}>
            {/* username */}
            <div className={inputField}>
              <Input
                type="text"
                id="username"
                placeholder="ユーザー名を入力してください"
                {...register('username', {
                  required: VALIDATION.REQUIRED,
                  pattern: VALIDATION.HALF_WIDTH_ALPHANUMERIC,
                })}
                error={Object.keys(errors?.username ?? {}).length > 0}
              />
              {errors.username?.types && (
                <>
                  {errors.username.types.required && (
                    <ErrorMessage
                      message={errors.username.types.required as string}
                    />
                  )}
                  {errors.username.types.pattern && (
                    <ErrorMessage
                      message={errors.username.types.pattern as string}
                    />
                  )}
                </>
              )}
            </div>
            {/* password */}
            <div className={inputField}>
              <Input
                type="password"
                id="password"
                placeholder="パスワードを入力してください"
                {...register('password', {
                  required: VALIDATION.REQUIRED,
                  pattern: VALIDATION.PASSWORD,
                })}
                error={Object.keys(errors?.password ?? {}).length > 0}
              />
              {errors.password?.types && (
                <>
                  {errors.password.types.required && (
                    <ErrorMessage
                      message={errors.password.types.required as string}
                    />
                  )}
                  {errors.password.types.pattern && (
                    <ErrorMessage
                      message={errors.password.types.pattern as string}
                    />
                  )}
                </>
              )}
            </div>
          </div>
          {/* 送信中の場合は非活性とする */}
          <Button type="submit" disabled={isSubmitting}>
            ログイン
          </Button>
          {/* 200以外の場合は表示 */}
          {errorMessage && <ErrorMessage message={errorMessage} />}
        </form>
      </div>
    </div>
  )
}
