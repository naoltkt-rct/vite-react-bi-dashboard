// packages
import { ja } from 'date-fns/locale/ja'
import { forwardRef } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Control, Controller } from 'react-hook-form'

// DatePicker を日本語に対応
registerLocale('ja', ja)

// styles
import { input, wrapper } from '@/components/Calendar/styles.css'
import LabelWrapper from '@/components/Label'

// types
import type { Label } from '@/types/styles'
type Props = {
  labels?: Label
  id: string
  placeholderText?: string
  control: Control<any, any>
  required?: boolean
}

const Calendar = forwardRef<DatePicker, Props>(function CalendarInner(
  { labels, id, control, placeholderText, required }: Props,
  ref,
) {
  function renderCalendarController() {
    return (
      <Controller
        name={id}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <DatePicker
            locale="ja"
            selected={value}
            onChange={(date) => onChange(date)}
            dateFormatCalendar="yyyy年 MM月"
            dateFormat="yyyy/MM/dd"
            placeholderText={placeholderText}
            wrapperClassName={wrapper}
            ref={ref}
            className={input[error ? 'error' : 'default']}
          />
        )}
      />
    )
  }
  return labels ? (
    <LabelWrapper id={id} labels={labels} required={required}>
      {renderCalendarController()}
    </LabelWrapper>
  ) : (
    renderCalendarController()
  )
})

export default Calendar
