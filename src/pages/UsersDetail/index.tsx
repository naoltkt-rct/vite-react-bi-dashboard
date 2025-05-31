// packages
import { addDays, format } from 'date-fns'
import { useParams } from 'react-router-dom'

// constants
import { VALIDATION } from '@/constants'

// components
import Button from '@/components/Button'
import Calendar from '@/components/Calendar'
import Input from '@/components/Input'
import Layout from '@/components/Layout'
import Select from '@/components/Select'
import Textarea from '@/components/Textarea'

// pages
import UsersDeleteModal from '@/pages/Users/UsersDeleteModal'

// hooks
import { useUsersDetail } from '@/pages/UsersDetail/hooks'

// styles
import ErrorMessage from '@/components/ErrorMessage'
import {
  fieldItem,
  formContainer,
  formDeleteButton,
  formDeleteIcon,
  formHeading,
  formTitle,
} from '@/styles/layouts/form.css'

export default function UsersDetail() {
  const { id } = useParams()
  const {
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
  } = useUsersDetail(id ?? undefined)

  return (
    <Layout
      directory="users"
      title={`ユーザー詳細：${id ? '編集' : '新規登録'}`}
    >
      <div className={formTitle}>
        <h1 className={formHeading}>
          ユーザー詳細：{id ? '編集' : '新規登録'}
        </h1>
        {id && (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              setIsModalOpen(true)
            }}
            className={formDeleteButton}
          >
            <img src="/icons/delete.svg" alt="" className={formDeleteIcon} />
            ユーザーを削除
          </button>
        )}
      </div>

      <form className={formContainer} onSubmit={handleSubmit(onSubmit)}>
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
              maxLength: { value: 256, message: VALIDATION.MAX_LENGTH(256) },
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
              {errors.username.types.maxLength && (
                <ErrorMessage
                  message={errors.username.types.maxLength as string}
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
        {/* 性別 */}
        <div className={fieldItem}>
          <Select
            labels={{ text: '性別', size: 10 }}
            id="gender"
            options={[
              { value: '', text: '選択してください' },
              { value: 'MALE', text: '男性' },
              { value: 'FEMALE', text: '女性' },
              { value: 'OTHER', text: 'その他' },
            ]}
            control={control}
            required={true}
            {...register('gender', {
              required: VALIDATION.REQUIRED_SELECT,
            })}
          />
          {errors.gender?.types?.required && (
            <ErrorMessage
              message={errors.gender.types.required as string}
              adjustment={10}
            />
          )}
        </div>
        {/* 年齢 */}
        <div className={fieldItem}>
          <Input
            labels={{ text: '年齢', size: 10 }}
            type="text"
            id="age"
            placeholder="年齢を入力してください"
            required={true}
            {...register('age', {
              required: VALIDATION.REQUIRED,
              pattern: VALIDATION.AGE,
            })}
            error={Object.keys(errors?.age ?? {}).length > 0}
          />
          {errors.age?.types && (
            <>
              {errors.age.types.required && (
                <ErrorMessage
                  message={errors.age.types.required as string}
                  adjustment={10}
                />
              )}
              {errors.age.types.pattern && (
                <ErrorMessage
                  message={errors.age.types.pattern as string}
                  adjustment={10}
                />
              )}
            </>
          )}
        </div>
        {/* 所属 */}
        <div className={fieldItem}>
          <Input
            labels={{ text: '所属', size: 10 }}
            type="text"
            id="department"
            placeholder="所属を入力してください"
            required={true}
            {...register('department', {
              required: VALIDATION.REQUIRED,
              pattern: VALIDATION.EXCLUDING_EMOJIS,
            })}
            error={Object.keys(errors?.department ?? {}).length > 0}
          />
          {errors.department?.types && (
            <>
              {errors.department.types.required && (
                <ErrorMessage
                  message={errors.department.types.required as string}
                  adjustment={10}
                />
              )}
              {errors.department.types.pattern && (
                <ErrorMessage
                  message={errors.department.types.pattern as string}
                  adjustment={10}
                />
              )}
            </>
          )}
        </div>
        {/* 職種 */}
        <div className={fieldItem}>
          <Select
            labels={{ text: '職種', size: 10 }}
            id="job"
            options={[
              { value: '', text: '選択してください' },
              { value: 'director', text: 'ディレクター' },
              { value: 'designer', text: 'デザイナー' },
              { value: 'frontend', text: 'フロントエンドエンジニア' },
              { value: 'backend', text: 'バックエンドエンジニア' },
            ]}
            control={control}
            required={true}
            {...register('job', {
              required: VALIDATION.REQUIRED_SELECT,
            })}
          />
          {errors.job?.types?.required && (
            <ErrorMessage
              message={errors.job.types.required as string}
              adjustment={10}
            />
          )}
        </div>
        {/* 入社日 */}
        <div className={fieldItem}>
          <Calendar
            labels={{ text: '入社日', size: 10 }}
            id="startDate"
            placeholderText={format(new Date(), 'yyyy/MM/dd')}
            control={control}
            required={true}
            {...register('startDate', {
              required: VALIDATION.REQUIRED,
            })}
          />
          {errors.startDate?.types?.required && (
            <ErrorMessage
              message={errors.startDate.types.required as string}
              adjustment={10}
            />
          )}
        </div>
        {/* 退社日 */}
        <div className={fieldItem}>
          <Calendar
            labels={{ text: '退社日', size: 10 }}
            id="endDate"
            placeholderText={format(addDays(new Date(), 1), 'yyyy/MM/dd')}
            control={control}
            {...register('endDate')}
          />
        </div>
        {/* 備考 */}
        <div className={fieldItem}>
          <Textarea
            labels={{ text: '備考', size: 10 }}
            id="remarks"
            placeholder="備考を入力してください"
            rows={8}
            {...register('remarks', {
              maxLength: { value: 1000, message: VALIDATION.MAX_LENGTH(1000) },
              pattern: VALIDATION.EXCLUDING_EMOJIS,
            })}
            error={Object.keys(errors?.remarks ?? {}).length > 0}
          />
          {errors.remarks?.types && (
            <>
              {errors.remarks.types.maxLength && (
                <ErrorMessage
                  message={errors.remarks.types.maxLength as string}
                  adjustment={10}
                />
              )}
              {errors.remarks.types.pattern && (
                <ErrorMessage
                  message={errors.remarks.types.pattern as string}
                  adjustment={10}
                />
              )}
            </>
          )}
        </div>
        <Button
          type="submit"
          disabled={
            id !== undefined
              ? isSubmitting || !isDirty || Object.keys(errors).length > 0
              : isSubmitting ||
                !isDirty ||
                !isValid ||
                Object.keys(errors).length > 0
          }
        >
          {id ? '更新' : '登録'}
        </Button>
      </form>
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
