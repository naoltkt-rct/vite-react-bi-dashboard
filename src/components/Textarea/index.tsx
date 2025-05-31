// packages
import { forwardRef } from 'react'

// styles
import LabelWrapper from '@/components/Label'
import { textarea } from '@/components/Textarea/styles.css'

// types
import type { Label } from '@/types/styles'
type Props = {
  labels?: Label
  error?: boolean
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = forwardRef<HTMLTextAreaElement, Props>(function TextareaInner(
  { labels, id, error, ...props }: Props,
  ref,
) {
  return labels ? (
    <LabelWrapper id={id as string} labels={labels}>
      <textarea
        id={id}
        ref={ref}
        className={textarea[error ? 'error' : 'default']}
        {...props}
      />
    </LabelWrapper>
  ) : (
    <textarea
      id={id}
      ref={ref}
      className={textarea[error ? 'error' : 'default']}
      {...props}
    />
  )
})

export default Textarea
