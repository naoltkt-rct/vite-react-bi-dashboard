// packages
import { addDays, format } from 'date-fns'
import { useParams } from 'react-router-dom'

// constants
import { VALIDATION } from '@/constants'

// components
import Button from '@/components/Button'
import Calendar from '@/components/Calendar'
import ErrorMessage from '@/components/ErrorMessage'
import Input from '@/components/Input'
import Layout from '@/components/Layout'
import Select from '@/components/Select'
import Textarea from '@/components/Textarea'

// pages
import TasksDeleteModal from '@/pages/Tasks/TasksDeleteModal'

// hooks
import { useTasksDetail } from '@/pages/TasksDetail/hooks'

// types
import type { TaskAssignment } from '@/types/task'

// styles
import {
  fieldArrayAppend,
  fieldArrayAppendCaution,
  fieldArrayAppendWrapper,
  fieldArrayField,
  fieldArrayFieldItem,
  fieldArrayItem,
  fieldArrayNoData,
  fieldArrayRemove,
  fieldArrayWrapper,
  fieldItem,
  formContainer,
  formDeleteButton,
  formDeleteIcon,
  formHeading,
  formTitle,
} from '@/styles/layouts/form.css'

export default function TasksDetail() {
  const { id } = useParams()
  const {
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
  } = useTasksDetail(id ?? undefined)

  return (
    <Layout directory="tasks" title={`案件詳細：${id ? '編集' : '新規登録'}`}>
      <div className={formTitle}>
        <h1 className={formHeading}>案件詳細：{id ? '編集' : '新規登録'}</h1>
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
            案件を削除
          </button>
        )}
      </div>
      <form className={formContainer} onSubmit={handleSubmit(onSubmit)}>
        {/* 案件名 */}
        <div className={fieldItem}>
          <Input
            labels={{ text: '案件名', size: 10 }}
            type="text"
            id="name"
            placeholder="案件名を入力してください"
            required={true}
            {...register('name', {
              required: VALIDATION.REQUIRED,
              maxLength: { value: 256, message: VALIDATION.MAX_LENGTH(256) },
              pattern: VALIDATION.EXCLUDING_EMOJIS,
            })}
            error={Object.keys(errors?.name ?? {}).length > 0}
          />
          {errors.name?.types && (
            <>
              {errors.name.types.required && (
                <ErrorMessage
                  message={errors.name.types.required as string}
                  adjustment={10}
                />
              )}
              {errors.name.types.maxLength && (
                <ErrorMessage
                  message={errors.name.types.maxLength as string}
                  adjustment={10}
                />
              )}
              {errors.name.types.pattern && (
                <ErrorMessage
                  message={errors.name.types.pattern as string}
                  adjustment={10}
                />
              )}
            </>
          )}
        </div>
        {/* 優先度 */}
        <div className={fieldItem}>
          <Select
            labels={{ text: '優先度', size: 10 }}
            id="priority"
            options={[
              { value: '', text: '選択してください' },
              { value: 'high', text: '高' },
              { value: 'middle', text: '中' },
              { value: 'low', text: '低' },
            ]}
            control={control}
            required={true}
            {...register('priority', {
              required: VALIDATION.REQUIRED_SELECT,
            })}
          />
          {errors.priority?.types?.required && (
            <ErrorMessage
              message={errors.priority.types.required as string}
              adjustment={10}
            />
          )}
        </div>
        {/* 状態 */}
        <div className={fieldItem}>
          <Select
            labels={{ text: '状態', size: 10 }}
            id="status"
            options={[
              { value: '', text: '選択してください' },
              { value: 'waiting', text: '未対応' },
              { value: 'processing', text: '対応中' },
              { value: 'completed', text: '対応済み' },
              { value: 'done', text: '完了' },
            ]}
            control={control}
            required={true}
            {...register('status', {
              required: VALIDATION.REQUIRED_SELECT,
            })}
          />
          {errors.status?.types?.required && (
            <ErrorMessage
              message={errors.status.types.required as string}
              adjustment={10}
            />
          )}
        </div>
        {/* 開始日 */}
        <div className={fieldItem}>
          <Calendar
            labels={{ text: '開始日', size: 10 }}
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
        {/* 期限日 */}
        <div className={fieldItem}>
          <Calendar
            labels={{ text: '期限日', size: 10 }}
            id="endDate"
            placeholderText={format(addDays(new Date(), 1), 'yyyy/MM/dd')}
            control={control}
            required={true}
            {...register('endDate', {
              required: VALIDATION.REQUIRED,
            })}
          />
          {errors.endDate?.types?.required && (
            <ErrorMessage
              message={errors.endDate.types.required as string}
              adjustment={10}
            />
          )}
        </div>
        {/* 依頼元（会社） */}
        <div className={fieldItem}>
          <Input
            labels={{ text: '依頼元（会社）', size: 10 }}
            type="text"
            id="companyName"
            placeholder="依頼元（会社）を入力してください"
            required={true}
            {...register('companyName', {
              required: VALIDATION.REQUIRED,
              pattern: VALIDATION.EXCLUDING_EMOJIS,
            })}
            error={Object.keys(errors?.companyName ?? {}).length > 0}
          />
          {errors.companyName?.types && (
            <>
              {errors.companyName.types.required && (
                <ErrorMessage
                  message={errors.companyName.types.required as string}
                  adjustment={10}
                />
              )}
              {errors.companyName.types.pattern && (
                <ErrorMessage
                  message={errors.companyName.types.pattern as string}
                  adjustment={10}
                />
              )}
            </>
          )}
        </div>
        {/* 依頼元（名前） */}
        <div className={fieldItem}>
          <Input
            labels={{ text: '依頼元（名前）', size: 10 }}
            type="text"
            id="clientName"
            placeholder="依頼元（名前）を入力してください"
            required={true}
            {...register('clientName', {
              required: VALIDATION.REQUIRED,
              pattern: VALIDATION.EXCLUDING_EMOJIS,
            })}
            error={Object.keys(errors?.clientName ?? {}).length > 0}
          />
          {errors.clientName?.types && (
            <>
              {errors.clientName.types.required && (
                <ErrorMessage
                  message={errors.clientName.types.required as string}
                  adjustment={10}
                />
              )}
              {errors.clientName.types.pattern && (
                <ErrorMessage
                  message={errors.clientName.types.pattern as string}
                  adjustment={10}
                />
              )}
            </>
          )}
        </div>
        {/* 備考 */}
        <div className={fieldItem}>
          <Textarea
            labels={{ text: '備考', size: 10 }}
            id="remarks"
            placeholder="備考を入力してください"
            rows={8}
            {...register('remarks', {
              required: false,
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
        {/* 子課題 */}
        {fields.length > 0 && (
          <div className={fieldArrayWrapper}>
            {fields.map((field, index) => {
              return (
                <div key={field.id} className={fieldArrayItem}>
                  <div className={fieldArrayField}>
                    <div className={fieldArrayFieldItem}>
                      <Input
                        labels={{ text: '子課題名', size: 10 }}
                        type="text"
                        id={`assignments.${index}.assignmentName`}
                        placeholder="子課題名を入力してください"
                        required={true}
                        {...register(`assignments.${index}.assignmentName`, {
                          required: VALIDATION.REQUIRED,
                          maxLength: {
                            value: 256,
                            message: VALIDATION.MAX_LENGTH(256),
                          },
                          pattern: VALIDATION.EXCLUDING_EMOJIS,
                        })}
                        error={
                          Object.keys(
                            errors?.assignments?.[index]?.assignmentName ?? {},
                          ).length > 0
                        }
                      />
                      {errors.assignments &&
                        errors.assignments[index]?.assignmentName?.types && (
                          <>
                            {errors.assignments[index]?.assignmentName?.types
                              ?.required && (
                              <ErrorMessage
                                message={
                                  errors.assignments[index]?.assignmentName
                                    ?.types.required as string
                                }
                                adjustment={10}
                              />
                            )}
                            {errors.assignments[index]?.assignmentName?.types
                              ?.maxLength && (
                              <ErrorMessage
                                message={
                                  errors.assignments[index]?.assignmentName
                                    ?.types.maxLength as string
                                }
                                adjustment={10}
                              />
                            )}

                            {errors.assignments[index]?.assignmentName?.types
                              ?.pattern && (
                              <ErrorMessage
                                message={
                                  errors.assignments[index]?.assignmentName
                                    ?.types.pattern as string
                                }
                                adjustment={10}
                              />
                            )}
                          </>
                        )}
                    </div>
                    <div className={fieldArrayFieldItem}>
                      <Select
                        labels={{ text: '状態', size: 10 }}
                        id={`assignments.${index}.status`}
                        options={[
                          { value: '', text: '選択してください' },
                          { value: 'waiting', text: '未対応' },
                          { value: 'processing', text: '対応中' },
                          { value: 'completed', text: '対応済み' },
                          { value: 'done', text: '完了' },
                        ]}
                        control={control}
                        required={true}
                        {...register(`assignments.${index}.status`, {
                          required: VALIDATION.REQUIRED_SELECT,
                        })}
                      />
                      {errors.assignments &&
                        errors.assignments[index]?.status?.types?.required && (
                          <ErrorMessage
                            message={
                              errors.assignments[index]?.status?.types
                                ?.required as string
                            }
                            adjustment={10}
                          />
                        )}
                    </div>
                    <div className={fieldArrayFieldItem}>
                      <Select
                        labels={{ text: '職種', size: 10 }}
                        id={`assignments.${index}.jobType`}
                        options={[
                          { value: '', text: '選択してください' },
                          { value: 'director', text: 'ディレクター' },
                          { value: 'designer', text: 'デザイナー' },
                          {
                            value: 'frontend',
                            text: 'フロントエンドエンジニア',
                          },
                          { value: 'backend', text: 'バックエンドエンジニア' },
                        ]}
                        control={control}
                        required={true}
                        {...register(`assignments.${index}.jobType`, {
                          required: VALIDATION.REQUIRED_SELECT,
                        })}
                      />
                      {errors.assignments &&
                        errors.assignments[index]?.jobType?.types?.required && (
                          <ErrorMessage
                            message={
                              errors.assignments[index]?.jobType?.types
                                ?.required as string
                            }
                            adjustment={10}
                          />
                        )}
                    </div>
                    <div className={fieldArrayFieldItem}>
                      <Select
                        labels={{ text: '担当者', size: 10 }}
                        id={`assignments.${index}.assignmentId`}
                        options={[
                          { value: '', text: '選択してください' },
                          ...generateSelectOptions(
                            assignmentUsers?.[
                              observeAssignments?.[index]?.jobType ?? ''
                            ] ?? [],
                          ),
                        ]}
                        control={control}
                        // 職種が未選択の場合は非活性とする
                        disabled={
                          observeAssignments?.[index]?.jobType === '' ||
                          errors.assignments?.[index]?.jobType?.types?.required
                            ? true
                            : false
                        }
                        {...register(`assignments.${index}.assignmentId`)}
                      />
                    </div>
                    <div className={fieldArrayFieldItem}>
                      <Calendar
                        labels={{ text: '開始日', size: 10 }}
                        id={`assignments.${index}.startDate`}
                        placeholderText={format(new Date(), 'yyyy/MM/dd')}
                        control={control}
                        required={true}
                        {...register(`assignments.${index}.startDate`, {
                          required: VALIDATION.REQUIRED,
                        })}
                      />
                      {errors.assignments &&
                        errors.assignments[index]?.startDate?.types
                          ?.required && (
                          <ErrorMessage
                            message={
                              errors.assignments[index]?.startDate?.types
                                ?.required as string
                            }
                            adjustment={10}
                          />
                        )}
                    </div>
                    <div className={fieldArrayFieldItem}>
                      <Calendar
                        labels={{ text: '期限日', size: 10 }}
                        id={`assignments.${index}.endDate`}
                        placeholderText={format(
                          addDays(new Date(), 1),
                          'yyyy/MM/dd',
                        )}
                        control={control}
                        required={true}
                        {...register(`assignments.${index}.endDate`, {
                          required: VALIDATION.REQUIRED,
                        })}
                      />
                      {errors.assignments &&
                        errors.assignments[index]?.endDate?.types?.required && (
                          <ErrorMessage
                            message={
                              errors.assignments[index]?.endDate?.types
                                ?.required as string
                            }
                            adjustment={10}
                          />
                        )}
                    </div>
                  </div>
                  <div className={fieldArrayRemove}>
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className={formDeleteButton}
                    >
                      <img
                        src="/icons/delete.svg"
                        alt=""
                        className={formDeleteIcon}
                      />
                      削除
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
        <div className={fieldArrayAppendWrapper}>
          {fields.length === 0 && (
            <p className={fieldArrayNoData}>子課題はありません</p>
          )}
          <div className={fieldArrayAppend}>
            <Button
              type="button"
              onClick={() =>
                append({
                  id: '',
                  assignmentName: '',
                  status: '',
                  jobType: '',
                  assignmentId: '',
                  startDate: '',
                  endDate: '',
                } as unknown as TaskAssignment)
              }
              disabled={fields.length >= 5}
            >
              子課題を追加する
            </Button>
            {fields.length >= 5 && (
              <p className={fieldArrayAppendCaution}>最大5件までです</p>
            )}
          </div>
        </div>
        <Button
          type="submit"
          disabled={
            id !== undefined
              ? isSubmitting ||
                !isDirty ||
                Object.keys(errors).length > 0 ||
                hasEmptyField()
              : isSubmitting ||
                !isDirty ||
                !isValid ||
                Object.keys(errors).length > 0 ||
                hasEmptyField()
          }
        >
          {id ? '更新' : '登録'}
        </Button>
      </form>
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
