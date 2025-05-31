// packages
import { assignInlineVars } from '@vanilla-extract/dynamic'

// styles
import {
  container,
  label,
  labelSize,
  requiredIcon,
} from '@/components/Label/styles.css'

// types
import type { Label } from '@/types/styles'
type Props = {
  id: string
  labels: Label
  children: React.ReactNode
  required?: boolean
  disuseLabel?: boolean
}

export default function LabelWrapper({
  id,
  labels,
  required,
  children,
  disuseLabel,
}: Props) {
  return (
    <div className={container}>
      {disuseLabel ? (
        <div
          className={label}
          style={assignInlineVars({
            [labelSize]: `${labels.size}${labels.unit ?? 'em'}`,
          })}
        >
          {labels.text}
          {required && <span className={requiredIcon}>*</span>}
        </div>
      ) : (
        <label
          htmlFor={id}
          className={label}
          style={assignInlineVars({
            [labelSize]: `${labels.size}${labels.unit ?? 'em'}`,
          })}
        >
          {labels.text}
          {required && <span className={requiredIcon}>*</span>}
        </label>
      )}
      {children}
    </div>
  )
}
