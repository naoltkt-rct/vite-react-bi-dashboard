// packages
import { forwardRef } from 'react'
import { Control, Controller } from 'react-hook-form'

// hooks
import { useSelect } from '@/components/Select/hooks'

// styles
import LabelWrapper from '@/components/Label'
import {
  button,
  hiddenSelect,
  select,
  trigger,
  wrapper,
} from '@/components/Select/styles.css'

// types
import type { Label, Option } from '@/types/styles'
type Props = {
  labels?: Label
  id: string
  options: Option[]
  control: Control<any, any>
  required?: boolean
} & React.SelectHTMLAttributes<HTMLSelectElement>

const Select = forwardRef<HTMLSelectElement, Props>(function SelectInner(
  { options, labels, id, control, ...props }: Props,
  ref,
) {
  // hooks
  const { isOpen, setIsOpen, selected, setSelected, refs, initialValues } =
    useSelect(options)
  initialValues.current = props.value as string
  // 表示用
  function renderSelectController(
    onChange: (event: React.MouseEvent<HTMLButtonElement>) => void,
    value: string,
    error?: boolean,
  ) {
    return (
      <div className={wrapper} ref={refs}>
        <button
          type="button"
          value={value !== options[0].value ? value : options[0].value}
          disabled={props.disabled}
          onClick={() => setIsOpen(!isOpen)}
          className={trigger[error ? 'error' : 'default']}
        >
          {options.find((option) => option.value === value)
            ? options.find((option) => option.value === value)?.text
            : options[0].text}
        </button>
        <div className={select[isOpen ? 'open' : 'close']}>
          <ul data-id={id}>{renderOptions(options, 'list', onChange)}</ul>
        </div>
      </div>
    )
  }

  // 制御用
  function hiddenSelectController(
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
    value: string,
  ) {
    return (
      <select
        id={id}
        value={value}
        onChange={onChange}
        ref={ref}
        className={hiddenSelect}
        // hidden
        {...props}
      >
        {renderOptions(options, 'select')}
      </select>
    )
  }

  // 選択肢を出力
  function renderOptions(
    options: Option[],
    types: 'select' | 'list',
    onChange?: (event: React.MouseEvent<HTMLButtonElement>) => void,
  ) {
    return options.map((option) =>
      types === 'list' ? (
        <li key={option.value}>
          <button
            type="button"
            value={option.value}
            onClick={(event) => {
              event.stopPropagation()
              // selected 更新
              if (refs.current) {
                const options = Array.from(
                  (refs.current.nextElementSibling as HTMLSelectElement)
                    .options,
                )
                options[
                  options.findIndex(
                    (option) => option.value === event.currentTarget.value,
                  ) ?? 0
                ].selected = true
                onChange && onChange(event)
                setSelected(event.currentTarget.value)
              }
              // プルダウンを閉じる
              setIsOpen(false)
            }}
            className={
              button[
                selected === option.value ||
                initialValues.current === option.value
                  ? 'selected'
                  : 'unselected'
              ]
            }
          >
            {option.text}
          </button>
        </li>
      ) : (
        <option key={option.value} value={option.value}>
          {option.text}
        </option>
      ),
    )
  }

  return labels ? (
    <LabelWrapper id={id as string} labels={labels} required={props.required}>
      <Controller
        name={id}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => {
          initialValues.current = value
          return (
            <>
              {renderSelectController(
                onChange,
                value,
                Object.keys(error ?? {}).length > 0,
              )}
              {hiddenSelectController(onChange, value)}
            </>
          )
        }}
      />
    </LabelWrapper>
  ) : (
    <Controller
      name={id}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        initialValues.current = value
        return (
          <>
            {renderSelectController(
              onChange,
              value,
              Object.keys(error ?? {}).length > 0,
            )}
            {hiddenSelectController(onChange, value)}
          </>
        )
      }}
    />
  )
})

export default Select
