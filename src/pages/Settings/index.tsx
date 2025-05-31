// constants
import { VALIDATION } from '@/constants'

// components
import Button from '@/components/Button'
import ImageUpload from '@/components/ImageUpload'
import Input from '@/components/Input'
import Layout from '@/components/Layout'
import Select from '@/components/Select'

// hooks
import { useSettings } from '@/pages/Settings/hooks'

// styles
import ErrorMessage from '@/components/ErrorMessage'
import Title from '@/components/Title'
import { fieldItem, formContainer } from '@/styles/layouts/form.css'

export default function Settings() {
  const {
    files,
    setFiles,
    register,
    control,
    handleSubmit,
    dirtyFields,
    isSubmitting,
    // isDirty,
    isValid,
    errors,
    onSubmit,
  } = useSettings()

  return (
    <Layout directory="settings">
      <Title content="個人設定" variant="narrow" />
      <form className={formContainer} onSubmit={handleSubmit(onSubmit)}>
        {/* 組織名 */}
        <div className={fieldItem}>
          <Input
            labels={{ text: '組織名', size: 10 }}
            type="text"
            id="organization"
            placeholder="組織名を入力してください"
            required={true}
            {...register('organization', {
              required: VALIDATION.REQUIRED,
              pattern: VALIDATION.EXCLUDING_EMOJIS,
            })}
            error={Object.keys(errors?.organization ?? {}).length > 0}
          />
          {errors.organization?.types && (
            <>
              {errors.organization.types.required && (
                <ErrorMessage
                  message={errors.organization.types.required as string}
                  adjustment={10}
                />
              )}
              {errors.organization.types.pattern && (
                <ErrorMessage
                  message={errors.organization.types.pattern as string}
                  adjustment={10}
                />
              )}
            </>
          )}
        </div>
        {/* 権限 */}
        <div className={fieldItem}>
          <Select
            labels={{ text: '権限', size: 10 }}
            id="authority"
            options={[
              { value: '', text: '選択してください' },
              { value: 'USER', text: 'ユーザー' },
              { value: 'ADMINISTRATOR', text: '管理者' },
            ]}
            control={control}
            required={true}
            {...register('authority', {
              required: VALIDATION.REQUIRED_SELECT,
            })}
          />
          {errors.authority?.types?.required && (
            <ErrorMessage
              message={errors.authority.types.required as string}
              adjustment={10}
            />
          )}
        </div>
        {/* ユーザー名 */}
        <div className={fieldItem}>
          <Input
            labels={{ text: 'ユーザー名', size: 10 }}
            type="text"
            id="username"
            placeholder="ユーザー名を入力してください"
            required={true}
            {...register('username', {
              required: VALIDATION.REQUIRED,
              pattern: VALIDATION.EXCLUDING_EMOJIS,
            })}
            error={Object.keys(errors?.username ?? {}).length > 0}
          />
          {errors.username?.types && (
            <>
              {errors.username.types.required && (
                <ErrorMessage
                  message={errors.username.types.required as string}
                  adjustment={10}
                />
              )}
              {errors.username.types.pattern && (
                <ErrorMessage
                  message={errors.username.types.pattern as string}
                  adjustment={10}
                />
              )}
            </>
          )}
        </div>
        {/* メールアドレス */}
        <div className={fieldItem}>
          <Input
            labels={{ text: 'メールアドレス', size: 10 }}
            type="text"
            id="email"
            placeholder="メールアドレスを入力してください"
            required={true}
            {...register('email', {
              required: VALIDATION.REQUIRED,
              pattern: VALIDATION.EMAIL,
            })}
            error={Object.keys(errors?.email ?? {}).length > 0}
          />
          {errors.email?.types && (
            <>
              {errors.email.types.required && (
                <ErrorMessage
                  message={errors.email.types.required as string}
                  adjustment={10}
                />
              )}
              {errors.email.types.pattern && (
                <ErrorMessage
                  message={errors.email.types.pattern as string}
                  adjustment={10}
                />
              )}
            </>
          )}
        </div>
        {/* プロフィール画像 */}
        <div className={fieldItem}>
          <ImageUpload
            onFileUpload={(file) => setFiles(file)}
            labels={{ text: 'プロフィール画像', size: 10 }}
            type="file"
            id="avatar"
            files={files}
            setFiles={setFiles}
            {...register('avatar')}
          />
        </div>
        <Button
          type="submit"
          disabled={
            isSubmitting ||
            Object.keys(dirtyFields).length === 0 ||
            // !isDirty ||
            !isValid ||
            Object.keys(errors).length > 0
          }
        >
          更新
        </Button>
      </form>
    </Layout>
  )
}
