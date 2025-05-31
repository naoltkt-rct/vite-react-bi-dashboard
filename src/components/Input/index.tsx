// packages
import { forwardRef } from 'react'

// styles
import { input } from '@/components/Input/styles.css'
import LabelWrapper from '@/components/Label'

// types
import type { Label } from '@/types/styles'
type Props = {
  labels?: Label
  error?: boolean
} & React.InputHTMLAttributes<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, Props>(function InputInner(
  { labels, type, id, error, ...props }: Props,
  ref,
) {
  return labels ? (
    <LabelWrapper id={id as string} labels={labels} required={props.required}>
      <input
        type={type}
        id={id}
        ref={ref}
        className={input[error ? 'error' : 'default']}
        {...props}
      />
    </LabelWrapper>
  ) : (
    <input
      type={type}
      id={id}
      ref={ref}
      className={input[error ? 'error' : 'default']}
      {...props}
    />
  )
})

export default Input
